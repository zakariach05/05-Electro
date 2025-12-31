import React, { useEffect, useState } from 'react';
import brandsData from '../../data/brands.json';
import axios from 'axios';
import { API_URL } from '../../services/api';
import { getImageUrl } from '../../services/image';

const BrandsMarquee = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await axios.get(`${API_URL}/brands`);
                const fetchedBrands = (res.data.data || res.data).map(b => ({
                    name: b.name,
                    logo: getImageUrl(b.logo || b.image)
                }));
                if (fetchedBrands.length > 0) {
                    setBrands(fetchedBrands);
                } else {
                    setBrands(brandsData.map(b => ({
                        ...b,
                        logo: getImageUrl(b.logo)
                    })));
                }
            } catch (error) {
                console.error("Failed to fetch brands, utilizing fallback.", error);
                setBrands(brandsData.map(b => ({
                    ...b,
                    logo: getImageUrl(b.logo)
                })));
            }
        };

        fetchBrands();
    }, []);

    if (brands.length === 0) return null;

    // Triple the brands to ensure the marquee is always full and loops perfectly
    const marqueeBrands = [...brands, ...brands, ...brands];

    return (
        <section className="py-20 bg-white dark:bg-gray-950 overflow-hidden border-y border-gray-100 dark:border-white/5">
            <style>
                {`
                    @keyframes marquee-infinite {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-33.333%); }
                    }
                    .animate-marquee-infinite {
                        animation: marquee-infinite 30s linear infinite;
                    }
                    .pause-marquee:hover .animate-marquee-infinite {
                        animation-play-state: paused;
                    }
                `}
            </style>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="flex flex-col items-center gap-3">
                    <span className="text-primary font-black tracking-[0.2em] uppercase text-[10px]">Partenaires de Confiance</span>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">
                        Nos Partenaires <span className="text-primary">Officiels</span>
                    </h2>
                    <div className="w-16 h-1 bg-primary rounded-full"></div>
                </div>
            </div>

            <div className="relative w-full overflow-hidden pause-marquee">
                {/* Gradient Fades for edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10"></div>

                <div className="flex animate-marquee-infinite w-max">
                    {marqueeBrands.map((brand, index) => (
                        <div
                            key={`${brand.name}-${index}`}
                            className="flex-shrink-0 w-48 h-24 flex items-center justify-center px-8 transition-all duration-500 hover:scale-125 group pointer-events-auto"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="max-w-full max-h-full object-contain filter drop-shadow-sm transition-all"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandsMarquee;
