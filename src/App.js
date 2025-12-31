import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/atoms/Loader';
import SplashScreen from './components/atoms/SplashScreen';
import { CartProvider } from './context/CartContext';
import { CompareProvider } from './context/CompareContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import CartDrawer from './components/organisms/CartDrawer';
// import MainLayout from './layouts/MainLayout';

import ProtectedRoute from './components/ProtectedRoute';
import BackToTop from './components/atoms/BackToTop';
import SmartAssistant from './components/organisms/SmartAssistant';
import { Toaster } from 'react-hot-toast';

// Lazy load pages for extreme performance (Code Splitting)
const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Shop = lazy(() => import('./pages/Shop'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminProducts = lazy(() => import('./pages/AdminProducts'));
const AdminProductForm = lazy(() => import('./pages/AdminProductForm'));
const AdminOrders = lazy(() => import('./pages/AdminOrders'));
const AdminCategories = lazy(() => import('./pages/AdminCategories'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const Comparison = lazy(() => import('./pages/Comparison'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));
const Support = lazy(() => import('./pages/Support'));
const Promotions = lazy(() => import('./pages/Promotions'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Returns = lazy(() => import('./pages/Returns'));
const Terms = lazy(() => import('./pages/Terms'));
const Account = lazy(() => import('./pages/Account'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <Loader />
  </div>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
                padding: '16px 24px',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
                style: {
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
                style: {
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                },
              },
              loading: {
                iconTheme: {
                  primary: '#3b82f6',
                  secondary: '#fff',
                },
              },
            }}
          />
          <WishlistProvider>
            <CartProvider>
              <CompareProvider>
                <div id="app-root" translate="no" className="min-h-screen relative">
                  {showSplash && (
                    <div key="splash-container">
                      <SplashScreen onComplete={handleSplashComplete} />
                    </div>
                  )}

                  {!showSplash && (
                    <div key="main-app" className="animate-fade-in">
                      <Router>
                        <CartDrawer />
                        <BackToTop />
                        <SmartAssistant />
                        <Suspense fallback={<PageLoader />}>
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/shop/:category" element={<Shop />} />
                            <Route path="/shop/:category/:subcategory" element={<Shop />} />
                            <Route path="/cart" element={<Home />} />
                            <Route
                              path="/checkout"
                              element={
                                <ProtectedRoute>
                                  <Checkout />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/dashboard"
                              element={
                                <ProtectedRoute adminOnly>
                                  <Dashboard />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/products"
                              element={
                                <ProtectedRoute adminOnly>
                                  <AdminProducts />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/products/new"
                              element={
                                <ProtectedRoute adminOnly>
                                  <AdminProductForm />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/products/edit/:id"
                              element={
                                <ProtectedRoute adminOnly>
                                  <AdminProductForm />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/orders"
                              element={
                                <ProtectedRoute adminOnly>
                                  <AdminOrders />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/categories"
                              element={
                                <ProtectedRoute adminOnly>
                                  <AdminCategories />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/users"
                              element={
                                <ProtectedRoute adminOnly>
                                  <AdminUsers />
                                </ProtectedRoute>
                              }
                            />
                            <Route path="/comparison" element={<Comparison />} />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/track/:id" element={<OrderTracking />} />
                            <Route path="/promotions" element={<Promotions />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/retours" element={<Returns />} />
                            <Route path="/conditions" element={<Terms />} />
                            <Route path="/order-tracking" element={<OrderTracking />} />
                            <Route
                              path="/support"
                              element={
                                <ProtectedRoute>
                                  <Support />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/account"
                              element={
                                <ProtectedRoute>
                                  <Account />
                                </ProtectedRoute>
                              }
                            />
                          </Routes>
                        </Suspense>
                      </Router>
                    </div>
                  )}
                </div>
              </CompareProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
