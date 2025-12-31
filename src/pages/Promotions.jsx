import React, { useState, useEffect } from 'react';
import { Tag, Zap, Clock, ChevronRight, Filter, ShoppingCart, Percent, Lock, ShieldCheck } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/molecules/ProductCard';
import axios from 'axios';
import { API_URL } from '../services/api';
import Loader from '../components/atoms/Loader';
import SEO from '../components/atoms/SEO';

import toast from 'react-hot-toast';

const Promotions = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [inputCode, setInputCode] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        const fetchDeals = async () => {
            setLoading(true);
            try {
                // Fetch products with promo=1
                const response = await axios.get(`${API_URL}/products`, {
                    params: { promo: 1 }
                });

                // If nested in .data
                const data = response.data.data || response.data;
                // Show all promo products
                setProducts(data);
            } catch (error) {
                console.error("Error fetching promotions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    const handleApplyCode = (e) => {
        e.preventDefault();
        if (inputCode.toUpperCase() === 'WINS05') {
            setIsUnlocked(true);
            toast.success('Félicitations ! Vous avez débloqué les 15+ Offres VIP de 2026.', {
                icon: '�',
                duration: 5000,
                style: { background: '#1e293b', color: '#fff', border: '1px solid #3b82f6' }
            });
        } else {
            toast.error('Code non valide pour débloquer les offres.');
        }
    };

    // Get unique main categories from promo products for filtering
    const promoCategories = React.useMemo(() => {
        const categoriesMap = new Map();
        products.forEach(p => {
            const cat = p.category;
            if (!cat) return;
            // Use parent category if it exists, otherwise use category itself
            const mainCat = cat.parent || cat;
            if (!categoriesMap.has(mainCat.id)) {
                categoriesMap.set(mainCat.id, { id: mainCat.id, name: mainCat.name });
            }
        });
        return Array.from(categoriesMap.values());
    }, [products]);

    // INITIAL DISPLAY: Show only 1 from each major type (the 'featured' ones)
    // After code: Show all promo items
    const filteredProducts = React.useMemo(() => {
        let base = isUnlocked ? products.filter(p => Number(p.promo) > 0) : products.filter(p => p.is_featured && Number(p.promo) > 0);

        if (activeFilter !== 'all') {
            base = base.filter(p => p.category?.id === activeFilter || p.category?.parent_id === activeFilter);
        }

        // Shuffle for variety
        return [...base].sort(() => Math.random() - 0.5);
    }, [products, isUnlocked, activeFilter]);

    return (
        <MainLayout>
            <SEO
                title="Offres & Promotions 2026"
                description="Profitez de la PROMO 2026 chez Electro-05. Plus de 15 produits à prix sacrifiés et zone de saisie pour votre code promo."
            />

            <div className="min-h-screen bg-white dark:bg-slate-900 pb-20">
                {/* 1. Hero Promo Banner */}
                <div className="relative h-[500px] md:h-[650px] overflow-hidden bg-black flex items-center">
                    <div className="absolute inset-0 bg-[#0a0a0f]">
                        <div className="absolute inset-0 opacity-30">
                            <img
                                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop"
                                alt="Tech Background"
                                className="w-full h-full object-cover mix-blend-overlay"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-black"></div>
                        {/* Animated Particles Effect Simulation */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full blur-md animate-pulse"></div>
                            <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-secondary rounded-full blur-lg animate-bounce-slow"></div>
                        </div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
                        <div className="max-w-2xl bg-white/5 backdrop-blur-md p-8 rounded-[40px] border border-white/10 shadow-2xl animate-fade-slide-up">
                            <div className="inline-flex items-center gap-2 bg-red-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg shadow-red-600/20">
                                <Zap size={14} className="fill-white text-white" />
                                <span className="text-white">PROMO 2026 - EVENT</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6">
                                Équipez-vous <br />
                                pour <span className="text-primary tracking-tighter">2026</span>.
                            </h1>
                            <p className="text-gray-300 text-lg mb-8 max-w-md font-medium leading-relaxed">
                                Découvrez nos <span className="text-white font-bold underline decoration-primary underline-offset-4">offres pépites de 2026</span> et débloquez des remises immédiates en saisissant votre code avantage.
                            </p>

                            {/* INTERACTIVE PROMO CODE ZONE */}
                            <form onSubmit={handleApplyCode} className="bg-black/40 border border-white/10 p-2 rounded-3xl flex items-center gap-2 mb-8 group focus-within:border-primary transition-all shadow-2xl">
                                <input
                                    type="text"
                                    placeholder="VOTRE CODE PROMO..."
                                    className="bg-transparent border-none outline-none flex-1 px-6 py-4 text-white font-black placeholder:text-gray-600 uppercase tracking-[0.3em] text-sm"
                                    value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className={`px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 whitespace-nowrap ${isUnlocked ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-white hover:text-primary'}`}
                                >
                                    {isUnlocked ? 'DÉBLOQUÉ' : 'ACTIVER'}
                                </button>
                            </form>

                            {isUnlocked && (
                                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-green-500/30 animate-bounce-slow mb-8">
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                                        <ShieldCheck className="text-white" size={20} />
                                    </div>
                                    <p className="text-sm font-black text-white uppercase tracking-wider">
                                        Accès Premium Actif : <span className="text-green-400">Toute la boutique est à prix sacrifiés !</span>
                                    </p>
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                                    <span className="text-white">+2.4k clients</span> règlent leurs paniers en ce moment.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
                    <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden lg:block">
                        <div className="w-80 h-80 relative animate-float">
                            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20"></div>
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-full flex flex-col items-center justify-center text-center shadow-2xl">
                                <Percent size={64} className="text-primary mb-4" />
                                <span className="text-3xl font-black text-white">VITESSE</span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Économies Maximisées</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Controls & Categories */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-white/5 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2 overflow-x-auto scroller-hide w-full md:w-auto">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${activeFilter === 'all' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                            >
                                Tous les Bons Plans
                            </button>
                            {promoCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveFilter(cat.id)}
                                    className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${activeFilter === cat.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="h-10 w-px bg-gray-100 dark:bg-white/10 hidden md:block"></div>
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                                {filteredProducts.length} Produits trouvés
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. Products Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-20">
                    {!isUnlocked && products.length > 8 && (
                        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-3xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 animate-pulse">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                                    <Lock size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-gray-900 dark:text-white leading-tight">Accès Restreint</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Entrez le code promo pour voir la totalité des 15+ offres exclusives.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                            >
                                Saisir mon code
                            </button>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 space-y-6">
                            <Loader />
                            <p className="text-gray-500 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Extraction des meilleures offres...</p>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map((product, idx) => (
                                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32">
                            <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Tag size={32} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pas d'offres en cours</h3>
                            <p className="text-gray-500 dark:text-gray-400">Revenez bientôt pour découvrir nos prochaines réductions.</p>
                        </div>
                    )}
                </div>

                {/* 4. Newsletter Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-primary rounded-[40px] p-8 md:p-16 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>

                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                                    Soyez alerté avant tout le monde !
                                </h2>
                                <p className="text-white/80 text-lg font-medium">
                                    Inscrivez-vous à notre newsletter VIP pour recevoir les codes promos exclusifs et les annonces de ventes flash avant leur publication.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="votre@email.com"
                                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-5 px-6 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-white/30 transition-all flex-1 text-lg font-bold"
                                />
                                <button className="bg-white text-primary px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all shadow-xl active:scale-95">
                                    Rejoindre VIP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Promotions;
