// fetch data from backend and handle registration logic
export async function registerUser(formData) {
    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Registration failed");
        return data;
    } catch (error) {
        throw error;
    }
}

// fetch data from backend and handle login logic
export async function loginUser(formData) {
    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Login failed");
        return data;
    } catch (error) {
        throw error;
    }
}