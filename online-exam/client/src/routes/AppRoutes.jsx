import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES, ROLE_HOMES, hasRole } from "../utils/roleGuard";

// Auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";

// Student
import StudentDashboard from "../pages/student/StudentDashboard";
import ExamRoom from "../pages/student/ExamRoom";
import Results from "../pages/student/Results";
import ExamHistory from "../pages/student/ExamHistory";

// Instructor
import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import CreateExam from "../pages/instructor/CreateExam";
import QuestionBank from "../pages/instructor/QuestionBank";
import GradingInterface from "../pages/instructor/GradingInterface";
import PlagiarismReport from "../pages/instructor/PlagiarismReport";

// Proctor
import ProctorConsole from "../pages/proctor/ProctorConsole";
import IncidentReview from "../pages/proctor/IncidentReview";

// Admin
import AdminPanel from "../pages/admin/AdminPanel";
import UserManagement from "../pages/admin/UserManagement";
import AuditLogs from "../pages/admin/AuditLogs";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex h-screen items-center justify-center text-ink-400">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !hasRole(user, allowedRoles)) return <Navigate to={ROLE_HOMES[user.role] || "/login"} replace />;
  return children;
}

function HomeRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_HOMES[user.role] || "/login"} replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Student */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/exam/:examId"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <ExamRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/results/:resultId"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <Results />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/history"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <ExamHistory />
          </ProtectedRoute>
        }
      />

      {/* Instructor */}
      <Route
        path="/instructor"
        element={
          <ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}>
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/create-exam"
        element={
          <ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}>
            <CreateExam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/question-bank"
        element={
          <ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}>
            <QuestionBank />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/grading/:examId"
        element={
          <ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}>
            <GradingInterface />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/plagiarism/:examId"
        element={
          <ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}>
            <PlagiarismReport />
          </ProtectedRoute>
        }
      />

      {/* Proctor */}
      <Route
        path="/proctor"
        element={
          <ProtectedRoute allowedRoles={[ROLES.PROCTOR]}>
            <ProctorConsole />
          </ProtectedRoute>
        }
      />
      <Route
        path="/proctor/incident/:id"
        element={
          <ProtectedRoute allowedRoles={[ROLES.PROCTOR]}>
            <IncidentReview />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SYSTEM_ADMIN, ROLES.INSTITUTION_ADMIN]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SYSTEM_ADMIN, ROLES.INSTITUTION_ADMIN]}>
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/audit-logs"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SYSTEM_ADMIN]}>
            <AuditLogs />
          </ProtectedRoute>
        }
      />

      {/* Root + 404 */}
      <Route path="/" element={<HomeRedirect />} />
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}