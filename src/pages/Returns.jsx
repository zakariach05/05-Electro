import React from 'react';
import MainLayout from '../layouts/MainLayout';
import {
    RefreshCcw,
    CheckCircle2,
    XCircle,
    Truck,
    ShieldCheck,
    MessageCircle,
    Clock,
    Box
} from 'lucide-react';
import SEO from '../components/atoms/SEO';

const Returns = () => {
    return (
        <MainLayout>
            <SEO
                title="Politique de Retours | Electro-05"
                description="Consultez nos conditions de retour et d'échange pour vos achats High-Tech chez Electro-05."
            />

            <div className="min-h-screen bg-white dark:bg-gray-950 font-sans">
                {/* Header Section */}
                <div className="bg-gray-50 dark:bg-gray-900/50 py-16 lg:py-24 border-b border-gray-100 dark:border-white/5">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest mb-6">
                            <RefreshCcw size={14} />
                            Confiance & Garantie
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic mb-6">
                            Politique de <span className="text-primary">Retour</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-2xl mx-auto">
                            Chez Electro-05, votre satisfaction est notre priorité. Si un article ne vous convient pas, nous avons simplifié le processus de retour.
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
                    <div className="grid gap-16">

                        {/* 1. Key Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 bg-blue-50 dark:bg-primary/5 rounded-[32px] border border-primary/10">
                                <Clock className="text-primary mb-4" size={32} />
                                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase mb-2">7 Jours</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Délai de rétractation après réception de votre colis.</p>
                            </div>
                            <div className="p-8 bg-green-50 dark:bg-green-500/5 rounded-[32px] border border-green-500/10">
                                <ShieldCheck className="text-green-500 mb-4" size={32} />
                                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase mb-2">Garanti</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Produits 100% officiels avec garantie constructeur.</p>
                            </div>
                            <div className="p-8 bg-amber-50 dark:bg-amber-500/5 rounded-[32px] border border-amber-500/10">
                                <RefreshCcw className="text-amber-500 mb-4" size={32} />
                                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase mb-2">Échange</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Remplacement rapide en cas de défaut technique.</p>
                            </div>
                        </div>

                        {/* 2. Conditions Section */}
                        <section className="space-y-8">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-4">
                                <span className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center text-sm">01</span>
                                Conditions d'acceptation
                            </h2>
                            <div className="bg-gray-50 dark:bg-white/5 rounded-[40px] p-8 lg:p-12 border border-gray-100 dark:border-white/5">
                                <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium leading-relaxed text-lg">
                                    Pour être éligible à un retour, votre article doit remplir les critères suivants :
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        "L'article doit être inutilisé (état neuf).",
                                        "L'emballage d'origine doit être scellé et intact.",
                                        "Tous les accessoires et manuels doivent être présents.",
                                        "La facture originale doit être jointe au retour.",
                                        "Les étiquettes de garantie ne doivent pas être déchirées.",
                                        "Aucune personnalisation logicielle effectuée."
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                                            <span className="text-gray-700 dark:text-gray-300 font-bold text-sm tracking-tight">{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* 3. Exceptions */}
                        <section className="space-y-8">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-4">
                                <span className="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center text-sm">02</span>
                                Produits non retournables
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-red-50 dark:bg-red-500/5 border border-red-500/10 rounded-3xl flex items-center gap-4">
                                    <XCircle className="text-red-500 flex-shrink-0" size={24} />
                                    <span className="text-sm font-bold text-red-900 dark:text-red-400">Logiciels, abonnements et cartes cadeaux activés.</span>
                                </div>
                                <div className="p-6 bg-red-50 dark:bg-red-500/5 border border-red-500/10 rounded-3xl flex items-center gap-4">
                                    <XCircle className="text-red-500 flex-shrink-0" size={24} />
                                    <span className="text-sm font-bold text-red-900 dark:text-red-400">Produits d'hygiène (écouteurs intra-auriculaires ouverts).</span>
                                </div>
                                <div className="p-6 bg-red-50 dark:bg-red-500/5 border border-red-500/10 rounded-3xl flex items-center gap-4">
                                    <XCircle className="text-red-500 flex-shrink-0" size={24} />
                                    <span className="text-sm font-bold text-red-900 dark:text-red-400">Articles ayant subi un dommage physique par l'utilisateur.</span>
                                </div>
                                <div className="p-6 bg-red-50 dark:bg-red-500/5 border border-red-500/10 rounded-3xl flex items-center gap-4">
                                    <XCircle className="text-red-500 flex-shrink-0" size={24} />
                                    <span className="text-sm font-bold text-red-900 dark:text-red-400">Consommables (cartouches d'encre, piles) déballés.</span>
                                </div>
                            </div>
                        </section>

                        {/* 4. Procedure */}
                        <section className="space-y-8">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-4">
                                <span className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center text-sm">03</span>
                                Procédure de retour
                            </h2>
                            <div className="relative space-y-12 pl-8 border-l-2 border-gray-100 dark:border-white/5 py-4">
                                <div className="relative">
                                    <div className="absolute -left-11 w-6 h-6 bg-white dark:bg-gray-950 border-4 border-primary rounded-full"></div>
                                    <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase mb-2">Étape 1 : Contact</h4>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Contactez notre support client via WhatsApp ou Ticket sous 7 jours max.</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-11 w-6 h-6 bg-white dark:bg-gray-950 border-4 border-primary rounded-full"></div>
                                    <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase mb-2">Étape 2 : Préparation</h4>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Remettez le produit dans son carton d'origine avec tous ses accessoires.</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-11 w-6 h-6 bg-white dark:bg-gray-950 border-4 border-primary rounded-full"></div>
                                    <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase mb-2">Étape 3 : Expédition</h4>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Notre transporteur passera récupérer le colis ou vous le déposerez en agence.</p>
                                </div>
                            </div>
                        </section>

                        {/* 5. Refund */}
                        <section className="p-8 lg:p-12 bg-gray-900 rounded-[40px] text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-5">
                                <Box size={200} />
                            </div>
                            <div className="relative z-10 text-center md:text-left max-w-2xl">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Remboursement & Échange</h3>
                                <p className="text-gray-400 font-medium leading-relaxed mb-6">
                                    Après réception et inspection de l'article dans nos entrepôts (sous 48h), nous procéderons au remboursement sur votre compte bancaire ou nous vous enverrons un nouvel article en cas d'échange.
                                </p>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                                    <MessageCircle className="text-primary" size={20} />
                                    <span className="text-xs font-bold text-blue-200">Pour toute question, nos conseillers sont disponibles de 9h à 18h.</span>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Returns;
