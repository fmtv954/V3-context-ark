import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Onboarding } from './pages/Onboarding';
import { Workspace } from './pages/Workspace';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { Pricing } from './pages/Pricing';
import { AdminDashboard } from './pages/AdminDashboard';
import { getCurrentUser } from './services/auth';

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const user = getCurrentUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes wrapped in Layout */}
        <Route path="/dashboard" element={
          <RequireAuth>
            <Layout>
              <Dashboard />
            </Layout>
          </RequireAuth>
        } />
        
        <Route path="/admin" element={
          <RequireAuth>
            <Layout>
              <AdminDashboard />
            </Layout>
          </RequireAuth>
        } />
        
        <Route path="/new" element={
          <RequireAuth>
            <Layout>
              <Onboarding />
            </Layout>
          </RequireAuth>
        } />
        
        <Route path="/workspace/:id" element={
           <RequireAuth>
             <Layout>
              <Workspace />
             </Layout>
           </RequireAuth>
        } />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;