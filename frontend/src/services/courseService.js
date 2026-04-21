const API = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

export async function getCourses() {
    const response = await fetch(`${API}/courses`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data.courses;
}

export async function createCourse(courseData) {
    const response = await fetch(`${API}/courses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(courseData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

export async function updateCourse(id, courseData) {
    const response = await fetch(`${API}/courses/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(courseData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

export async function deleteCourse(id) {
    const response = await fetch(`${API}/courses/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${getToken()}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}