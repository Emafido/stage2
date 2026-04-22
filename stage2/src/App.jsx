import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { InvoiceProvider } from './context/InvoiceContext';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import InvoiceDetail from './pages/InvoiceDetail';

function App() {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <Router>
          <div className="flex flex-col min-h-screen lg:flex-row bg-light-main dark:bg-dark-main font-spartan text-slate-500 transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 pt-18 md:pt-20 lg:pt-0 lg:ml-25.75 flex justify-center">
              <div className="w-full max-w-182.5 px-6 py-8 md:py-14 lg:py-16">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/invoice/:id" element={<InvoiceDetail />} />
                </Routes>
              </div>
            </main>
          </div>
        </Router>
      </InvoiceProvider>
    </ThemeProvider>
  );
}

export default App;