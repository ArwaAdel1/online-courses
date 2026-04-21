import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Home.css";

export function CourseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setCourse(data.course);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    return (
        <div className="home-page">
            <nav className="home-nav">
                <h1>📚 CoursesOnline</h1>
                <button onClick={() => navigate("/dashboard")} className="logout-btn">
                    ← Back
                </button>
            </nav>

            <div className="home-content">
                {loading && <p className="loading">Loading...</p>}
                {error && <p className="error-message">{error}</p>}
                {course && (
                    <>
                        <h2>{course.title}</h2>
                        <p style={{ color: "#777", marginBottom: "24px" }}>{course.description}</p>
                        <h3>Lessons</h3>
                        {course.lessons?.length === 0 || !course.lessons ? (
                            <p className="no-courses">No lessons available yet.</p>
                        ) : (
                            <div className="courses-grid">
                                {course.lessons.map((lesson, index) => (
                                    <div key={index} className="course-card">
                                        <h3>{lesson.title}</h3>
                                        <p>{lesson.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}