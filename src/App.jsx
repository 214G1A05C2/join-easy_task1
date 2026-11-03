import { AuthProvider, useAuth } from './context/AuthContext';
import { AssignmentProvider } from './context/AssignmentContext';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';

function MainRouter() {
  const { currentUser, isAdmin, isStudent } = useAuth();

  if (!currentUser) {
    return <Login />;
  }

  if (isAdmin) {
    return <AdminDashboard />;
  }

  if (isStudent) {
    return <StudentDashboard />;
  }

  return <NotFound onGoHome={() => window.location.reload()} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AssignmentProvider>
        <MainRouter />
      </AssignmentProvider>
    </AuthProvider>
  );
}
