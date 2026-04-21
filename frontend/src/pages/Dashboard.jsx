import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../services/courseService";
import "../styles/Dashboard.css";

export function Dashboard() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editCourse, setEditCourse] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [formError, setFormError] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        if (!formData.title || !formData.description) {
            setFormError("All fields are required");
            return;
        }
        try {
            if (editCourse) {
                await updateCourse(editCourse._id, formData);
            } else {
                await createCourse(formData);
            }
            setFormData({ title: "", description: "" });
            setShowForm(false);
            setEditCourse(null);
            fetchCourses();
        } catch (err) {
            setFormError(err.message);
        }
    };

    const handleEdit = (course) => {
        setEditCourse(course);
        setFormData({ title: course.title, description: course.description });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await deleteCourse(id);
            fetchCourses();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard-page">
            <nav className="home-nav">
                <h1>📚 CoursesOnline</h1>
                <div className="nav-buttons">
                    <button onClick={() => { setShowForm(true); setEditCourse(null); setFormData({ title: "", description: "" }); }} className="add-btn">
                        + Add Course
                    </button>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </nav>

            <div className="home-content">
                <h2>My Courses</h2>

                {showForm && (
                    <div className="form-card">
                        <h3>{editCourse ? "Edit Course" : "New Course"}</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Course title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <textarea
                                placeholder="Course description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            {formError && <p className="error-message">{formError}</p>}
                            <div className="form-buttons">
                                <button type="submit">{editCourse ? "Update" : "Create"}</button>
                                <button type="button" onClick={() => { setShowForm(false); setEditCourse(null); }}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {loading && <p className="loading">Loading courses...</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="courses-grid">
                    {courses.map((course) => (
                        <div key={course._id} className="course-card">
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <div className="card-buttons">
                                <button onClick={() => handleEdit(course)} className="edit-btn">Edit</button>
                                <button onClick={() => handleDelete(course._id)} className="delete-btn">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                {!loading && courses.length === 0 && (
                    <p className="no-courses">No courses yet. Add your first course!</p>
                )}
            </div>
        </div>
    );
}