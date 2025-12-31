import React from 'react';
import MainLayout from '../layouts/MainLayout';
import {
    Gavel,
    FileText,
    ShieldCheck,
    Globe,
    CreditCard,
    Truck,
    UserCheck,
    AlertCircle
} from 'lucide-react';
import SEO from '../components/atoms/SEO';

const Terms = () => {
    return (
        <MainLayout>
            <SEO
                title="Conditions Générales de Vente | Electro-05"
                description="Lisez nos conditions générales de vente pour comprendre vos droits et responsabilités lors de vos achats sur Electro-05."
            />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans pb-24">
                {/* Header */}
                <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-white/5 py-20">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-8">
                            <Gavel size={40} />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic mb-4">
                            Conditions Générales <span className="text-primary">de Vente</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">
                            Dernière mise à jour : 31 Décembre 2025. Ces conditions régissent l'ensemble des ventes conclues entre Electro-05 et ses clients.
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 mt-16">
                    <div className="space-y-10">

                        {/* Article 1: Objet */}
                        <section className="bg-white dark:bg-gray-900 rounded-[35px] p-8 lg:p-12 shadow-xl shadow-black/5 dark:shadow-none border border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-primary">
                                    <Globe size={24} />
                                </div>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Article 1 : Objet</h2>
                            </div>
                            <div className="prose prose-blue dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                    Les présentes Conditions Générales de Vente (CGV) ont pour objet de définir les droits et obligations des parties dans le cadre de la vente en ligne de produits électroniques et high-tech proposés par Electro-05. Toute commande effectuée sur le site implique l'acceptation sans réserve de ces conditions.
                                </p>
                            </div>
                        </section>

                        {/* Article 2: Les Produits */}
                        <section className="bg-white dark:bg-gray-900 rounded-[35px] p-8 lg:p-12 shadow-xl shadow-black/5 dark:shadow-none border border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-primary">
                                    <FileText size={24} />
                                </div>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Article 2 : Les Produits</h2>
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed space-y-4">
                                <p>Les produits proposés sont ceux qui figurent dans le catalogue publié sur le site Electro-05. Chaque produit est accompagné d'un descriptif établi par le fournisseur.</p>
                                <p>Les photographies du catalogue sont les plus fidèles possibles mais ne peuvent assurer une similitude parfaite avec le produit offert, notamment en ce qui concerne les couleurs ou les nuances d'affichage écran.</p>
                            </div>
                        </section>

                        {/* Article 3: Prix et Paiement */}
                        <section className="bg-white dark:bg-gray-900 rounded-[35px] p-8 lg:p-12 shadow-xl shadow-black/5 dark:shadow-none border border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-primary">
                                    <CreditCard size={24} />
                                </div>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Article 3 : Prix et Règlement</h2>
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed space-y-4">
                                <p>Les prix figurant dans le catalogue sont indiqués en Dirham Marocain (DH) Toutes Taxes Comprises (TTC) au taux de TVA en vigueur au jour de la commande.</p>
                                <div className="p-6 bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-3xl">
                                    <p className="font-black text-amber-900 dark:text-amber-400 uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                                        <AlertCircle size={16} /> Note Spécifique COD
                                    </p>
                                    <p className="text-sm">Pour le paiement à la livraison, un acompte forfaitaire (Acompte Requisitionné) peut être demandé pour valider l'engagement du client. Ce montant est déduit de la facture finale.</p>
                                </div>
                            </div>
                        </section>

                        {/* Article 4: Livraison */}
                        <section className="bg-white dark:bg-gray-900 rounded-[35px] p-8 lg:p-12 shadow-xl shadow-black/5 dark:shadow-none border border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-primary">
                                    <Truck size={24} />
                                </div>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Article 4 : Livraison</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                La livraison est faite à l'adresse indiquée par l'acheteur. Les risques sont à la charge de l'acquéreur à compter du moment où les produits ont quitté les locaux d'Electro-05 ou de ses partenaires vendeurs. Les délais de livraison ne sont donnés qu'à titre indicatif (généralement 2 à 4 jours ouvrables).
                            </p>
                        </section>

                        {/* Article 5: Retours */}
                        <section className="bg-white dark:bg-gray-900 rounded-[35px] p-8 lg:p-12 shadow-xl shadow-black/5 dark:shadow-none border border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-primary">
                                    <ShieldCheck size={24} />
                                </div>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Article 5 : Rétractation</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                Les acheteurs, personnes physiques non professionnelles, bénéficient d'un délai de rétractation de 7 jours à compter de la livraison de leur commande pour faire retour du produit pour échange ou remboursement sans pénalité, à l'exception des frais de retour.
                            </p>
                        </section>

                        {/* Article 6: Données Personnelles */}
                        <section className="bg-white dark:bg-gray-900 rounded-[35px] p-8 lg:p-12 shadow-xl shadow-black/5 dark:shadow-none border border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-primary">
                                    <UserCheck size={24} />
                                </div>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Article 6 : Confidentialité</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                Electro-05 s'engage à protéger les données personnelles de ses clients. Conformément à la loi 09-08, vous disposez d'un droit d'accès, de modification et de suppression des données vous concernant.
                            </p>
                        </section>

                        {/* Article 7: Droit Applicable */}
                        <section className="p-8 lg:p-12 bg-primary rounded-[40px] text-white">
                            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Loi Applicable & Litiges</h2>
                            <p className="text-blue-100 font-medium leading-relaxed mb-6">
                                Les présentes conditions de vente en ligne sont soumises à la loi Marocaine. En cas de litige, compétence est attribuée aux tribunaux de commerce de Casablanca, nonobstant pluralité de défendeurs ou appel en garantie.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Terms;
