import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../services/api';
import { getImageUrl } from '../services/image';
import MainLayout from '../layouts/MainLayout';
import {
    Package,
    Truck,
    CheckCircle2,
    Clock,
    Search,
    Calendar,
    ArrowRight,
    MapPin,
    AlertCircle
} from 'lucide-react';
import SEO from '../components/atoms/SEO';

const OrderTracking = () => {
    const { id: urlParamId } = useParams();
    const [orderIdInput, setOrderIdInput] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const trackOrderById = useCallback(async (targetId) => {
        if (!targetId) return;

        setLoading(true);
        setError(null);

        try {
            // Support both plain ID and #ECO-000001 format
            const cleanId = targetId.toString().replace(/[^0-9]/g, '');
            const response = await axios.get(`${API_URL}/orders/${cleanId}`);
            setOrder(response.data);
            setOrderIdInput(`#ECO-${cleanId.padStart(6, '0')}`);
        } catch (err) {
            console.error("Error fetching order:", err);
            setError("Numéro de commande introuvable. Veuillez vérifier et réessayer.");
            setOrder(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Effect to handle direct ID from URL (e.g., after checkout)
    useEffect(() => {
        if (urlParamId) {
            trackOrderById(urlParamId);
        }
    }, [urlParamId, trackOrderById]);

    const handleTrackSubmit = (e) => {
        e.preventDefault();
        trackOrderById(orderIdInput);
    };

    const steps = [
        { id: 'pending', label: 'Commande confirmée', icon: Package, day: 'Jour 1' },
        { id: 'processing', label: 'En cours de préparation', icon: Clock, day: 'Jour 2' },
        { id: 'shipped', label: 'Expédiée / En route', icon: Truck, day: 'Jour 3' },
        { id: 'completed', label: 'Livrée', icon: CheckCircle2, day: 'Jour 3-4' },
    ];

    const getStepStatus = (stepId, currentStatus) => {
        const orderStatusOrder = ['pending', 'processing', 'shipped', 'completed'];
        const currentIdx = orderStatusOrder.indexOf(currentStatus);
        const stepIdx = orderStatusOrder.indexOf(stepId);

        if (stepIdx < currentIdx) return 'completed';
        if (stepIdx === currentIdx) return 'current';
        return 'upcoming';
    };

    return (
        <MainLayout>
            <SEO title="Suivre ma commande | Electro-05" description="Suivez l'état de votre commande en temps réel." />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-950/50 py-12 lg:py-20 font-sans">
                <div className="max-w-4xl mx-auto px-4">

                    {/* Search Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4 italic">
                            Suivre ma <span className="text-primary">Commande</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-8">
                            Entrez votre numéro de commande pour connaître l'état d'avancement de votre livraison en temps réel.
                        </p>

                        <form onSubmit={handleTrackSubmit} className="relative max-w-lg mx-auto group">
                            <input
                                type="text"
                                value={orderIdInput}
                                onChange={(e) => setOrderIdInput(e.target.value)}
                                placeholder="Numéro de commande (ex: #ECO-0005)"
                                className="w-full pl-6 pr-32 py-5 bg-white dark:bg-gray-900 border-2 border-transparent focus:border-primary rounded-[25px] shadow-2xl shadow-primary/5 dark:text-white font-bold outline-none transition-all group-hover:shadow-primary/10"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="absolute right-2 top-2 bottom-2 px-8 bg-primary text-white rounded-[20px] font-black uppercase text-[10px] tracking-widest hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? '...' : 'Suivre'}
                            </button>
                        </form>

                        {error && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-red-500 font-bold text-sm">
                                <AlertCircle size={16} /> {error}
                            </div>
                        )}
                    </div>

                    {/* Order Details Display */}
                    {order && (
                        <div className="space-y-8 animate-fade-in">

                            {/* Status Timeline */}
                            <div className="bg-white dark:bg-gray-900 rounded-[40px] p-8 lg:p-12 shadow-2xl shadow-black/5 dark:shadow-none border border-gray-100 dark:border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
                                    <Truck size={120} />
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                                    <div>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Détails de l'envoi</p>
                                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase">Status de livraison</h2>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 px-6 py-3 rounded-2xl">
                                        <Calendar className="text-primary" size={20} />
                                        <div>
                                            <p className="text-[9px] font-black text-gray-400 uppercase">Livraison Estimée</p>
                                            <p className="text-xs font-black dark:text-white">{order.delivery_date || 'Sous 2 à 3 jours'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Modern Horizontal Timeline */}
                                <div className="relative mb-12 px-4">
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-white/5 -translate-y-1/2 rounded-full hidden md:block"></div>
                                    <div className="relative flex flex-col md:flex-row justify-between gap-8">
                                        {steps.map((step, idx) => {
                                            const status = getStepStatus(step.id, order.status);
                                            return (
                                                <div key={step.id} className="relative flex md:flex-col items-center gap-4 md:gap-0 z-10">
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 ${status === 'completed' ? 'bg-green-500 border-green-100 dark:border-green-500/20 text-white shadow-lg shadow-green-500/30' :
                                                        status === 'current' ? 'bg-primary border-primary/20 text-white shadow-lg shadow-primary/30 animate-pulse' :
                                                            'bg-white dark:bg-gray-800 border-gray-100 dark:border-white/5 text-gray-300'
                                                        }`}>
                                                        <step.icon size={24} />
                                                    </div>
                                                    <div className="md:mt-4 text-left md:text-center">
                                                        <p className={`text-[9px] font-black uppercase tracking-widest ${status === 'upcoming' ? 'text-gray-400' : 'text-primary'}`}>{step.day}</p>
                                                        <p className={`text-xs font-black uppercase max-w-[120px] ${status === 'upcoming' ? 'text-gray-300 dark:text-gray-600' : 'text-gray-900 dark:text-white'}`}>{step.label}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="p-6 rounded-3xl bg-blue-50 dark:bg-primary/5 border border-primary/10 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-primary" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900 dark:text-white">Dernière étape connue :</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            {order.status === 'completed' ? 'Colis livré en mains propres.' :
                                                order.status === 'shipped' ? 'Colis chargé dans le camion de livraison.' :
                                                    order.status === 'processing' ? 'Colis scanné au centre de tri national.' :
                                                        'Commande validée, en attente de traitement.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Products */}
                            <div className="bg-white dark:bg-gray-900 rounded-[40px] p-8 lg:p-12 shadow-2xl shadow-black/5 dark:shadow-none border border-gray-100 dark:border-white/5">
                                <div className="flex justify-between items-center mb-8 border-b border-gray-50 dark:border-white/5 pb-6">
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase">Contenu du Colis</h3>
                                    <span className="bg-gray-100 dark:bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase dark:text-gray-400">
                                        {order.items?.length || 0} Articles
                                    </span>
                                </div>

                                <div className="divide-y divide-gray-50 dark:divide-white/5">
                                    {order.items?.map((item, idx) => (
                                        <div key={idx} className="py-6 flex gap-6 items-center group">
                                            <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-3xl p-3 flex-shrink-0 transition-transform group-hover:scale-105">
                                                <img
                                                    src={getImageUrl(item.product?.image)}
                                                    alt={item.product?.name}
                                                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-extrabold text-gray-900 dark:text-white leading-tight mb-1">{item.product?.name}</h4>
                                                <div className="flex items-center gap-4">
                                                    <p className="text-xs font-medium text-gray-500">Lot de {item.quantity}</p>
                                                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                                    <p className="text-xs font-black text-primary">{parseFloat(item.price).toLocaleString()} DH</p>
                                                </div>
                                            </div>
                                            <Link to={`/product/${item.product_id}`} className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-400 hover:text-primary hover:bg-primary/10 transition-all">
                                                <ArrowRight size={20} />
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-50 dark:border-white/5 flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Total de la commande</p>
                                        <p className="text-2xl font-black text-gray-900 dark:text-white">{parseFloat(order.total_amount).toLocaleString()} <small className="text-sm">DH</small></p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Dernière mise à jour</p>
                                        <p className="text-xs font-bold dark:text-gray-400">{new Date(order.updated_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                </div>
            </div>
        </MainLayout>
    );
};

export default OrderTracking;
