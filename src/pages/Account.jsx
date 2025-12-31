import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import {
    User,
    Package,
    Settings,
    LogOut,
    ChevronRight,
    MapPin,
    Phone,
    Mail,
    Shield,
    Clock,
    ShoppingBag,
    Eye,
    CheckCircle2,
    Truck,
    AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../services/api';
import toast from 'react-hot-toast';
import SEO from '../components/atoms/SEO';
import Loader from '../components/atoms/Loader';

const Account = () => {
    const { user, logout, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    // Profile Edit State
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        city: user?.city || 'Casablanca',
        address: user?.address || '',
    });

    // Password Change State
    const [passwords, setPasswords] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                phone: user.phone || '',
                city: user.city || 'Casablanca',
                address: user.address || '',
            });
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
            const response = await axios.get(`${API_URL}/my-orders`);
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setOrdersLoading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/user`, profileData);
            toast.success("Profil mis à jour !");
            setIsEditing(false);
        } catch (error) {
            toast.error("Erreur lors de la mise à jour.");
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.new_password !== passwords.new_password_confirmation) {
            return toast.error("Les mots de passe ne correspondent pas.");
        }
        try {
            await axios.post(`${API_URL}/user/change-password`, passwords);
            toast.success("Mot de passe modifié !");
            setPasswords({ current_password: '', new_password: '', new_password_confirmation: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || "Erreur lors du changement.");
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
        toast.success("Déconnecté avec succès");
    };

    if (authLoading || !user) return <div className="min-h-screen flex items-center justify-center bg-gray-950"><Loader /></div>;

    const navItems = [
        { id: 'dashboard', label: 'Tableau de bord', icon: Clock },
        { id: 'orders', label: 'Mes commandes', icon: Package },
        { id: 'profile', label: 'Mon profil', icon: User },
        { id: 'security', label: 'Sécurité', icon: Shield },
    ];

    return (
        <MainLayout>
            <SEO title="Mon Compte | Electro-05" />
            <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 py-12 lg:py-20 font-sans transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">
                                Mon <span className="text-primary italic">compte</span>
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">
                                Bienvenue, <span className="font-bold text-gray-900 dark:text-white">{user.name}</span>. Gérez vos informations et commandes.
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 rounded-2xl font-bold hover:bg-red-100 transition-all active:scale-95 text-sm"
                        >
                            <LogOut size={18} /> Déconnexion
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8">

                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-3">
                            <nav className="bg-white dark:bg-gray-900 rounded-[32px] p-4 shadow-xl shadow-black/5 dark:shadow-none border border-gray-100 dark:border-white/5 sticky top-24">
                                <ul className="space-y-2">
                                    {navItems.map((item) => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => setActiveTab(item.id)}
                                                className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold transition-all group ${activeTab === item.id
                                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <item.icon size={20} />
                                                    <span className="text-sm">{item.label}</span>
                                                </div>
                                                <ChevronRight size={16} className={`transition-transform duration-300 ${activeTab === item.id ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-9">
                            <div className="bg-white dark:bg-gray-900 rounded-[40px] shadow-2xl shadow-black/5 dark:shadow-none border border-gray-100 dark:border-white/5 overflow-hidden min-h-[600px] transition-all">

                                {/* 1. Dashboard Tab */}
                                {activeTab === 'dashboard' && (
                                    <div className="p-8 lg:p-12 animate-fade-in">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-primary/20 flex items-center justify-center text-primary">
                                                <Clock size={20} />
                                            </div>
                                            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase">Résumé d'activité</h2>
                                        </div>

                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                            <div className="bg-[#f8fafc] dark:bg-white/5 p-6 rounded-[32px] border border-gray-100 dark:border-white/5">
                                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm mb-4">
                                                    <ShoppingBag size={22} className="text-primary" />
                                                </div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Commandes</p>
                                                <p className="text-3xl font-black text-gray-900 dark:text-white">{orders.length}</p>
                                            </div>
                                            <div className="bg-[#f8fafc] dark:bg-white/5 p-6 rounded-[32px] border border-gray-100 dark:border-white/5">
                                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm mb-4">
                                                    <CheckCircle2 size={22} className="text-green-500" />
                                                </div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Commandes Livrées</p>
                                                <p className="text-3xl font-black text-gray-900 dark:text-white">
                                                    {orders.filter(o => o.status === 'completed').length}
                                                </p>
                                            </div>
                                            <div className="bg-[#f8fafc] dark:bg-white/5 p-6 rounded-[32px] border border-gray-100 dark:border-white/5">
                                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm mb-4">
                                                    <Truck size={22} className="text-blue-500" />
                                                </div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">En Cours</p>
                                                <p className="text-3xl font-black text-gray-900 dark:text-white">
                                                    {orders.filter(o => ['pending', 'processing', 'shipped'].includes(o.status)).length}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h3 className="font-black text-lg text-gray-900 dark:text-white flex items-center gap-3">
                                                Dernière commande
                                            </h3>
                                            {orders.length > 0 ? (
                                                <div className="group relative bg-[#f8fafc] dark:bg-white/5 rounded-[32px] p-8 border border-gray-100 dark:border-white/5 overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/5">
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                        <div className="flex items-center gap-6">
                                                            <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center shadow-sm">
                                                                <Package size={28} className="text-primary" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">#ECO-{(orders[0].id).toString().padStart(6, '0')}</p>
                                                                <p className="font-black text-gray-900 dark:text-white text-xl">{orders[0].total_amount.toLocaleString()} DH</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Commandée le {new Date(orders[0].created_at).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${orders[0].status === 'completed' ? 'bg-green-100 text-green-600' :
                                                                    orders[0].status === 'cancelled' ? 'bg-red-100 text-red-600' :
                                                                        'bg-blue-100 text-blue-600'
                                                                }`}>
                                                                {orders[0].status}
                                                            </div>
                                                            <Link
                                                                to={`/track/${orders[0].id}`}
                                                                className="p-3 bg-white dark:bg-gray-800 rounded-xl text-primary shadow-sm hover:scale-110 active:scale-95 transition-all"
                                                            >
                                                                <Eye size={20} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center py-12 bg-gray-50 dark:bg-white/5 rounded-[32px] border-2 border-dashed border-gray-200 dark:border-white/10">
                                                    <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                                                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Aucune commande pour le moment</p>
                                                    <Link to="/shop" className="mt-4 inline-block text-primary font-black text-xs uppercase hover:underline">Aller à la boutique</Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* 2. Orders List Tab */}
                                {activeTab === 'orders' && (
                                    <div className="p-8 lg:p-12 animate-fade-in">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-500">
                                                <Package size={20} />
                                            </div>
                                            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase">Historique complet</h2>
                                        </div>

                                        {ordersLoading ? (
                                            <div className="flex justify-center py-20"><Loader /></div>
                                        ) : orders.length > 0 ? (
                                            <div className="space-y-4">
                                                {orders.map((order) => (
                                                    <div key={order.id} className="bg-gray-50 dark:bg-white/5 p-6 rounded-[24px] border border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center text-primary border border-gray-100 dark:border-white/10">
                                                                <ShoppingBag size={20} />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-black text-gray-400">#ECO-{order.id.toString().padStart(6, '0')}</p>
                                                                <p className="text-sm font-black text-gray-900 dark:text-white">{order.total_amount.toLocaleString()} DH</p>
                                                                <p className="text-[10px] text-gray-500 opacity-60">{new Date(order.created_at).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                                            <div className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${order.status === 'completed' ? 'bg-green-100 text-green-600' :
                                                                    order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                                                                        'bg-blue-100 text-blue-600'
                                                                }`}>
                                                                {order.status}
                                                            </div>
                                                            <Link to={`/track/${order.id}`} className="text-primary font-black text-[10px] uppercase flex items-center gap-1 hover:underline">
                                                                Détails <ChevronRight size={14} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-20">
                                                <Package size={60} className="mx-auto text-gray-200 mb-6" />
                                                <h3 className="text-xl font-bold text-gray-400">Aucun historique disponible.</h3>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* 3. Profile Tab */}
                                {activeTab === 'profile' && (
                                    <div className="p-8 lg:p-12 animate-fade-in">
                                        <div className="flex items-center justify-between mb-10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-500">
                                                    <User size={20} />
                                                </div>
                                                <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase">Informations personnelles</h2>
                                            </div>
                                            {!isEditing && (
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-xl font-bold text-xs uppercase transition-all hover:scale-105 active:scale-95"
                                                >
                                                    Modifier
                                                </button>
                                            )}
                                        </div>

                                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nom complet</label>
                                                    <div className="relative">
                                                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            disabled={!isEditing}
                                                            className="account-input pl-12"
                                                            value={profileData.name}
                                                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">E-mail (Non modifiable)</label>
                                                    <div className="relative">
                                                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="email"
                                                            disabled
                                                            className="account-input pl-12 bg-gray-50/50 dark:bg-white/5 opacity-60"
                                                            value={user.email}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Téléphone</label>
                                                    <div className="relative">
                                                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="tel"
                                                            disabled={!isEditing}
                                                            className="account-input pl-12"
                                                            value={profileData.phone}
                                                            placeholder="06 XX XX XX XX"
                                                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ville</label>
                                                    <div className="relative">
                                                        <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <select
                                                            disabled={!isEditing}
                                                            className="account-input pl-12 appearance-none"
                                                            value={profileData.city}
                                                            onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                                                        >
                                                            <option value="Casablanca">Casablanca</option>
                                                            <option value="Rabat">Rabat</option>
                                                            <option value="Tanger">Tanger</option>
                                                            <option value="Marrakech">Marrakech</option>
                                                            <option value="Fès">Fès</option>
                                                            <option value="Agadir">Agadir</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Adresse de livraison</label>
                                                    <textarea
                                                        disabled={!isEditing}
                                                        rows="3"
                                                        className="account-input h-auto resize-none"
                                                        value={profileData.address}
                                                        placeholder="Votre adresse complète..."
                                                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                                    ></textarea>
                                                </div>
                                            </div>

                                            {isEditing && (
                                                <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-white/5 pt-8">
                                                    <button
                                                        type="submit"
                                                        className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                                                    >
                                                        Sauvegarder
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setIsEditing(false); setProfileData({
                                                                name: user.name || '',
                                                                phone: user.phone || '',
                                                                city: user.city || 'Casablanca',
                                                                address: user.address || '',
                                                            });
                                                        }}
                                                        className="px-8 py-4 bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest"
                                                    >
                                                        Annuler
                                                    </button>
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                )}

                                {/* 4. Security Tab */}
                                {activeTab === 'security' && (
                                    <div className="p-8 lg:p-12 animate-fade-in">
                                        <div className="flex items-center gap-3 mb-10">
                                            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-500">
                                                <Shield size={20} />
                                            </div>
                                            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase">Sécurité du compte</h2>
                                        </div>

                                        <div className="max-w-md">
                                            <form onSubmit={handlePasswordChange} className="space-y-6">
                                                <div className="p-4 bg-blue-50 dark:bg-primary/5 rounded-2xl border border-primary/10 flex gap-3 mb-8">
                                                    <AlertCircle className="text-primary flex-shrink-0" size={20} />
                                                    <p className="text-[11px] text-blue-800 dark:text-blue-300 leading-relaxed">
                                                        Utilisez un mot de passe fort combinant des lettres, des chiffres et des symboles pour une sécurité maximale.
                                                    </p>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mot de passe actuel</label>
                                                    <input
                                                        type="password"
                                                        required
                                                        className="account-input"
                                                        value={passwords.current_password}
                                                        onChange={(e) => setPasswords({ ...passwords, current_password: e.target.value })}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nouveau mot de passe</label>
                                                    <input
                                                        type="password"
                                                        required
                                                        className="account-input"
                                                        value={passwords.new_password}
                                                        onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirmer le mot de passe</label>
                                                    <input
                                                        type="password"
                                                        required
                                                        className="account-input"
                                                        value={passwords.new_password_confirmation}
                                                        onChange={(e) => setPasswords({ ...passwords, new_password_confirmation: e.target.value })}
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
                                                >
                                                    Mettre à jour le mot de passe
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .account-input {
                    width: 100%;
                    padding: 1rem 1.25rem;
                    background: transparent;
                    border: 2px solid #f1f5f9;
                    border-radius: 1.25rem;
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: #1e293b;
                    transition: all 0.3s;
                    outline: none;
                }
                .dark .account-input {
                    border-color: rgba(255,255,255,0.05);
                    color: white;
                    background: rgba(255,255,255,0.02);
                }
                .account-input:focus {
                    border-color: #3b82f6;
                    background: white;
                    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1);
                }
                .dark .account-input:focus {
                    background: rgba(255,255,255,0.05);
                }
                .account-input:disabled {
                    cursor: not-allowed;
                    background: #f8fafc;
                }
                .dark .account-input:disabled {
                    background: rgba(255,255,255,0.01);
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
            `}</style>
        </MainLayout>
    );
};

export default Account;
