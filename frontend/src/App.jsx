import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DoctorList from './pages/DoctorList';
import AddDoctor from './pages/AddDoctor';
import EditDoctor from './pages/EditDoctor';
import PatientList from './pages/PatientList';
import AddPatient from './pages/AddPatient';
import EditPatient from './pages/EditPatient';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/doctors"
            element={
              <PrivateRoute>
                <DoctorList />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/doctors/add"
            element={
              <PrivateRoute>
                <AddDoctor />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/doctors/edit/:id"
            element={
              <PrivateRoute>
                <EditDoctor />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/patients"
            element={
              <PrivateRoute>
                <PatientList />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/patients/add"
            element={
              <PrivateRoute>
                <AddPatient />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/patients/edit/:id"
            element={
              <PrivateRoute>
                <EditPatient />
              </PrivateRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
