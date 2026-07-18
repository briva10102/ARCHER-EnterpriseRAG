const BASE_URL = "http://127.0.0.1:8000";

/* ---------------- LOGIN ---------------- */

export async function login(username, password) {

    const response = await fetch(`${BASE_URL}/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            username,
            password,
        }),

    });

    const data = await response.json();

    return data;
}

export async function register(username, password, role) {

    const response = await fetch(`${BASE_URL}/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            username,
            password,
            role,
        }),

    });

    return await response.json();
}

export async function askQuestion(question) {

    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            question,
        }),
    });

    return await response.json();
}
export async function uploadPDF(file, category, allowed_roles) {

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("file", file);
    formData.append("category", category);
    formData.append("allowed_roles", allowed_roles);

    const response = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData,
    });

    const data = await response.json();

    console.log(response.status);
    console.log(data);

    return data;
}

export default BASE_URL;