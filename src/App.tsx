import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Channel from './pages/Channel';
import CreateChannel from './pages/CreateChannel';
import DemoChannel from './pages/DemoChannel';
import Watch from './pages/Watch';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-900 text-white">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/demo/create" element={<DemoChannel />} />
                  <Route path="/watch/:channelId" element={<Watch />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/channel/new"
                    element={
                      <ProtectedRoute>
                        <CreateChannel />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/channel/:id"
                    element={
                      <ProtectedRoute>
                        <Channel />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
            </div>
            <Toaster position="top-right" />
          </BrowserRouter>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;