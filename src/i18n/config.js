import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    fr: {
        translation: {
            nav: {
                home: 'Accueil',
                personal: 'Particuliers',
                business: 'Entreprise',
                claims: 'Sinistres'
            },
            cta: {
                emergency: 'Urgence Sinistre',
                client_space: 'Espace Client'
            },
            hero: {
                title: 'Votre Partenaire en',
                highlight: 'Confiance & Protection',
                subtitle: 'Alafafe vous accompagne avec des solutions d’assurance sur mesure, pensées pour les besoins uniques des Marocains.',
                cta_quote: 'Demander un devis',
                cta_discover: 'Nos services'
            },
            services: {
                title: 'Nos Solutions',
                subtitle: 'Découvrez une large gamme de produits d’assurance adaptés à votre vie quotidienne et à votre activité professionnelle.',
                auto: 'Assurance Auto',
                home: 'Habitation MRH',
                health: 'Santé & Prévoyance',
                business: 'Risques Pro'
            }
        }
    },
    ar: {
        translation: {
            nav: {
                home: 'الرئيسية',
                personal: 'للأفراد',
                business: 'للمقاولات',
                claims: 'المطالبات'
            },
            cta: {
                emergency: 'طوارئ الحوادث',
                client_space: 'فضاء الزبون'
            },
            hero: {
                title: 'شريككم في',
                highlight: 'الثقة و الحماية',
                subtitle: 'ترافقكم العلاف في حلول تأمين مصممة خصيصاً لتلبية الاحتياجات الفريدة للمغاربة.',
                cta_quote: 'طلب عرض سعر',
                cta_discover: 'خدماتنا'
            },
            services: {
                title: 'حلولنا',
                subtitle: 'اكتشف مجموعة واسعة من منتجات التأمين التي تتكيف مع حياتك اليومية ونشاطك المهني.',
                auto: 'تأمين السيارات',
                home: 'تأمين المسكن',
                health: 'الصحة والوقاية',
                business: 'المخاطر المهنية'
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'fr',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
