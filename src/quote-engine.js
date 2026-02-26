/**
 * Alafafe Unified Quote Engine
 * Handles multi-step forms, validation, and Netlify AJAX submission.
 */

import quoteConfigs from './config/quotes.json';

class QuoteEngine {
    constructor(formType, containerId) {
        this.formType = formType;
        this.config = quoteConfigs[formType];
        this.container = document.getElementById(containerId);
        this.currentStepIndex = 0;
        this.formData = {};

        if (!this.config || !this.container) {
            console.error(`[QuoteEngine] Initialization failed for ${formType}`);
            return;
        }

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const step = this.config.steps[this.currentStepIndex];
        const isLastStep = this.currentStepIndex === this.config.steps.length - 1;

        this.container.innerHTML = `
            <div class="quote-engine-header mb-8">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm font-bold text-emerald-900 uppercase tracking-widest">Étape ${this.currentStepIndex + 1}/${this.config.steps.length}</span>
                    <span class="text-sm text-slate-400">${step.label}</span>
                </div>
                <div class="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div class="bg-emerald-900 h-full transition-all duration-500" style="width: ${((this.currentStepIndex + 1) / this.config.steps.length) * 100}%"></div>
                </div>
            </div>
            
            <form id="quote-form-inner" class="space-y-6">
                <input type="hidden" name="form-name" value="quote-${this.formType}">
                ${step.fields.map(field => this.renderField(field)).join('')}
                
                <div class="flex gap-4 pt-4">
                    ${this.currentStepIndex > 0 ? `
                        <button type="button" id="prev-step" class="flex-1 py-3 border border-silver rounded-xl font-bold hover:bg-slate-50 transition-colors">Retour</button>
                    ` : ''}
                    <button type="submit" class="flex-[2] py-4 bg-emerald-900 text-white rounded-xl font-bold shadow-xl hover:bg-emerald-800 transition-all">
                        ${isLastStep ? 'Obtenir mon devis' : 'Continuer'}
                    </button>
                </div>
            </form>
        `;

        this.bindEvents();
    }

    renderField(field) {
        const value = this.formData[field.name] || '';

        let inputHtml = '';
        if (field.type === 'select') {
            inputHtml = `
                <select name="${field.name}" ${field.required ? 'required' : ''} class="w-full bg-slate-50 border border-silver rounded-lg p-3 outline-none focus:border-emerald-900 transition-colors">
                    <option value="" disabled ${!value ? 'selected' : ''}>Choisir...</option>
                    ${field.options.map(opt => `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                </select>
            `;
        } else if (field.type === 'radio') {
            inputHtml = `
                <div class="grid grid-cols-1 gap-3">
                    ${field.options.map(opt => `
                        <label class="flex items-center gap-3 p-3 border border-silver rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                            <input type="radio" name="${field.name}" value="${opt}" ${field.required ? 'required' : ''} ${value === opt ? 'checked' : ''} class="text-emerald-900 focus:ring-emerald-900">
                            <span class="text-slate-700">${opt}</span>
                        </label>
                    `).join('')}
                </div>
            `;
        } else {
            inputHtml = `
                <input type="${field.type}" name="${field.name}" value="${value}" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''} 
                    class="w-full bg-slate-50 border border-silver rounded-lg p-3 outline-none focus:border-emerald-900 transition-colors">
            `;
        }

        return `
            <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">${field.label}</label>
                ${inputHtml}
            </div>
        `;
    }

    bindEvents() {
        const form = document.getElementById('quote-form-inner');
        const prevBtn = document.getElementById('prev-step');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNext();
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentStepIndex--;
                this.render();
            });
        }
    }

    handleNext() {
        const form = document.getElementById('quote-form-inner');
        const formData = new FormData(form);

        // Save data from current step
        for (let [key, value] of formData.entries()) {
            if (key !== 'form-name') this.formData[key] = value;
        }

        if (this.currentStepIndex < this.config.steps.length - 1) {
            this.currentStepIndex++;
            this.render();
        } else {
            this.submit();
        }
    }

    async submit() {
        this.container.innerHTML = `
            <div class="text-center py-12">
                <div class="w-16 h-16 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <p class="text-slate-600 font-medium">Traitement de votre demande...</p>
            </div>
        `;

        try {
            const body = new URLSearchParams();
            body.append('form-name', `quote-${this.formType}`);
            for (let [key, value] of Object.entries(this.formData)) {
                body.append(key, value);
            }

            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: body.toString()
            });

            if (response.ok) {
                this.renderSuccess();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('[QuoteEngine] Submission error:', error);
            this.renderError();
        }
    }

    renderSuccess() {
        this.container.innerHTML = `
            <div class="text-center py-12 animate-in fade-in zoom-in duration-500">
                <div class="w-20 h-20 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-900/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold mb-4">Demande Envoyée !</h3>
                <p class="text-slate-600 leading-relaxed max-w-xs mx-auto mb-8">
                    Merci pour votre confiance. Un conseiller Alafafe vous contactera sous peu avec votre devis personnalisé.
                </p>
                <button onclick="window.location.reload()" class="text-emerald-900 font-bold hover:underline">Recommencer</button>
            </div>
        `;
    }

    renderError() {
        this.container.innerHTML = `
            <div class="text-center py-12">
                <h3 class="text-xl font-bold text-red-600 mb-4">Une erreur est survenue</h3>
                <p class="text-slate-600 mb-8">Nous n'avons pas pu envoyer votre demande. Veuillez réessayer ou nous contacter par téléphone.</p>
                <button onclick="window.location.reload()" class="btn-primary">Réessayer</button>
            </div>
        `;
    }
}

export default QuoteEngine;
