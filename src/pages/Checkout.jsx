import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import MainLayout from '../layouts/MainLayout';
import {
    ShieldCheck,
    Truck,
    CreditCard,
    Lock,
    Store,
    Clock,
    ChevronRight,
    MapPin,
    AlertCircle,
    Check,
    Package
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../services/api';
import getImageUrl from '../services/image';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { cartItems, cartTotal, cartCount, ACOMPTE_AMOUNT, SHIPPING_FEE, clearCart, removeItemsByIds } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: 'Casablanca',
    });

    const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, card, wallet
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);

    // Group items by seller
    const sellerGroups = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            const sellerId = item.seller?.id || 'default';
            if (!acc[sellerId]) {
                acc[sellerId] = {
                    seller: item.seller || { name: 'Electro-05 Partenaire', city: 'Casablanca', prep_days: 1 },
                    items: [],
                    subtotal: 0
                };
            }
            acc[sellerId].items.push(item);
            acc[sellerId].subtotal += item.price * item.quantity;
            return acc;
        }, {});
    }, [cartItems]);

    // Calculate delivery estimate for a seller based on cities
    const getEstimate = (sellerCity, customerCity, prepDays) => {
        let shippingDays = 1;
        if (sellerCity.toLowerCase() !== customerCity.toLowerCase()) shippingDays += 1;
        const min = prepDays + shippingDays;
        const max = min + 2;
        return `${min} à ${max} jours ouvrables`;
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                payment_method: paymentMethod === 'cod' ? 'cod' : 'online',
                items: cartItems.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            const response = await axios.post(`${API_URL}/orders`, payload);
            const orderData = response.data;

            // Capture these before clearing the cart
            const finalCount = cartCount;

            toast.success(
                <div className="py-2">
                    <p className="font-bold text-base mb-1">💳 Paiement & Commande Confirmés</p>
                    <p className="text-xs opacity-90">📦 Livraison estimée : 2 à 4 jours ouvrables.</p>
                </div>,
                { duration: 5000, position: 'top-center' }
            );

            // Store both order info and the count for the success screen
            setOrderSuccess({
                id: orderData.order_id,
                itemCount: finalCount
            });

            clearCart();
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error("Erreur commande:", error);

            if (error.response?.status === 422) {
                const errors = error.response.data.errors;

                // 1. Check for specific product ID errors (indices)
                const invalidIndices = [];
                Object.keys(errors || {}).forEach(key => {
                    if (key.startsWith('items.') && key.endsWith('.id')) {
                        const index = parseInt(key.split('.')[1]);
                        if (!isNaN(index)) invalidIndices.push(index);
                    }
                });

                // 2. Determine if it's a general list error or specific items
                const isObsoleteItems = errors && (errors['items'] || invalidIndices.length > 0);

                if (isObsoleteItems) {
                    const invalidIds = invalidIndices.map(idx => cartItems[idx]?.id).filter(id => id !== undefined);

                    toast.error(
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="font-black text-sm mb-1 uppercase tracking-tight flex items-center gap-2">
                                    <AlertCircle size={16} className="text-red-500" />
                                    Panier Obsolète
                                </p>
                                <p className="text-[11px] leading-relaxed opacity-80">
                                    {invalidIds.length > 0
                                        ? `${invalidIds.length} article(s) n'existent plus dans notre base (identifiants expirés).`
                                        : "Certains articles ne sont plus valides suite à une mise à jour système."}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => {
                                        if (invalidIds.length > 0) {
                                            removeItemsByIds(invalidIds);
                                            toast.success("Articles expirés retirés ! Vous pouvez re-valider.");
                                        } else {
                                            clearCart();
                                            navigate('/');
                                        }
                                        toast.dismiss();
                                    }}
                                    className="w-full bg-red-600 text-white py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-600/20 active:scale-95 transition-all"
                                >
                                    {invalidIds.length > 0 ? "Corriger mon panier (Garder le reste)" : "Vider mon panier"}
                                </button>
                                <button
                                    onClick={() => toast.dismiss()}
                                    className="w-full bg-gray-100 text-gray-500 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>,
                        { duration: 10000, position: 'top-center' }
                    );
                } else {
                    const errorMessages = errors ? Object.values(errors).flat().join('\n') : "Veuillez vérifier les informations saisies.";
                    toast.error(errorMessages);
                }
            } else {
                toast.error("Erreur durant la validation. Veuillez vérifier vos informations.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderSuccess) {
        return (
            <MainLayout>
                <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-gray-950 font-sans">
                    <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
                        <Check size={48} strokeWidth={3} />
                    </div>
                    <div className="text-center space-y-4 max-w-lg">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest mb-2 border border-primary/20">
                            <Package size={14} />
                            {orderSuccess.itemCount} {orderSuccess.itemCount > 1 ? 'Produits' : 'Produit'} Commandé(s)
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">Commande <span className="text-primary">Confirmée !</span></h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            Merci pour votre confiance. Votre commande <span className="font-black text-gray-900 dark:text-white">#ECO-{(orderSuccess?.id || '0').toString().padStart(6, '0')}</span> est en cours de traitement.
                        </p>

                        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to={`/track/${orderSuccess.id}`}
                                className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-primary/30 hover:scale-105 active:scale-95"
                            >
                                <Truck size={20} />
                                Suivre ma commande
                                <ChevronRight size={18} />
                            </Link>
                            <Link
                                to="/"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-white/5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95"
                            >
                                Retour à l'accueil
                            </Link>
                        </div>
                    </div>

                    <div className="mt-16 p-6 bg-blue-50 dark:bg-primary/5 border border-primary/10 rounded-3xl flex items-start gap-4 max-w-md">
                        <div className="w-10 h-10 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                            <Clock size={20} className="text-primary" />
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                            <strong>Note :</strong> Un e-mail de confirmation vient d'être envoyé à <span className="text-primary font-bold">{orderSuccess.customer_email || formData.email}</span>. Pensez à vérifier vos spams !
                        </p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (cartItems.length === 0) {
        return (
            <MainLayout>
                <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <Truck size={40} className="text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">Votre panier est vide</h2>
                    <p className="text-gray-500 mb-8 text-center max-w-sm">Il semblerait que vous n'ayez pas encore ajouté d'articles High-Tech à votre panier.</p>
                    <Link to="/" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all">Poursuivre mes achats</Link>
                </div>
            </MainLayout>
        )
    }

    const TVA = cartTotal * 0.20;
    const TOTAL_FINAL = cartTotal + SHIPPING_FEE;

    return (
        <MainLayout>
            <div className="bg-[#f8fafc] min-h-screen pt-6 pb-10 lg:pt-16 lg:pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Summary */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
                                <Link to="/cart" className="hover:underline">Mon Panier</Link>
                                <ChevronRight size={14} />
                                <span>Paiement Sécurisé</span>
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Finaliser ma commande</h1>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                            <ShieldCheck size={20} className="text-green-500" />
                            <span className="text-sm font-medium text-gray-600">Transactions sécurisées par cryptage SSL</span>
                        </div>
                    </div>

                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <form onSubmit={handleSubmit} id="checkout-form" className="space-y-8">

                                {/* 1. Customer Information */}
                                <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="px-6 py-5 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                                        <h2 className="font-black text-lg text-gray-900 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-bold">1</div>
                                            Informations de livraison
                                        </h2>
                                        <Truck size={20} className="text-gray-400" />
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Prénom</label>
                                                <input type="text" name="firstName" required className="checkout-input" value={formData.firstName} onChange={handleInputChange} placeholder="Jean" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Nom</label>
                                                <input type="text" name="lastName" required className="checkout-input" value={formData.lastName} onChange={handleInputChange} placeholder="Dupont" />
                                            </div>
                                            <div className="sm:col-span-2 space-y-1.5">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">E-mail de contact</label>
                                                <input type="email" name="email" required className="checkout-input" value={formData.email} onChange={handleInputChange} placeholder="vous@exemple.com" />
                                            </div>
                                            <div className="sm:col-span-2 space-y-1.5">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Adresse complète</label>
                                                <div className="relative">
                                                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input type="text" name="address" required className="checkout-input pl-11" value={formData.address} onChange={handleInputChange} placeholder="N°, Rue, Quartier..." />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Ville</label>
                                                <select name="city" required className="checkout-input" value={formData.city} onChange={handleInputChange}>
                                                    <option value="Casablanca">Casablanca</option>
                                                    <option value="Rabat">Rabat</option>
                                                    <option value="Marrakech">Marrakech</option>
                                                    <option value="Tanger">Tanger</option>
                                                    <option value="Fès">Fès</option>
                                                    <option value="Agadir">Agadir</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Téléphone mobile</label>
                                                <input type="tel" name="phone" required className="checkout-input" value={formData.phone} onChange={handleInputChange} placeholder="06 XX XX XX XX" />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* 2. Vendor Order Details */}
                                <section className="space-y-4">
                                    <h2 className="font-black text-lg text-gray-900 flex items-center gap-3 px-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-bold">2</div>
                                        Détails de l'expédition multi-vendeurs
                                    </h2>

                                    {Object.values(sellerGroups).map((group, idx) => (
                                        <div key={idx} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                            <div className="px-6 py-4 bg-blue-50/30 border-b border-gray-100 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-white border border-blue-100 flex items-center justify-center shadow-sm">
                                                        <Store size={18} className="text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Vendu par</p>
                                                        <p className="font-bold text-gray-900">{group.seller.name}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-full uppercase mb-1 flex items-center gap-1 justify-end">
                                                        <Check size={10} /> Livraison disponible
                                                    </div>
                                                    <p className="text-xs font-medium text-gray-500 flex items-center gap-1 justify-end">
                                                        <Clock size={12} /> {getEstimate(group.seller.city, formData.city, group.seller.prep_days)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="p-4 sm:p-6 space-y-4">
                                                {group.items.map((item) => (
                                                    <div key={item.id} className="flex gap-4 items-center">
                                                        <div className="w-16 h-16 bg-gray-50 rounded-xl p-1 flex-shrink-0 border border-gray-100">
                                                            <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-sm font-bold text-gray-900 leading-tight">{item.name}</h3>
                                                            <p className="text-xs text-gray-500 mt-0.5">Quantité: {item.quantity}</p>
                                                            <p className="text-[10px] text-blue-600 font-bold mt-1 bg-blue-50 inline-block px-2 py-0.5 rounded italic">
                                                                📦 {item.delivery_type === 'express' ? 'Expédition Express ⚡' : 'Expédition Standard'}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-black text-gray-900">{(item.price * item.quantity).toLocaleString()} DH</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </section>

                                {/* 3. Payment Methods */}
                                <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="px-6 py-5 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                                        <h2 className="font-black text-lg text-gray-900 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-bold">3</div>
                                            Méthode de règlement
                                        </h2>
                                        <CreditCard size={20} className="text-gray-400" />
                                    </div>
                                    <div className="p-6 space-y-4">

                                        {/* Card Option */}
                                        <div
                                            onClick={() => setPaymentMethod('card')}
                                            className={`relative group p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-blue-50/30' : 'border-gray-100 hover:border-blue-200'}`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex gap-4">
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${paymentMethod === 'card' ? 'border-primary' : 'border-gray-200'}`}>
                                                        {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-primary" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-900 uppercase text-sm tracking-wide">Paiement par Carte Bancaire</p>
                                                        <p className="text-xs text-gray-500 mt-1">Visa, Mastercard, CMI. Paiement 100% sécurisé.</p>
                                                        <div className="flex gap-2 mt-3 grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100">
                                                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                                                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                                            <img src={getImageUrl('cmi.png')} alt="CMI" className="h-5" />
                                                        </div>
                                                    </div>
                                                </div>
                                                {paymentMethod === 'card' && <div className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Suggéré</div>}
                                            </div>
                                        </div>

                                        {/* COD Option */}
                                        <div
                                            onClick={() => setPaymentMethod('cod')}
                                            className={`p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-blue-50/30' : 'border-gray-100 hover:border-blue-200'}`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${paymentMethod === 'cod' ? 'border-primary' : 'border-gray-200'}`}>
                                                    {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-primary" />}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 uppercase text-sm tracking-wide">Paiement à la livraison + Avance (100 DH)</p>
                                                    <p className="text-xs text-gray-500 mt-1">Réglez l'acompte de 100 DH via Agence (Wafacash/CashPlus) pour confirmer, puis le solde à la réception.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                                            <AlertCircle size={20} className="text-amber-500 flex-shrink-0" />
                                            <p className="text-[11px] text-amber-800 leading-relaxed">
                                                <strong>Note sur l'acompte :</strong> Un acompte de {ACOMPTE_AMOUNT} DH est obligatoire pour valider toute commande sur Electro-05. Ce montant sera déduit du total final à payer.
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </form>
                        </div>

                        {/* Order Summary sidebar */}
                        <div className="lg:col-span-4 mt-8 lg:mt-0">
                            <div className="sticky top-24">
                                <div className="bg-[#1e293b] text-white rounded-[32px] p-8 shadow-2xl shadow-blue-900/10 border border-white/5 overflow-hidden relative">
                                    {/* Decorative background circle */}
                                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                                    <h2 className="text-xl font-black mb-8 flex items-center gap-3">
                                        Résumé Final
                                        <div className="px-2 py-0.5 bg-blue-500 rounded-lg text-[10px] font-black uppercase">Sécurisé</div>
                                    </h2>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-sm text-gray-400">
                                            <span>Articles ({cartCount})</span>
                                            <span className="font-bold text-white">{cartTotal.toLocaleString()} DH</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-400">
                                            <span>Frais de livraison</span>
                                            <span className="font-bold text-white">{SHIPPING_FEE} DH</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-400">
                                            <span>Taxes (TVA 20%)</span>
                                            <span className="font-bold text-white">Incluses</span>
                                        </div>
                                        <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase font-black tracking-widest">Total à payer</p>
                                                <p className="text-3xl font-black text-white">{TOTAL_FINAL.toLocaleString()} DH</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl p-4 mb-8 space-y-3">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-400">Acompte requisitionné</span>
                                            <span className="text-blue-400 font-bold">{ACOMPTE_AMOUNT} DH</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-400">Reste à payer (Livraison)</span>
                                            <span className="text-green-400 font-bold">{(TOTAL_FINAL - ACOMPTE_AMOUNT).toLocaleString()} DH</span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        form="checkout-form"
                                        disabled={isSubmitting}
                                        className="w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-[20px] font-black text-lg transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? (
                                            <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Lock size={20} />
                                                {paymentMethod === 'cod' ? 'Confirmer l\'Ordre' : 'Procéder au Paiement'}
                                            </>
                                        )}
                                    </button>

                                    <div className="mt-6 space-y-3 opacity-60">
                                        <div className="flex items-start gap-2 text-[10px]">
                                            <Check size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                            <p>En cliquant, vous acceptez les conditions de vente d'Electro-05.</p>
                                        </div>
                                        <div className="flex items-start gap-2 text-[10px]">
                                            <Check size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                            <p>Suivi en temps réel disponible après confirmation par SMS/Email.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-wrap justify-center gap-4 grayscale opacity-40">
                                    {/* Partner Trust Logos */}
                                    <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-400">STRIPE READY</div>
                                    <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-400">CMI SECURE</div>
                                    <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-400">PCI-DSS COMPLIANT</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .checkout-input {
                    display: block;
                    width: 100%;
                    padding: 0.875rem 1rem;
                    background-color: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 1rem;
                    font-size: 0.875rem;
                    color: #1a202c;
                    transition: all 0.2s;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                }
                .checkout-input:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
                .checkout-input::placeholder {
                    color: #a0aec0;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
            `}</style>
        </MainLayout>
    );
};

export default Checkout;

