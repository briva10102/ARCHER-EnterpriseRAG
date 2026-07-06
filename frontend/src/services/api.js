import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const uploadPDF = (formData) => {
    return api.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const extractPDF = () => {
    return api.get("/extract");
};

export const askQuestion = (question) => {
    return api.post("/search", {
        question: question,
    });
};

export default api;