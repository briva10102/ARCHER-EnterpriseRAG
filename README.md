ARCHER - On Target 
An internal AI assistant for secure, role-based enterprise knowledge retrieval.
ARCHER is an AI-powered internal knowledge assistant designed for enterprise environments where employees need to search and interact with company documents while ensuring that users can only retrieve information they are authorized to access.
It combines FastAPI, PostgreSQL, JWT authentication, role-based authorization, document processing, vector embeddings, ChromaDB, and Gemini to build a secure Retrieval-Augmented Generation (RAG) system.

🚀 Key Features :

. JWT Authentication

User registration and login

Password hashing using bcrypt

JWT-based session authentication

Role-Based Authorization

Admin and Employee roles

Restricted administrative operations

Role information embedded in JWT

Document Upload & Processing

PDF upload functionality

Text extraction using pypdf

Automatic document chunking


. Semantic Search

Text converted into vector embeddings

all-MiniLM-L6-v2 SentenceTransformer model

Vector storage and similarity search using ChromaDB


. Role-Based Retrieval
Users can only retrieve documents they are permitted to access

Authorization is applied before returning relevant document information


. RAG-based AI Responses
Relevant document chunks are retrieved
Retrieved context is passed to Gemini

Gemini generates an answer grounded in the retrieved information


. Conversation Memory

Maintains conversational context
Enables more natural multi-turn interactions

. Source Metadata

Retrieved information can be associated with document/source metadata