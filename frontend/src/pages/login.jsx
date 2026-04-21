import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import RegisterImg from "../assets/Register.png";
import { loginUser } from "../services/authService";

export function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password) {
            setError("All fields are required");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Invalid email format");
            return;
        }

        try {
            const data = await loginUser({
                email: formData.email,
                password: formData.password,
            });
            localStorage.setItem("token", data.token);

            // ✅ decode token to get role
            const payload = JSON.parse(atob(data.token.split(".")[1]));
            if (payload.role === "instructor") {
                navigate("/instructor");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Something went wrong");
        }
    };

    return (
        <div className="register-page">
            <div className="register-left">
                <img src={RegisterImg} alt="learning" className="register-illustration" />
                <h2>Welcome back!</h2>
                <p>Log in and continue your learning journey<br />from where you left off</p>
                <div className="register-stats">
                    <div><strong>500+</strong><span>Courses</span></div>
                    <div><strong>10k+</strong><span>Students</span></div>
                    <div><strong>4.9★</strong><span>Rating</span></div>
                </div>
            </div>

            <div className="register-right">
                <div className="register-form-container">
                    <h1>Sign in to your account</h1>
                    <p>Welcome back! Please enter your details</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Sign In</button>
                    </form>
                    <p className="register-footer">
                        Don't have an account?{" "}
                        <span onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
                            Register
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}