import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl } from '../../services/image';

const InteractiveHero = ({ products }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [shuffledProducts, setShuffledProducts] = useState([]);
    const { t } = useLanguage();

    // Filter for PROMO 2026 products and shuffle
    useEffect(() => {
        if (products && products.length > 0) {
            // Only show products with a promo value (Promo 2026)
            const promoProducts = products.filter(p => Number(p.promo) > 0);
            const shuffled = [...promoProducts].sort(() => Math.random() - 0.5);
            setShuffledProducts(shuffled);
        }
    }, [products]);

    const nextProduct = useCallback(() => {
        if (shuffledProducts.length <= 1) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % shuffledProducts.length);
            setIsTransitioning(false);
        }, 400);
    }, [shuffledProducts.length]);

    useEffect(() => {
        if (shuffledProducts.length > 1) {
            const interval = setInterval(nextProduct, 4500);
            return () => clearInterval(interval);
        }
    }, [nextProduct, shuffledProducts.length]);

    if (!shuffledProducts || shuffledProducts.length === 0) return null;

    const currentProduct = shuffledProducts[currentIndex];
    const discount = currentProduct.promo ? `-${currentProduct.promo}%` : null;

    return (
        <div id="hero" className="relative min-h-[700px] lg:h-[85vh] flex items-center overflow-hidden bg-gray-900 border-b border-white/5">
            <style>
                {`
                    @keyframes float-premium {
                        0% { transform: translate(0px, 0px); }
                        25% { transform: translate(15px, -15px); }
                        50% { transform: translate(-10px, 20px); }
                        75% { transform: translate(10px, 10px); }
                        100% { transform: translate(0px, 0px); }
                    }
                    .animate-float-premium {
                        animation: float-premium 10s ease-in-out infinite;
                    }
                `}
            </style>

            {/* Background Gradients */}
            <div className="absolute inset-0 bg-premium-gradient opacity-20"></div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFCB50]/5 rounded-full blur-[120px] -mr-96 -mt-96"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#544F7D]/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-20 lg:pt-0">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* LEFT: Product Info (40%) */}
                    <div className={`lg:col-span-4 space-y-6 transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0'} mx-auto text-center lg:text-left max-w-md lg:max-w-none`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 border border-red-500/30 backdrop-blur-xl text-red-500 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-600/10">
                            <Sparkles size={14} className="animate-pulse fill-red-500" />
                            ÉVÉNEMENT PROMO 2026
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-2xl lg:text-4xl font-black leading-[1.1] tracking-tighter uppercase transition-all bg-premium-gradient bg-clip-text text-transparent italic">
                                {currentProduct.name}
                            </h2>
                            <p className="text-sm lg:text-base text-gray-400 font-medium max-w-sm leading-relaxed line-clamp-2">
                                {currentProduct.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-4 justify-center lg:justify-start">
                            <span className="text-4xl lg:text-5xl font-black text-white">{currentProduct.price} <small className="text-lg">DH</small></span>
                            {discount && (
                                <div className="bg-red-600 text-white px-3 py-1 rounded-xl font-black text-lg animate-bounce">
                                    {discount}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                            <Link
                                to={`/product/${currentProduct.id}`}
                                className="inline-flex items-center gap-3 px-10 py-5 bg-premium-gradient text-white rounded-2xl font-black transition-all shadow-2xl shadow-primary/40 group hover:scale-105 active:scale-95 uppercase tracking-widest text-xs"
                            >
                                Profiter de l'offre
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT: Product Visual (60%) */}
                    <div className="lg:col-span-8 relative flex justify-center items-center">
                        {/* Decorative Rings */}
                        <div className="absolute w-[300px] h-[300px] lg:w-[550px] lg:h-[550px] border-2 border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
                        <div className="absolute w-[250px] h-[250px] lg:w-[450px] lg:h-[450px] border border-secondary/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                        {/* Glow Effect */}
                        <div className="hero-glow-effect"></div>

                        <div className={`relative z-10 transition-all duration-300 w-full flex justify-center items-center ${isTransitioning ? 'animate-hero-exit' : 'animate-hero-enter'}`}>
                            <div className="hero-product-container">
                                <img
                                    src={getImageUrl(currentProduct.image)}
                                    alt={currentProduct.name}
                                    className="drop-shadow-[0_45px_45px_rgba(0,0,0,0.6)] animate-float-premium pointer-events-auto select-none"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=800";
                                    }}
                                />
                            </div>

                            {/* Floating Promo Badge */}
                            <div className="absolute top-0 right-0 p-6 bg-red-600/90 backdrop-blur-2xl rounded-3xl border border-white/20 hidden lg:block shadow-2xl">
                                <p className="text-[10px] font-black text-white/70 uppercase mb-1 tracking-widest font-serif italic text-right">Offre Spéciale</p>
                                <p className="text-3xl font-black text-white">2026</p>
                            </div>
                        </div>

                        {/* Slide Indicators */}
                        {shuffledProducts.length > 1 && (
                            <div className="absolute -bottom-16 flex gap-2">
                                {shuffledProducts.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`h-2 rounded-full transition-all duration-500 ${currentIndex === idx ? 'w-16 bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]' : 'w-4 bg-white/10 hover:bg-white/30'}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InteractiveHero;
