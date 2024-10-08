import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import OnboardingForm from './pages/employee/OnboardingForm';
import Profile from './pages/employee/Profile';
import VisaManagement from './pages/employee/VisaManagement';
import EmployeeProfiles from './pages/hr/EmployeeProfiles';
import EmployeeRegistration from './pages/hr/EmployeeRegistration';
import EmployeeVisaStatus from './pages/hr/EmployeeVisaStatus';
import MainLayout from './components/layout/Layout';
import UpdatePassword from './pages/auth/UpdatePassword';
import Styles from './pages/Styles';
import PasswordUpdated from './pages/auth/PasswordUpdated';
import OnboardingApplications from './pages/hr/OnboardingApplications';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={<MainLayout />}
          >
            <Route
              path='register'
              element={<Register />}
            />
            <Route
              path='login'
              element={<Login />}
            />
            <Route
              path='forgot-password'
              element={<UpdatePassword />}
            />
            <Route
              path='password-updated'
              element={<PasswordUpdated />}
            />
            <Route
              path='onboarding-form'
              element={<OnboardingForm />}
            />
            <Route
              path='profile'
              element={<Profile />}
            />
            <Route
              path='visa-management'
              element={<VisaManagement />}
            />
            <Route
              path='employee-profiles'
              element={<EmployeeProfiles />}
            />
            <Route
              path='employee-visa-status'
              element={<EmployeeVisaStatus />}
            />
            <Route
              path='employee-registration'
              element={<EmployeeRegistration />}
            />
            <Route
              path='onboarding-applications'
              element={<OnboardingApplications />}
            />
          </Route>
          <Route
            path='/styles'
            element={<Styles />}
          />
        </Routes>
      </Router>
    </>
  );
}
