import React, { useState } from 'react';
import { LifeBuoy, Package, HelpCircle, RefreshCcw, ShieldCheck, Mail, Phone, MessageSquare, ChevronRight, Search, Zap, ExternalLink } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/atoms/SEO';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Support = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        { q: "Quels sont vos délais de livraison ?", a: "Nous livrons généralement sous 24h à 48h partout au Maroc via nos partenaires logistiques." },
        { q: "Comment fonctionne la garantie ?", a: "Tous nos produits bénéficient d'une garantie de 6 à 12 mois selon le type d'appareil (Neuf ou Reconditionné)." },
        { q: "Proposez-vous le paiement à la livraison ?", a: "Oui, vous pouvez régler votre commande en espèces directement auprès du livreur après vérification du colis." },
        { q: "Puis-je retourner un article ?", a: "Vous disposez de 7 jours pour retourner un article dans son emballage d'origine s'il ne vous satisfait pas." }
    ];

    const helpCards = [
        { icon: Package, title: "Suivre ma commande", desc: "Vérifiez l'état de votre colis en temps réel avec votre numéro de suivi.", link: "/track-order", color: "bg-blue-500" },
        { icon: RefreshCcw, title: "Retours & Remboursements", desc: "Besoin de retourner un produit ? Suivez notre procédure simplifiée.", link: "#", color: "bg-red-500" },
        { icon: ShieldCheck, title: "Garantie & Réparation", desc: "Activez votre garantie ou demandez une prise en charge technique.", link: "#", color: "bg-green-500" },
        { icon: HelpCircle, title: "Centre d'Aide / FAQ", desc: "Trouvez des réponses rapides aux questions les plus fréquentes.", link: "#", color: "bg-amber-500" }
    ];

    const handleSubmitTicket = (e) => {
        e.preventDefault();
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Création de votre demande...',
                success: 'Demande envoyée ! Un conseiller vous répondra par email sous 2h.',
                error: 'Erreur lors de l\'envoi.',
            }
        );
    };

    return (
        <MainLayout>
            <SEO title="Support & Assistance" description="Besoin d'aide ? Contactez le support technique d'Electro-05 pour vos commandes, garanties et questions techniques." />

            <div className="bg-gray-50 dark:bg-slate-950 min-h-screen pb-20">
                {/* 1. Specialized Hero */}
                <div className="bg-primary pt-16 pb-32 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -ml-32 -mt-32 blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full -mr-32 -mb-32 blur-3xl"></div>
                    </div>

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20 shadow-xl animate-bounce-slow">
                            <LifeBuoy size={40} className="text-white" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
                            Bienvenue, {user?.name?.split(' ')[0] || 'Client'} !<br />
                            <span className="text-white/60">Comment pouvons-nous vous aider ?</span>
                        </h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto font-medium mb-10">
                            Notre équipe d'assistance est disponible du Lundi au Samedi (9h-19h) pour vous garantir la meilleure expérience d'achat.
                        </p>

                        {/* Fake Search Bar */}
                        <div className="max-w-2xl mx-auto relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={24} />
                            <input
                                type="text"
                                placeholder="Rechercher une solution (garantie, livraison, stock...)"
                                className="w-full bg-white rounded-3xl py-6 pl-16 pr-8 text-lg font-bold shadow-2xl outline-none focus:ring-4 focus:ring-white/20 transition-all text-gray-900"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Quick Actions Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {helpCards.map((card, idx) => (
                            <div
                                key={idx}
                                className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-xl border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all group cursor-pointer"
                                onClick={() => card.link !== '#' && navigate(card.link)}
                            >
                                <div className={`w-14 h-14 rounded-2xl ${card.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <card.icon size={28} />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    {card.title}
                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid lg:grid-cols-3 gap-12">
                    {/* 3. FAQ Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                <Zap size={12} className="fill-primary" />
                                Solutions Express
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Questions Fréquentes</h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <details key={i} className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-all hover:border-primary/20">
                                    <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer select-none">
                                        <h4 className="font-black text-gray-800 dark:text-gray-100">{faq.q}</h4>
                                        <div className="p-1 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-400 group-open:rotate-180 transition-transform">
                                            <ChevronRight size={18} />
                                        </div>
                                    </summary>
                                    <div className="px-6 pb-6 pt-2">
                                        <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </div>
                                </details>
                            ))}
                        </div>

                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-slate-900 dark:to-slate-800 rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-4">Besoin d'une démonstration ?</h3>
                                <p className="text-gray-400 font-medium mb-8 max-w-md">
                                    Besoin de voir un appareil en vidéo avant l'achat ? Nos experts peuvent vous envoyer une vidéo personnalisée du produit via WhatsApp.
                                </p>
                                <button className="flex items-center gap-3 bg-green-500 hover:bg-green-600 transition-all text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest active:scale-95 shadow-lg shadow-green-500/20">
                                    Contact WhatsApp
                                    <ExternalLink size={18} />
                                </button>
                            </div>
                            <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-10 hidden md:block">
                                <MessageSquare size={200} />
                            </div>
                        </div>
                    </div>

                    {/* 4. Instant Ticket Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-[40px] p-8 shadow-2xl border border-gray-100 dark:border-white/5 sticky top-24">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Ticket de Support</h3>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-8 border-b border-gray-50 dark:border-white/5 pb-4">Ouverture d'incident</p>

                            <form onSubmit={handleSubmitTicket} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-gray-400 uppercase ml-1">Sujet de la demande</label>
                                    <select className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 rounded-2xl p-4 font-bold text-gray-900 dark:text-white outline-none appearance-none cursor-pointer">
                                        <option className="bg-black text-white">Problème de commande</option>
                                        <option className="bg-black text-white">Question Technique</option>
                                        <option className="bg-black text-white">Garantie / SAV</option>
                                        <option className="bg-black text-white">Facturation</option>
                                        <option className="bg-black text-white">Autre</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-gray-400 uppercase ml-1">Message détaillé</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Décrivez votre problème ici..."
                                        className="w-full bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-primary/20 rounded-2xl p-4 font-bold text-gray-900 dark:text-white outline-none resize-none"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
                                    Créer le ticket
                                </button>
                            </form>

                            <div className="mt-12 space-y-6 border-t border-gray-50 dark:border-white/5 pt-8">
                                <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">Contact Direct</h4>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 transition-colors group-hover:text-primary">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase leading-none">Appelez-nous</p>
                                        <p className="text-sm font-black text-gray-700 dark:text-gray-200 mt-1 uppercase tracking-tighter cursor-pointer hover:text-primary">+212 704685662</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 transition-colors group-hover:text-primary">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase leading-none">Email Support</p>
                                        <p className="text-sm font-black text-gray-700 dark:text-gray-200 mt-1 cursor-pointer hover:text-primary">chzakaria037@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Support;
