import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl } from '../../services/image';

const Footer = () => {
    const { t } = useLanguage();

    const [logoError, setLogoError] = React.useState(false);

    return (
        <footer className="bg-[#111827] text-white pt-20 pb-10 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16 border-b border-gray-800 pb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <Link to="/" className="inline-flex items-center gap-2 group">
                            {!logoError ? (
                                <img
                                    src="/Logo.png"
                                    alt={t('hero.title')}
                                    className="h-8 md:h-10 lg:h-12 w-auto"
                                    onError={() => setLogoError(true)}
                                />
                            ) : (
                                <span className="font-bold text-white text-xl">
                                    5 Electro
                                </span>
                            )}
                        </Link>
                        <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
                            {t('hero.desc')}
                        </p>
                        <div className="flex gap-4 pt-2">
                            {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-premium-gradient hover:text-white transition-all duration-300 hover:-translate-y-1">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 lg:col-start-6 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight">Navigation</h4>
                        <ul className="space-y-3 w-full">
                            {[
                                { name: 'Accueil', path: '/' },
                                { name: 'Boutique', path: '/shop' },
                                { name: 'Nouveautés', path: '/shop' },
                                { name: 'Promotions', path: '/promotions' },
                                { name: 'Contact', path: '/contact' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-gray-400 hover:text-secondary transition-colors text-sm hover:translate-x-1 inline-block">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="lg:col-span-2 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight">Client</h4>
                        <ul className="space-y-3 w-full">
                            {[
                                { name: 'Mon Compte', path: '/' },
                                { name: 'Suivre ma commande', path: '/order-tracking' },
                                { name: 'FAQ', path: '/faq' },
                                { name: 'Politique de retour', path: '/retours' },
                                { name: 'Conditions générales', path: '/conditions' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-gray-400 hover:text-secondary transition-colors text-sm hover:translate-x-1 inline-block">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-3 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight">Contact</h4>
                        <ul className="space-y-4 w-full">
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 text-gray-400 text-sm">
                                <MapPin className="flex-shrink-0 text-primary" size={18} />
                                <span>123 Boulevard Zerktouni, Casablanca</span>
                            </li>
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 text-gray-400 text-sm">
                                <Phone className="flex-shrink-0 text-primary" size={18} />
                                <span>+212 704685662</span>
                            </li>
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 text-gray-400 text-sm">
                                <Mail className="flex-shrink-0 text-primary" size={18} />
                                <span>chzakaria037@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter & Copyright */}
                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                            alt="Visa"
                            className="h-6 md:h-8 w-auto object-contain bg-white rounded-md p-1"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                            alt="Mastercard"
                            className="h-6 md:h-8 w-auto object-contain bg-white rounded-md p-1"
                        />
                        <img
                            src={getImageUrl('cmi.png')}
                            alt="CMI Paiement"
                            className="h-8 md:h-10 w-auto object-contain bg-white rounded-md p-1"
                        />
                    </div>
                    <p className="text-gray-500 text-sm">
                        &copy; 2026 {t('hero.title')}. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
