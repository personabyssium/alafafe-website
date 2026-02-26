# Alafafe Website: Technical Overview & Features

This document provides a detailed technical breakdown of the Alafafe insurance brokerage website, its features, and the implementation details of its core engines.

## 🚀 Technology Stack

The website is built using a modern, lightweight, and performant stack:

-   **Vite:** The build tool and development server, ensuring lightning-fast load times and a smooth developer experience.
-   **Tailwind CSS:** A utility-first CSS framework used for all styling, enabling a custom, premium design without bulky CSS files.
-   **Vanilla JavaScript:** The core logic is written in clean, modern JS (ES6+) to keep the site fast and dependency-free where possible.
-   **i18next:** A powerful internationalization framework used for managing French and Arabic translations.
-   **Lucide React:** Icon library for clean, consistent iconography.

## ✨ Core Features

1.  **Unified Quote Engine:** A dynamic, multi-step form system that adapts to different insurance types.
2.  **Multilingual Support:** Seamless switching between French (LTR) and Arabic (RTL) with persistent language settings.
3.  **Responsive Design:** Fully optimized for mobile, tablet, and desktop views with a dedicated hamburger menu for smaller screens.
4.  **SEO Optimized:** Comprehensive meta tags, Open Graph support, and semantic HTML structure for maximum visibility.
5.  **Performance:** Minimal external dependencies and optimized asset loading via Vite.

---

## ⚙️ How the Quote Engine Works

The Quote Engine is the "brain" of the lead generation system. It is implemented in `src/quote-engine.js` as a reusable Class.

### 1. Configuration-Driven
The engine doesn't have hardcoded forms. Instead, it reads from `src/config/quotes.json`. This file defines:
-   **Steps:** The labels and progress indicators.
-   **Fields:** The name, type (select, radio, number, tel), and options for each input.
-   **Validation:** Whether a field is required.

### 2. State Management
-   **`currentStepIndex`**: Tracks which part of the form the user is viewing.
-   **`formData`**: A centralized object that collects and preserves data across all steps. Even if a user goes back and forward, their progress is saved.

### 3. Dynamic Rendering
The `render()` method clears the container and injects the HTML for the current step. It uses a progress bar calculation: `((currentStepIndex + 1) / totalSteps) * 100`.

---

## 📩 Form Submission Process

The submission process is designed to be "headless" and reliable using AJAX.

1.  **Data Gathering:** When the final "Submit" button is clicked, the engine iterates through the stored `formData`.
2.  **AJAX POST:** It sends a `POST` request to the root URL (`/`) using the `fetch` API.
3.  **Payload Format:** The data is sent as `application/x-www-form-urlencoded`, including a hidden `form-name` field (e.g., `quote-auto`). This is the format Netlify expects for its automated form processing.
4.  **UI Feedback:** The engine displays a loading spinner during the request and then shows a "Success" or "Error" state based on the server response.

---

## 🌐 Netlify Hosting & Forms Setup

Setting up the forms on Netlify is designed to be extremely simple. You don't need any backend code.

### 1. Automatic Detection
Because the Quote Engine injects a hidden input `<input type="hidden" name="form-name" value="...">`, Netlify will automatically detect these forms when you deploy the site.

### 2. Setup Steps (Simple Guide)
1.  **Connect Repo:** Link your GitHub/GitLab repository to Netlify.
2.  **Build Settings:** Use `npm run build` as the build command and `dist` as the publish directory.
3.  **Forms Tab:** Once deployed, go to the **"Forms"** tab in your Netlify dashboard. You will see your submissions appearing there automatically as users fill them out.
4.  **Notifications:** You can set up email notifications in **Site configuration > Forms > Form notifications** to get an alert every time a new quote is requested.

> [!TIP]
> **No Backend Required:** This setup allows the Alafafe team to receive leads directly in their inbox or CRM without managing a database or server.
