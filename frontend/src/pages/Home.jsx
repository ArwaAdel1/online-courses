import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../services/courseService";
import "../styles/Home.css";

export function Home() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="home-page">
            <nav className="home-nav">
                <h1>📚 CoursesOnline</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>

            <div className="home-content">
                <h2>Available Courses</h2>

                {loading && <p className="loading">Loading courses...</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="courses-grid">
                    {courses.map((course) => (
                        <div key={course._id} className="course-card">
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <button onClick={() => navigate(`/courses/${course._id}`)}>
                                View Course
                            </button>
                        </div>
                    ))}
                </div>

                {!loading && courses.length === 0 && (
                    <p className="no-courses">No courses available yet.</p>
                )}
            </div>
        </div>
    );
}