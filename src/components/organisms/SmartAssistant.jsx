import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, X, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});

    const questions = [
        {
            id: 'category',
            text: "Quel type de produit cherchez-vous ?",
            options: [
                { label: 'Smartphone', value: 'smartphones', icon: '📱' },
                { label: 'Ordinateur', value: 'pc-mac', icon: '💻' },
                { label: 'Gaming', value: 'gaming', icon: '🎮' },
                { label: 'Audio', value: 'accessoires', icon: '🎧' },
            ]
        },
        {
            id: 'usage',
            text: "Quel est votre usage principal ?",
            options: [
                { label: 'Professionnel / Travail', value: 'pro', icon: '💼' },
                { label: 'Gaming / Performance', value: 'game', icon: '🚀' },
                { label: 'Quotidien / Loisir', value: 'daily', icon: '🏠' },
                { label: 'Photo / Création', value: 'creative', icon: '📸' },
            ]
        },
        {
            id: 'budget',
            text: "Quel est votre budget approximatif ?",
            options: [
                { label: 'Économique', value: 'low', icon: '💰' },
                { label: 'Équilibré', value: 'mid', icon: '⚖️' },
                { label: 'Premium', value: 'high', icon: '💎' },
            ]
        }
    ];

    const handleOptionSelect = (key, value) => {
        setAnswers({ ...answers, [key]: value });
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setStep('result');
        }
    };

    const resetAssistant = () => {
        setStep(0);
        setAnswers({});
    };

    // allow external components to open the assistant via a custom event
    useEffect(() => {
        const handler = () => setIsOpen(true);
        window.addEventListener('openSmartAssistant', handler);
        return () => window.removeEventListener('openSmartAssistant', handler);
    }, []);

    // Simple Recommendation Logic (Mock)
    const getRecommendation = () => {
        // Logic based on answers (can be expanded)
        if (answers.category === 'smartphones') {
            if (answers.budget === 'high') return { name: 'iPhone 15 Pro Max', desc: 'Le summum de la technologie mobile.', link: '/shop/smartphones', img: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=500&auto=format&fit=crop' };
            return { name: 'Samsung Galaxy A54', desc: 'Excellent rapport qualité/prix.', link: '/shop/smartphones', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=500&auto=format&fit=crop' };
        }
        if (answers.category === 'gaming') {
            return { name: 'PlayStation 5 Slim', desc: 'Plongez dans la next-gen.', link: '/shop/gaming', img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=500&auto=format&fit=crop' };
        }
        return { name: 'MacBook Air M2', desc: 'Léger, puissant, parfait pour tout.', link: '/shop/pc-mac', img: 'https://images.unsplash.com/photo-1517336714467-d23784a1a821?q=80&w=500&auto=format&fit=crop' };
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 z-50 bg-gray-900 text-white dark:bg-white dark:text-gray-900 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center group animate-bounce-slow"
            >
                <div className="relative">
                    <Bot size={28} />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                    </span>
                </div>
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold pl-0 group-hover:pl-2">
                    Assistant Perso
                </span>
            </button>
        );
    }



    const recommendation = getRecommendation();

    return (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-up">
                {/* Header */}
                <div className="bg-gray-900 p-6 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Sparkles size={20} className="text-secondary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Assistant 05</h3>
                            <p className="text-xs text-gray-400">Je vous aide à choisir</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {step === 'result' ? (
                        <div className="text-center space-y-4">
                            <p className="text-sm text-gray-500 font-medium">✨ Basé sur vos réponses, nous recommandons :</p>

                            <div className="rounded-2xl border border-gray-100 p-4 bg-gray-50">
                                <img src={recommendation.img} alt={recommendation.name} className="w-32 h-32 object-contain mx-auto mb-4 mix-blend-multiply" />
                                <h4 className="font-bold text-gray-900 text-lg">{recommendation.name}</h4>
                                <p className="text-sm text-gray-500 mt-1">{recommendation.desc}</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Link
                                    to={recommendation.link}
                                    className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Voir le produit <ArrowRight size={18} />
                                </Link>
                                <button onClick={resetAssistant} className="text-sm text-gray-500 hover:text-gray-900">
                                    Recommencer
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Étape {(typeof step === 'number' ? step + 1 : 0)}/{questions.length}</span>
                                <div className="flex gap-1">
                                    {questions.map((_, i) => (
                                        <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${(typeof step === 'number' && i <= step) ? 'w-6 bg-secondary' : 'w-2 bg-gray-200'}`}></div>
                                    ))}
                                </div>
                            </div>

                            <h4 className="text-xl font-bold text-gray-900 leading-tight">
                                {questions[step]?.text || "Chargement..."}
                            </h4>

                            <div className="grid grid-cols-1 gap-3">
                                {questions[step]?.options?.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleOptionSelect(questions[step]?.id, option.value)}
                                        className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-secondary hover:bg-secondary/5 transition-all flex items-center justify-between group"
                                    >
                                        <span className="font-medium text-gray-700 group-hover:text-gray-900 flex items-center gap-3">
                                            <span className="text-xl">{option.icon}</span> {option.label}
                                        </span>
                                        <ChevronRight size={18} className="text-gray-400 group-hover:text-secondary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SmartAssistant;
