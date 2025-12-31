import React, { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/molecules/ProductCard';
import FilterSidebar from '../components/organisms/FilterSidebar';
import axios from 'axios';
import { API_URL } from '../services/api';
import { useParams, useSearchParams } from 'react-router-dom';
import Loader from '../components/atoms/Loader';
import SEO from '../components/atoms/SEO';

const Shop = () => {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ current: 1, total: 1 });
    const [isServerPaginated, setIsServerPaginated] = useState(true);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        maxPrice: 30000,
        brands: [],
        states: []
    });

    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 12;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // If server is not paginating and we already have allProducts, just slice locally
                if (!isServerPaginated && allProducts.length > 0) {
                    const start = (currentPage - 1) * PAGE_SIZE;
                    const slice = allProducts.slice(start, start + PAGE_SIZE);
                    setProducts(prev => currentPage === 1 ? slice : [...prev, ...slice]);
                    setPagination({ current: currentPage, total: Math.ceil(allProducts.length / PAGE_SIZE) });
                    setLoading(false);
                    return;
                }

                const params = {
                    max_price: filters.maxPrice,
                    page: currentPage,
                    per_page: PAGE_SIZE
                };
                if (category && category !== 'all') params.category = category;
                if (searchQuery) params.search = searchQuery;
                if (filters.brands && filters.brands.length > 0) params.brands = filters.brands.join(',');
                if (filters.states && filters.states.length > 0) params.states = filters.states.map(s => s.toLowerCase()).join(',');
                if (filters.promoOnly) params.promo = 1;
                if (filters.inStock) params.in_stock = 1;

                const response = await axios.get(`${API_URL}/products`, { params });

                // Laravel pagination returns data in .data and meta info in root/other fields
                const responseData = response.data;
                // If response contains server pagination metadata, use it
                if (responseData && responseData.data && responseData.current_page !== undefined) {
                    const pageData = responseData.data;
                    setPagination({
                        current: responseData.current_page,
                        total: responseData.last_page || 1
                    });
                    setIsServerPaginated(true);
                    setProducts(prev => currentPage === 1 ? pageData : [...prev, ...pageData]);
                } else {
                    // Backend returned full array (or different shape) -> client-side paginate
                    let all = Array.isArray(responseData) ? responseData : (responseData.data || []);

                    // Client-side filtering for Category if sidebar filter is used (keeping this as backup, but ideally backend handles it)
                    if (filters.categories && filters.categories.length > 0) {
                        all = all.filter(p => {
                            if (!p.category) return false;
                            const catName = p.category.name || '';
                            return filters.categories.some(f => catName.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(catName.toLowerCase()));
                        });
                    }

                    if (isServerPaginated) {
                        // Do nothing, products are already set
                    } else {
                        setAllProducts(all);
                        const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
                        setPagination({ current: currentPage, total: totalPages });

                        const start = (currentPage - 1) * PAGE_SIZE;
                        const slice = all.slice(start, start + PAGE_SIZE);
                        // Append if not page 1
                        setProducts(prev => currentPage === 1 ? slice : [...prev, ...slice]);
                    }
                }

                if (currentPage === 1) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category, filters, searchQuery, currentPage]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [category, filters, searchQuery]);

    const pageTitle = category ? (category === 'all' ? 'Toute la Boutique' : category.charAt(0).toUpperCase() + category.slice(1)) : 'Boutique';

    // Calculate showing count
    const showingCount = Math.min(pagination.current * PAGE_SIZE, products.length + (pagination.current - 1) * PAGE_SIZE); // Approximation if server paginated
    // Better approximation for client side:
    const clientShowingCount = products.length;

    return (
        <MainLayout>
            <SEO title={pageTitle} description={`Découvrez notre sélection de produits dans la catégorie ${pageTitle}. Qualité garantie et meilleurs prix au Maroc.`} />
            <div className="bg-gray-50 min-h-screen pt-6 pb-20">

                <div className="bg-white border-b border-gray-200 py-8 mb-8">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 capitalize">
                            {category === 'all' || !category ? 'Boutique' : category.replace('-', ' ')}
                        </h1>
                        <p className="text-gray-500 mt-2">Découvrez nos meilleurs produits électroniques.</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:hidden mb-6">
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-gray-700 font-medium"
                        >
                            <SlidersHorizontal size={18} />
                            Filtres
                        </button>
                    </div>

                    <div className="flex gap-8">
                        <div className="hidden lg:block w-1/4 flex-shrink-0 sticky top-24 h-[calc(100vh-8rem)]">
                            <FilterSidebar
                                filters={filters}
                                setFilters={setFilters}
                            />
                        </div>

                        {isMobileFilterOpen && (
                            <div className="fixed inset-0 z-50 lg:hidden flex">
                                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
                                <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl animate-slide-in-right">
                                    <FilterSidebar
                                        filters={filters}
                                        setFilters={setFilters}
                                        closeMobileFilters={() => setIsMobileFilterOpen(false)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex-1">
                            {loading && currentPage === 1 ? (
                                <div className="flex justify-center py-20">
                                    <Loader />
                                </div>
                            ) : products.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {products.map(product => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>

                                    {/* Load More (append) pagination */}
                                    {pagination.total > currentPage && (
                                        <div className="mt-12 flex flex-col items-center gap-4">
                                            <p className="text-sm text-gray-500">
                                                Affichage de {products.length} sur {isServerPaginated ? '...' : allProducts.length} produits
                                            </p>
                                            <button
                                                disabled={loading}
                                                onClick={() => setCurrentPage(prev => prev + 1)}
                                                className="px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-full font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm flex items-center gap-2"
                                            >
                                                {loading ? 'Chargement...' : 'Afficher les 12 produits suivants'}
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                                    <p className="text-gray-500 text-lg">Aucun produit ne correspond à vos critères.</p>
                                    <button
                                        onClick={() => setFilters({ maxPrice: 30000, brands: [], states: [] })}
                                        className="mt-4 text-primary font-bold hover:underline"
                                    >
                                        Réinitialiser les filtres
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Shop;
