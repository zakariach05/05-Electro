import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../services/api';
import SEO from '../components/atoms/SEO';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'react-hot-toast';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name || formData.name.length < 3) newErrors.name = "Le nom doit contenir au moins 3 caractères.";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalide.";
        if (!formData.subject || formData.subject.length < 3) newErrors.subject = "Le sujet doit contenir au moins 3 caractères.";
        if (!formData.message || formData.message.length < 10) newErrors.message = "Le message doit contenir au moins 10 caractères.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const loadingToast = toast.loading('Envoi de votre message...');

        try {
            const response = await axios.post(`${API_URL}/contact`, formData);
            if (response.data.success) {
                toast.success('Message envoyé ! Nous vous répondrons bientôt.', { id: loadingToast });
                setFormData({ name: '', email: '', subject: '', message: '' });
                setErrors({});
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Erreur lors de l'envoi du message.";
            toast.error(errorMsg, { id: loadingToast });
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <SEO title={t('contact.title')} description="Contactez l'équipe Electro-05 pour toute question ou demande de support." />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                {/* Hero Section with Glassmorphism */}
                <div className="relative pt-24 pb-16 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                        <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
                        <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-4">
                            Centre d'assistance
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            {t('contact.subtitle')}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                            {t('contact.desc')}
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">

                        {/* Left Side: Contact Info & Benefits */}
                        <div className="lg:col-span-4 space-y-6 animate-fade-slide-up">
                            <ContactInfoCard
                                icon={<Phone className="text-primary" />}
                                title="Téléphone"
                                content="+212 704685662"
                                subContent="Lun-Sam, 9h-20h"
                            />
                            <ContactInfoCard
                                icon={<Mail className="text-primary" />}
                                title="Email Direct"
                                content="chzakaria037@gmail.com"
                                subContent="Réponse sous 12 heures"
                            />
                            <ContactInfoCard
                                icon={<MapPin className="text-primary" />}
                                title="Siège Social"
                                content="Casablanca, Maroc"
                                subContent="Showroom ouvert aux clients"
                            />

                            <div className="bg-slate-900 dark:bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                                    <ShieldCheck size={120} />
                                </div>
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <ShieldCheck className="text-primary" />
                                    Données sécurisées
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Vos informations sont protégées par un cryptage de bout en bout et ne sont jamais partagées.
                                </p>
                                <div className="space-y-3">
                                    {['Expertise Certifiée', 'Support Ultra-Rapide', 'Satisfaction Garantie'].map(item => (
                                        <div key={item} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300">
                                            <CheckCircle2 size={16} className="text-primary" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Enhanced Contact Form */}
                        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[40px] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-white/5 relative group animate-fade-slide-up animation-delay-200">

                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                                        <MessageSquare size={28} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Formulaire Direct</h2>
                                        <p className="text-slate-400 text-sm font-medium">Remplissez les champs ci-dessous</p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-full border border-slate-100 dark:border-white/5">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Support en ligne</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                            {t('contact.form.name')}
                                            {errors.name && <AlertCircle size={14} className="text-rose-500" />}
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder={t('contact.form.placeholder_name')}
                                            className={`w-full bg-slate-50 dark:bg-white/5 border-2 ${errors.name ? 'border-rose-500' : 'border-transparent focus:border-primary'} dark:text-white rounded-2xl p-4 md:p-5 outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600`}
                                        />
                                        {errors.name && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-1">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                            {t('contact.form.email')}
                                            {errors.email && <AlertCircle size={14} className="text-rose-500" />}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="votre@email.com"
                                            className={`w-full bg-slate-50 dark:bg-white/5 border-2 ${errors.email ? 'border-rose-500' : 'border-transparent focus:border-primary'} dark:text-white rounded-2xl p-4 md:p-5 outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600`}
                                        />
                                        {errors.email && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                        {t('contact.form.subject')}
                                        {errors.subject && <AlertCircle size={14} className="text-rose-500" />}
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Comment pouvons-nous vous aider ?"
                                        className={`w-full bg-slate-50 dark:bg-white/5 border-2 ${errors.subject ? 'border-rose-500' : 'border-transparent focus:border-primary'} dark:text-white rounded-2xl p-4 md:p-5 outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600`}
                                    />
                                    {errors.subject && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-1">{errors.subject}</p>}
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                        {t('contact.form.message')}
                                        {errors.message && <AlertCircle size={14} className="text-rose-500" />}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="6"
                                        placeholder={t('contact.form.placeholder_message')}
                                        className={`w-full bg-slate-50 dark:bg-white/5 border-2 ${errors.message ? 'border-rose-500' : 'border-transparent focus:border-primary'} dark:text-white rounded-3xl p-4 md:p-6 outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 resize-none`}
                                    ></textarea>
                                    {errors.message && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest ml-1">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full h-[70px] bg-slate-900 dark:bg-primary text-white rounded-2xl font-black text-lg overflow-hidden transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-xl shadow-primary/20"
                                >
                                    <div className={`absolute inset-0 bg-primary dark:bg-slate-800 transition-transform duration-500 translate-y-full group-hover:translate-y-0 ${loading ? 'translate-y-0' : ''}`}></div>
                                    <div className="relative z-10 flex items-center justify-center gap-3">
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>Traitement...</span>
                                            </>
                                        ) : (
                                            <>
                                                {t('contact.form.submit')}
                                                <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </div>
                                </button>

                                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
                                    Votre vie privée est notre priorité absolue.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

const ContactInfoCard = ({ icon, title, content, subContent }) => (
    <div className="bg-white dark:bg-slate-900/50 p-6 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-sm flex items-start gap-4 transition-all hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 group">
        <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-500 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
            {icon}
        </div>
        <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</h4>
            <p className="text-lg font-black text-slate-900 dark:text-white mb-1">{content}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 pt-1 border-t border-slate-50 dark:border-white/5 mt-2">
                <Clock size={12} className="text-primary" /> {subContent}
            </p>
        </div>
    </div>
);

export default Contact;
