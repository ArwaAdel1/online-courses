import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { CourseDetails } from "./pages/CourseDetails";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { InstructorRoute } from "./components/InstructorRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/courses/:id" element={
                    <ProtectedRoute>
                        <CourseDetails />
                    </ProtectedRoute>
                } />
                <Route path="/instructor" element={
                    <InstructorRoute>
                        <Dashboard />
                    </InstructorRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;