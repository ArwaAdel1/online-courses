import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ أضيفي الاستيراد ده
import "../styles/Register.css";
import RegisterImg from "../assets/Register.png";
import { registerUser } from "../services/authService";

export function Register() {
    const navigate = useNavigate(); // ✅ أضيفي السطر ده
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Invalid email format");
            return;
        }
        try {
            const data = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            console.log(data);
            navigate("/login"); // ✅ بعد التسجيل يروح للـ Login
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-page">
            <div className="register-left">
                <img src={RegisterImg} alt="learning" className="register-illustration" />
                <h2>Start learning today</h2>
                <p>Join thousands of students and unlock<br />your potential with our courses</p>
                <div className="register-stats">
                    <div><strong>500+</strong><span>Courses</span></div>
                    <div><strong>10k+</strong><span>Students</span></div>
                    <div><strong>4.9★</strong><span>Rating</span></div>
                </div>
            </div>

            <div className="register-right">
                <div className="register-form-container">
                    <h1>Create your account</h1>
                    <p>It's free and only takes a minute</p>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Full name" value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        <input type="email" placeholder="Email address" value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        <input type="password" placeholder="Password" value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        <input type="password" placeholder="Confirm password" value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Register</button>
                    </form>
                    <p className="register-footer">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}> // ✅
                            Sign in
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}