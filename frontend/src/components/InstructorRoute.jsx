import { Navigate } from "react-router-dom";

export function InstructorRoute({ children }) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" />;

    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.role !== "instructor") return <Navigate to="/dashboard" />;

    return children;
}