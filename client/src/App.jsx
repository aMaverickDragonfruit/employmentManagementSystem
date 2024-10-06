import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import OnboardingForm from './pages/OnboardingForm';
import Profile from './pages/profile';
import VisaManagement from './pages/visaManagement';
import EmployeeProfiles from './pages/employeeProfiles';
import EmployeeRegistration from './pages/EmployeeRegistration';
import EmployeeVisaStatus from './pages/EmployeeVisaStatus';
import MainLayout from './components/Layout';
import Testing from './pages/Testing';

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
              path='employee-registration'
              element={<EmployeeRegistration />}
            />
            <Route
              path='employee-visa-status'
              element={<EmployeeVisaStatus />}
            />
          </Route>
          <Route
            path='/testing'
            element={<Testing />}
          />
        </Routes>
      </Router>
    </>
  );
}
