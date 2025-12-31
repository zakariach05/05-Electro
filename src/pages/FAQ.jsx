import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import {
    ChevronDown,
    ChevronUp,
    HelpCircle,
    Package,
    Truck,
    CreditCard,
    ShieldCheck,
    RefreshCcw,
    Search,
    MessageCircle
} from 'lucide-react';
import SEO from '../components/atoms/SEO';

const FAQ_DATA = [
    {
        category: "Commandes",
        icon: Package,
        questions: [
            {
                id: "q1",
                question: "Comment passer une commande sur Electro-05 ?",
                answer: "C'est très simple ! Parcourez nos catégories, ajoutez les produits de votre choix au panier, puis cliquez sur 'Finaliser la commande'. Suivez les étapes pour renseigner votre adresse et choisir votre mode de paiement. Vous recevrez un e-mail de confirmation immédiatement après la validation."
            },
            {
                id: "q2",
                question: "Puis-je modifier ou annuler ma commande ?",
                answer: "Tant que votre commande n'est pas passée au statut 'En cours de préparation' (généralement dans les 2 heures), vous pouvez nous contacter via WhatsApp ou par téléphone pour demander une modification ou une annulation."
            }
        ]
    },
    {
        category: "Livraison",
        icon: Truck,
        questions: [
            {
                id: "q3",
                question: "Quels sont les délais de livraison ?",
                answer: "Pour les grandes villes du Maroc (Casablanca, Rabat, Marrakech), le délai est de 24h à 48h. Pour les autres régions, il faut compter entre 2 et 4 jours ouvrables. La livraison express est disponible sur une sélection de produits."
            },
            {
                id: "q4",
                question: "Comment suivre ma commande ?",
                answer: "Une fois votre commande validée, vous recevrez un lien de suivi par e-mail. Vous pouvez également vous rendre sur notre page 'Suivre ma commande' et entrer votre numéro de commande (#ECO-XXXXXX) pour voir l'état d'avancement en temps réel."
            },
            {
                id: "q5",
                question: "Quels sont les frais de livraison ?",
                answer: "Les frais de livraison sont fixes à 100 DH pour toute commande, couvrant l'expédition sécurisée ainsi que l'assurance de transport pour vos articles électroniques de valeur."
            }
        ]
    },
    {
        category: "Paiement",
        icon: CreditCard,
        questions: [
            {
                id: "q6",
                question: "Quels modes de paiement sont acceptés ?",
                answer: "Nous acceptons le paiement par carte bancaire (Visa, Mastercard, CMI) 100% sécurisé via notre plateforme, ainsi que le paiement à la livraison (COD) après versement d'un acompte de 100 DH par Wafacash ou CashPlus pour confirmer votre commande."
            },
            {
                id: "q7",
                question: "Mon paiement est-il sécurisé ?",
                answer: "Absolument. Electro-05 utilise le protocole de cryptage SSL et la norme PCI-DSS pour garantir que toutes vos données bancaires sont cryptées et protégées à 100% lors de la transaction."
            }
        ]
    },
    {
        category: "Garantie & Retours",
        icon: ShieldCheck,
        questions: [
            {
                id: "q8",
                question: "Quelle est la durée de la garantie ?",
                answer: "Tous nos produits neufs bénéficient d'une garantie constructeur officielle de 12 mois minimum. Certains produits haut de gamme bénéficient d'une extension de garantie offerte par Electro-05."
            },
            {
                id: "q9",
                question: "Puis-je retourner un produit ?",
                answer: "Oui, vous disposez d'un délai de 7 jours après réception pour retourner un produit s'il ne vous convient pas, à condition qu'il soit dans son emballage d'origine scellé et non utilisé. En cas de défaut technique, le retour est pris en charge intégralement par nos soins."
            }
        ]
    }
];

const FAQ = () => {
    const [openId, setOpenId] = useState("q1");
    const [searchQuery, setSearchQuery] = useState("");

    const toggleQuestion = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const filteredFaq = FAQ_DATA.map(category => ({
        ...category,
        questions: category.questions.filter(q =>
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    return (
        <MainLayout>
            <SEO
                title="FAQ - Foire Aux Questions | Electro-05"
                description="Trouvez les réponses à vos questions sur les commandes, livraisons, paiements et garanties chez Electro-05."
            />

            <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 font-sans">
                {/* Hero Support Section */}
                <div className="relative bg-primary py-20 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter italic mb-6">
                            Centre d'<span className="text-blue-200">Aide</span>
                        </h1>
                        <p className="text-blue-100 text-lg lg:text-xl font-medium max-w-2xl mx-auto mb-12">
                            Besoin d'aide ? Trouvez rapidement des réponses à vos questions les plus fréquentes.
                        </p>

                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher une question (ex: livraison, garantie...)"
                                className="w-full pl-16 pr-8 py-5 rounded-[25px] bg-white border-none shadow-2xl text-gray-900 font-bold outline-none ring-4 ring-white/10 transition-all focus:ring-white/30"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* FAQ Content */}
                <div className="max-w-4xl mx-auto px-4 -mt-10 pb-24 relative z-20">
                    <div className="space-y-12">
                        {filteredFaq.length > 0 ? (
                            filteredFaq.map((cat, idx) => (
                                <div key={idx} className="space-y-6">
                                    <div className="flex items-center gap-4 px-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 shadow-xl flex items-center justify-center text-primary border border-gray-100 dark:border-white/5">
                                            <cat.icon size={24} />
                                        </div>
                                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{cat.category}</h2>
                                    </div>

                                    <div className="bg-white dark:bg-gray-900 rounded-[35px] shadow-2xl shadow-black/5 dark:shadow-none border border-gray-100 dark:border-white/5 overflow-hidden divide-y divide-gray-50 dark:divide-white/5">
                                        {cat.questions.map((q) => (
                                            <div key={q.id} className="group">
                                                <button
                                                    onClick={() => toggleQuestion(q.id)}
                                                    className="w-full px-8 py-7 flex items-center justify-between text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                                                >
                                                    <span className={`text-lg font-black pr-8 transition-colors ${openId === q.id ? 'text-primary' : 'text-gray-800 dark:text-gray-200'}`}>
                                                        {q.question}
                                                    </span>
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openId === q.id ? 'bg-primary text-white rotate-180' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                                                        <ChevronDown size={18} />
                                                    </div>
                                                </button>

                                                <div className={`overflow-hidden transition-all duration-300 ${openId === q.id ? 'max-h-96' : 'max-h-0'}`}>
                                                    <div className="px-8 pb-8 text-gray-500 dark:text-gray-400 leading-relaxed font-medium text-base">
                                                        {q.answer}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[40px] shadow-xl border border-gray-100 dark:border-white/5">
                                <HelpCircle size={64} className="mx-auto text-gray-200 mb-6" />
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase">Aucun résultat</h3>
                                <p className="text-gray-500 max-w-xs mx-auto mt-2">Nous ne trouvons pas de réponse à "{searchQuery}". Essayez avec d'autres mots-clés.</p>
                            </div>
                        )}
                    </div>

                    {/* Contact CTA */}
                    <div className="mt-20 p-8 lg:p-12 bg-gray-900 dark:bg-primary/10 rounded-[40px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform">
                            <MessageCircle size={150} />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-3">
                                    Vous ne trouvez pas votre <span className="text-primary">réponse</span> ?
                                </h3>
                                <p className="text-gray-400 font-medium max-w-md">
                                    Notre équipe de support est disponible 7j/7 pour vous accompagner par WhatsApp ou par ticket.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <a
                                    href="https://wa.me/212600000000"
                                    className="px-10 py-5 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-green-500/20 active:scale-95"
                                >
                                    WhatsApp Online
                                </a>
                                <button className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl active:scale-95">
                                    Ouvrir un ticket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </MainLayout>
    );
};

export default FAQ;
