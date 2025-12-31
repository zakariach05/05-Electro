import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/molecules/ProductCard';
import { ArrowRight, MapPin, Smartphone, Laptop, Gamepad2, Headphones, Tv, Coffee, Home as HomeIcon, Wifi } from 'lucide-react';
import BrandsMarquee from '../components/molecules/BrandsMarquee';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import Loader from '../components/atoms/Loader';
import SEO from '../components/atoms/SEO';
import DealOfTheDay from '../components/molecules/DealOfTheDay';
import InteractiveHero from '../components/organisms/InteractiveHero';
import InteractiveMap from '../components/organisms/InteractiveMap';

const UNIVERS_CATEGORIES = [
    {
        name: 'Smartphones',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800',
        icon: Smartphone,
        path: '/shop/smartphones',
        count: '120+ Produits'
    },
    {
        name: 'PC & Mac',
        image: 'https://images.unsplash.com/photo-1517336714467-d23784a1a821?q=80&w=800',
        icon: Laptop,
        path: '/shop/pc-mac',
        count: '85+ Produits'
    },
    {
        name: 'Gaming',
        image: 'https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?q=80&w=800',
        icon: Gamepad2,
        path: '/shop/gaming',
        count: '50+ Produits'
    },
    {
        name: 'Audio Hi-Fi',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800',
        icon: Headphones,
        path: '/shop/accessories',
        count: '200+ Produits'
    },
    {
        name: 'Électroménager',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800',
        icon: Coffee,
        path: '/shop/appliances',
        count: '150+ Produits'
    },
    {
        name: 'Smart Home',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800',
        icon: HomeIcon,
        path: '/shop/smart-home',
        count: '40+ Produits'
    },
    {
        name: 'TV & Vidéo',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800',
        icon: Tv,
        path: '/shop/tv',
        count: '60+ Produits'
    },
    {
        name: 'Réseaux',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800',
        icon: Wifi,
        path: '/shop/networks',
        count: '30+ Produits'
    }
];

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [productsRes, locationsRes] = await Promise.all([
                    axios.get(`${API_URL}/products`),
                    axios.get(`${API_URL}/locations`)
                ]);

                const products = productsRes.data.data || productsRes.data;
                setAllProducts(products);

                // Shuffle and pick 6 for featured
                const shuffled = [...products].sort(() => Math.random() - 0.5);
                setFeaturedProducts(shuffled.slice(0, 6));

                setLocations(locationsRes.data);
            } catch (error) {
                console.error("Error fetching home data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHomeData();
    }, []);

    return (
        <MainLayout>
            <SEO
                title={t('nav.home')}
                description="Découvrez Electro-05, votre boutique high-tech de confiance au Maroc. Smartphones, PC, Gaming et produits reconditionnés au meilleur prix."
            />

            {!loading && <InteractiveHero products={allProducts} />}

            <section id="categories" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-primary font-black tracking-[0.2em] uppercase text-xs">Notre Réseau National</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">
                            Nos <span className="text-primary">Univers</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-premium-gradient mx-auto rounded-full"></div>
                        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-medium">
                            Découvrez nos univers technologiques avec une sélection rigoureuse des meilleurs équipements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {UNIVERS_CATEGORIES.map((cat, idx) => (
                            <Link
                                key={idx}
                                to={cat.path}
                                className="group relative h-[380px] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-3"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${cat.image}')` }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity group-hover:opacity-75"></div>
                                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start z-20">
                                    <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:scale-110 group-hover:rotate-6">
                                        <cat.icon size={28} className="text-white" />
                                    </div>
                                    <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-1">{cat.count}</p>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-2 group-hover:text-primary transition-colors">
                                        {cat.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                                        Explorer <ArrowRight size={14} />
                                    </div>
                                </div>
                                <div className="absolute top-6 right-6 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] font-black text-white/90 uppercase tracking-widest z-20">
                                    Premium
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            to="/shop/all"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-3xl font-black uppercase tracking-widest text-[10px] transition-all hover:bg-primary hover:text-white shadow-xl active:scale-95"
                        >
                            Voir tous les rayons <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            <DealOfTheDay />

            <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-secondary font-bold tracking-widest uppercase text-sm">{t('home.featured.label')}</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tighter">{t('home.featured.title')}</h2>
                        <div className="w-20 h-1.5 bg-premium-gradient mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-12">
                        {loading ? (
                            <div className="col-span-full flex justify-center py-20">
                                <Loader />
                            </div>
                        ) : (
                            featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            to="/shop/all"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-gray-800 text-white rounded-full font-bold hover:bg-premium-gradient transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            {t('home.featured.view_all')} <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            <BrandsMarquee />

            <section className="py-24 bg-gray-900 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full -mr-64 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -ml-64 -mb-32"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-secondary font-black tracking-[0.2em] uppercase text-xs">Notre Réseau National</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase">
                            Plus proche de <span className="text-transparent bg-clip-text bg-premium-gradient">vous partout</span> au Maroc
                        </h2>
                        <div className="w-20 h-1.5 bg-premium-gradient mx-auto rounded-full"></div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-5 text-white space-y-8">
                            <div className="space-y-6">
                                <div
                                    onClick={() => setSelectedCity('Casablanca')}
                                    className={`flex items-start gap-4 p-6 border rounded-[32px] backdrop-blur-md transition-all cursor-pointer ${selectedCity === 'Casablanca' ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                >
                                    <div className="w-12 h-12 bg-premium-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                                        <MapPin className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-1">Nos Boutiques Officielles</h4>
                                        <p className="text-gray-400 font-medium">3 Branches à Casablanca : Anfa, Maârif, Ain Diab.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-md hover:bg-white/10 transition-colors">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                        <ArrowRight className="text-secondary" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-1">Points Relais Maroc</h4>
                                        <p className="text-gray-400 font-medium">Rabat, Marrakech et 30+ points de retrait.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex justify-center lg:justify-start">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-secondary transition-all shadow-xl group mx-auto"
                                >
                                    Contactez-nous <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <InteractiveMap
                                locations={locations}
                                selectedCity={selectedCity}
                                onCitySelect={setSelectedCity}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Home;
