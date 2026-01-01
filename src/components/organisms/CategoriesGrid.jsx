import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../services/api';
import { getImageUrl } from '../../services/image';
import { ArrowRight, Smartphone, Laptop, Gamepad2, Headphones, Home, Tv } from 'lucide-react';
import Loader from '../atoms/Loader';

const iconMap = {
    'smartphones': Smartphone,
    'pc-mac': Laptop,
    'gaming': Gamepad2,
    'accessories': Headphones,
    'tv': Tv,
    'tablets': Smartphone,
    'smart-home': Home,
};

const CategoriesGrid = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/categories`);
                // Filtrer uniquement les catégories principales (sans parent)
                const mainCategories = response.data.filter(cat => !cat.parent_id);
                setCategories(mainCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-20">
                        <Loader />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-primary font-black tracking-[0.2em] uppercase text-[10px]">
                        Découvrez nos univers
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mt-3 mb-4 uppercase tracking-tighter italic">
                        Explorez nos <span className="text-primary">Catégories</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => {
                        const Icon = iconMap[category.slug] || Smartphone;
                        const imageUrl = category.image
                            ? getImageUrl(category.image)
                            : `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800`;

                        return (
                            <Link
                                key={category.id}
                                to={`/shop/${category.slug}`}
                                className="group relative h-80 rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={imageUrl}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                                </div>

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-end p-8">
                                    {/* Icon */}
                                    <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                                            <Icon size={32} className="text-primary" />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
                                        {category.name}
                                    </h3>

                                    {/* Description */}
                                    {category.description && (
                                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                            {category.description}
                                        </p>
                                    )}

                                    {/* Subcategories Count */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary font-bold text-sm">
                                            {category.children?.length || 0} sous-catégories
                                        </span>
                                        <div className="flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all duration-300">
                                            <span className="text-sm">Explorer</span>
                                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                                        </div>
                                    </div>

                                    {/* Hover Effect Line */}
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500"></div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-2xl font-black uppercase tracking-wider hover:bg-primary dark:hover:bg-primary hover:text-white transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        Voir tous les produits
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CategoriesGrid;
