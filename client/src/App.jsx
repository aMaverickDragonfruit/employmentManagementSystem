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
import Testing from './pages/Testing';
import EmployeeProfile from './pages/hr/EmployeeProfile';
import ProtectedAuthRoute from './components/ProtectedAuthRoute';
import ProtectedApprovedRoute from './components/ProtectedApprovedRoute';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='register/:registerToken' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='forgot-password' element={<UpdatePassword />} />
            <Route path='password-updated' element={<PasswordUpdated />} />

            <Route
              path='onboarding-form'
              element={
                <ProtectedAuthRoute>
                  <OnboardingForm />
                </ProtectedAuthRoute>
              }
            />
            <Route
              path='profile'
              element={
                <ProtectedAuthRoute>
                  <ProtectedApprovedRoute>
                    <Profile />
                  </ProtectedApprovedRoute>
                </ProtectedAuthRoute>
              }
            />
            <Route path='visa-management' element={<VisaManagement />} />
            <Route path='employee-profiles' element={<EmployeeProfiles />} />
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
            <Route
              path='onboarding-applications/:id'
              element={<EmployeeProfile />}
            />

            <Route path='testing' element={<Testing />} />
          </Route>
          <Route path='/styles' element={<Styles />} />
        </Routes>
      </Router>
    </>
  );
}
