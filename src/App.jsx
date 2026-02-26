import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Phone, MessageCircle, Menu, X, ArrowRight, Car, Home, Heart, Briefcase } from 'lucide-react';

function App() {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'fr' ? 'ar' : 'fr';
        i18n.changeLanguage(newLang);
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-silver/50 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-emerald-900 rounded-lg flex items-center justify-center text-white">
                            <Shield size={24} />
                        </div>
                        <span className="text-2xl font-display font-bold text-emerald-900 tracking-tight">ALAFEFE</span>
                    </div>

                    <nav className="hidden lg:flex items-center gap-8 font-medium">
                        <a href="#" className="hover:text-emerald-900 transition-colors">{t('nav.home')}</a>
                        <a href="#" className="hover:text-emerald-900 transition-colors">{t('nav.personal')}</a>
                        <a href="#" className="hover:text-emerald-900 transition-colors">{t('nav.business')}</a>
                        <a href="#" className="hover:text-emerald-900 transition-colors">{t('nav.claims')}</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleLanguage}
                            className="px-3 py-1 rounded bg-slate-100 text-sm font-bold hover:bg-slate-200 transition-colors"
                        >
                            {i18n.language === 'fr' ? 'AR' : 'FR'}
                        </button>
                        <button className="hidden sm:flex items-center gap-2 bg-emerald-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-800 transition-all">
                            <Phone size={18} />
                            <span>{t('cta.emergency')}</span>
                        </button>
                        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 leading-tight mb-6">
                            {t('hero.title')} <span className="text-emerald-900">{t('hero.highlight')}</span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
                            {t('hero.subtitle')}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="btn-primary flex items-center gap-2">
                                <span>{t('hero.cta_quote')}</span>
                                <ArrowRight size={20} />
                            </button>
                            <button className="btn-outline">
                                {t('hero.cta_discover')}
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-full h-[500px] bg-slate-100 rounded-3xl overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1577416414929-7a4c751ee21e?auto=format&fit=crop&q=80&w=1000"
                                alt="Corporate Casablanca"
                                className="w-full h-full object-cover opacity-60 grayscale"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 to-transparent"></div>
                        </div>
                        {/* Trust Badges */}
                        <div className="absolute -bottom-6 -left-6 glass-card p-6 flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-900/10 rounded-full flex items-center justify-center text-emerald-900">
                                <Shield size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">100% Sécurisé</p>
                                <p className="text-sm text-slate-500">Agréé par l'ACAPS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Quick Grid */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-display font-bold text-slate-900 mb-4">{t('services.title')}</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">{t('services.subtitle')}</p>
                </div>
                <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: <Car size={32} />, title: t('services.auto') },
                        { icon: <Home size={32} />, title: t('services.home') },
                        { icon: <Heart size={32} />, title: t('services.health') },
                        { icon: <Briefcase size={32} />, title: t('services.business') }
                    ].map((s, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                            <div className="text-emerald-900 mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                            <p className="text-slate-500 mb-4">Des solutions sur mesure pour protéger votre patrimoine.</p>
                            <div className="text-emerald-900 flex items-center gap-2 font-medium">
                                <span>Découvrir</span>
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* WhatsApp FAB */}
            <a
                href="#"
                className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
            >
                <MessageCircle size={32} />
            </a>
        </div>
    );
}

export default App;
