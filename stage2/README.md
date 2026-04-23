# 🧾 Invoice Management App — HNG Stage 2

A fully functional, responsive, and accessible Invoice Management Application built with **React** and **Tailwind CSS v4**. This project was developed as part of the Frontend Wizards Stage 2 task at HNG.

## 🔗 Project Links

- **Live Demo:** [Insert Your Vercel/Netlify URL Here]
- **GitHub Repository:** [Insert Your GitHub Repo URL Here]

## 🚀 Key Features

- **Full CRUD Functionality:** Create, Read, Update, and Delete invoices.
- **Draft & Payment System:** Save invoices as "Draft" or "Pending." Mark pending invoices as "Paid."
- **Data Persistence:** All invoice data and theme preferences are persisted using `LocalStorage`.
- **Advanced Filtering:** Filter invoices by status (Draft, Pending, Paid) using an intuitive checkbox dropdown.
- **Light/Dark Mode:** Seamless global theme toggling with a persistent state.
- **Responsive Design:** Optimized for Mobile (320px+), Tablet (768px+), and Desktop (1024px+).
- **Dynamic Forms:** Add or remove multiple items in a single invoice with real-time total calculations.
- **Strict Validation:** Robust form validation using `Zod` and `react-hook-form`.

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/) (Vite)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** React Context API
- **Routing:** React Router DOM
- **Form Handling:** `react-hook-form`
- **Validation:** `Zod`
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** Custom SVG Assets

## 📦 Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/invoice-app.git
   cd invoice-app
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Run the development server:**

   ```bash
   bun dev
   ```

4. **Build for production:**

   ```bash
   bun run build
   ```

## 🏛️ Architecture Overview

The project follows a modular, scalable folder structure to separate concerns:

- **`src/context`**: Contains `InvoiceContext` and `ThemeContext`.
- **`src/components/ui`**: Atomic, reusable components like `Button` and `Input`.
- **`src/components/invoice`**: Domain-specific components like `InvoiceForm` and `InvoiceCard`.
- **`src/pages`**: Main view components (`Dashboard` and `InvoiceDetail`).
- **`src/utils`**: Helper functions for ID generation and date formatting.

## ♿ Accessibility Notes

This application was built with accessibility as a core priority:

- **Keyboard Navigation:** All interactive elements are keyboard navigable.
- **Focus Trapping:** The Delete Confirmation Modal traps focus when open.
- **Semantic HTML:** Used proper landmarks (`<aside>`, `<main>`) and `<label>` tags.
- **ARIA Attributes:** Modal triggers include `aria-modal="true"` and `role="dialog"`.
- **ESC Key Support:** Modals and forms can be closed using the `Escape` key.

## ⚖️ Trade-offs & Challenges

- **LocalStorage vs. Backend:** Chose `LocalStorage` to maximize performance and ensure a strictly client-side React experience.
- **Tailwind v4 Migration:** Simplified the build process but required custom variants for the manual Dark Mode toggle.
- **Form State Complexity:** Handling nested arrays in a slide-out panel required balancing `react-hook-form` performance with validation logic.

## 🌟 Future Improvements

- **IndexedDB Integration:** For handling a much larger volume of invoices beyond LocalStorage limits.
- **PDF Export:** Adding a feature to download or print a professional PDF version.
- **Sorting:** Adding the ability to sort invoices by Date or Total Amount.

Developed by Emmanuel Emafido Aridon — Frontend Wizards Stage 2 Task