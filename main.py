from fastapi import FastAPI
from pydantic import BaseModel
from database import conn, cursor
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends
from fastapi import HTTPException
from fastapi import UploadFile, File
import shutil
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
import chromadb
from google import genai
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv



load_dotenv()
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY"))

SECRET_KEY = "mysecretkey123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conversation_history = []


fake_item_db = [{"itemname": "A"}, {"itemname": "B"}, {"itemname": "C"}]

products = []


class Product(BaseModel):
    name: str
    warranty: int

class User(BaseModel):
    username: str
    password: str
    role: str

class Login(BaseModel):
    username: str
    password: str    
    
class Question(BaseModel):
    question: str


class UpdateProduct(BaseModel):
    name: str
    warranty: int

class SearchRequest(BaseModel):
    question: str



@app.post("/register")
def register(user: User):
    
    hashed_password = pwd_context.hash(user.password)
    
    cursor.execute(
    """
    INSERT INTO users (username, password, role)
    VALUES (%s, %s, %s)
    """,
    (user.username, hashed_password, user.role)
    )

    conn.commit()

    return {"message": "User registered successfully"}


@app.post("/login")
def login(user: Login):
    cursor.execute(
    """
    SELECT * FROM users
    WHERE username = %s
    """,
    (user.username,)
    )

    db_user = cursor.fetchone()
    if db_user is None:
        return {"message": "Invalid username or password"}
    if not pwd_context.verify(user.password, db_user[2]):
        return {"message": "Invalid username or password"}
    payload = {
    "sub": user.username,
    "role": db_user[3],
    "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return {
    "access_token": token,
    "token_type": "bearer"
    }

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    return payload

def verify_admin(payload=Depends(verify_token)):
    if payload["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Access denied. Admins only."
        )

    return payload


@app.get("/profile")
def profile(payload=Depends(verify_token)):

    cursor.execute(
        """
        SELECT id, username
        FROM users
        WHERE username = %s
        """,
        (payload["sub"],)
    )

    user = cursor.fetchone()

    return {
        "id": user[0],
        "username": user[1]
    }

@app.delete("/products/{id}")
def delete_product(
    id: int,
    payload=Depends(verify_admin)
):

    
    cursor.execute(
        """
        DELETE FROM products
        WHERE id = %s
        """,
        (id,)
    )

    conn.commit()

    return {
        "message": "Product deleted"
    }


@app.put("/products/{id}")
def update_product(
    id: int,
    p: UpdateProduct,
    payload=Depends(verify_admin)
):

    
    cursor.execute(
        """
        UPDATE products
        SET name = %s,
            warranty = %s
        WHERE id = %s
        """,
        (p.name, p.warranty, id)
    )

    conn.commit()

    return {
        "message": f"Product {p.name} updated"
    }


@app.post("/products")
def create_product(
    p: Product,
    payload=Depends(verify_admin)
):
    cursor.execute(
    """
    SELECT id
    FROM users
    WHERE username = %s
    """,
    (payload["sub"],)
    )

    user = cursor.fetchone()
    
    cursor.execute(
    """
    INSERT INTO products(name, warranty, user_id)
    VALUES (%s, %s, %s)
    """,
    (p.name, p.warranty, user[0])
    )

    conn.commit()

    return {
        "message": f"Product {p.name} added"
    }

@app.get("/products")
def get_products(payload=Depends(verify_token)):

    cursor.execute(
    """
    SELECT id
    FROM users
    WHERE username = %s
    """,
    (payload["sub"],)
    )

    user = cursor.fetchone()

    cursor.execute(
    """
    SELECT *
    FROM products
    WHERE user_id = %s
    """,
    (user[0],)
    )

    data = cursor.fetchall()

    return {
        "products": data
    }

@app.get("/products/{id}")
def get_product(id: int):
    cursor.execute("SELECT * FROM products WHERE id = %s", (id,))

    data = cursor.fetchone()

    return {
        "product": data
    }


@app.post("/upload")
def upload_file(file: UploadFile = File(...)):

    with open(f"Uploads/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "File uploaded successfully"
    }
    

@app.get("/extract")
def extract_text():
    
    
    client = chromadb.PersistentClient(path="chroma_db")
    try:
        client.delete_collection("solar_manuals")
    except:
        pass

    collection = client.get_or_create_collection(name="solar_manuals")
    
    pdf_files = os.listdir("Uploads")
    for pdf in pdf_files:

        reader = PdfReader(f"Uploads/{pdf}")

        text = ""

        for page in reader.pages:
            text += page.extract_text()
        

            chunk_size = 500

            chunks = []

            for i in range(0, len(text), chunk_size):
                chunks.append(text[i:i + chunk_size])
            
            model = SentenceTransformer("all-MiniLM-L6-v2")
            embeddings = []
            
            
            for chunk in chunks:
                embeddings.append(model.encode(chunk))
            
            for i in range(len(chunks)):
                collection.add(
                    ids=[f"{pdf}_{i}"],
                    documents=[chunks[i]],
                    embeddings=[embeddings[i].tolist()],
                    metadatas=[{"source": pdf}]
                )
    
    return {
    "count": collection.count()
    }


@app.post("/search")
def search(request: SearchRequest):

    model = SentenceTransformer("all-MiniLM-L6-v2")

    question_embedding = model.encode(request.question)

    chroma_client = chromadb.PersistentClient(path="chroma_db")

    collection = chroma_client.get_collection(name="solar_manuals")

    results = collection.query(
        query_embeddings=[question_embedding.tolist()],
        n_results=3
    )

    context = "\n\n".join(results["documents"][0])
    
    history = "\n".join(conversation_history)

    prompt = f"""
        You are an AI assistant for a solar company.

        Use ONLY the information provided in the context below.

        If the answer is not present in the context, reply exactly:
        "I couldn't find that information in the uploaded document."

    Conversation History:
        {history}

    Context:
        {context}

    Question:
        {request.question}

    Answer:
        """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
        )
    
    conversation_history.append(f"User: {request.question}")
    conversation_history.append(f"Assistant: {response.text}")
    
    if len(conversation_history) > 10:
        conversation_history.pop(0)
        conversation_history.pop(0)
    
    return {
    "answer": response.text,
    "sources": results["documents"][0]
    }
    
    
@app.get("/")
def home():
    return {"message": "Hello Briva"}


@app.get("/hello")
def display():
    return {"message": "Hello World"}


@app.post("/ask")
def ask(ques: Question):
    return {
        "message": f"Your question is {ques.question}"
    }
    
@app.get("/gemini-test")
def gemini_test():

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Say hello in one sentence."
    )

    return {
        "response": response.text
    }