import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider, useWallet } from './context/WalletContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import UploadWebsite from './pages/UploadWebsite';
import DeploymentDetails from './pages/DeploymentDetails';
import './styles/main.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isConnected } = useWallet();
  
  if (!isConnected) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// App Layout
const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <WalletProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadWebsite />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deployment/:id"
              element={
                <ProtectedRoute>
                  <DeploymentDetails />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </WalletProvider>
    </Router>
  );
}

export default App;
