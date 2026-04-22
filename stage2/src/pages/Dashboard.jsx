import { useState } from 'react';
import { useInvoices } from '../context/InvoiceContext';
import Button from '../components/ui/Button';
import InvoiceCard from '../components/invoice/InvoiceCard';
import InvoiceForm from '../components/invoice/InvoiceForm';
import EmptyIllustration from '../components/invoice/EmptyIllustration';

export default function Dashboard() {
  const { invoices } = useInvoices();
  const [filterOpen, setFilterOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    draft: false,
    pending: false,
    paid: false
  });

  const handleFilterChange = (status) => {
    setFilters(prev => ({ ...prev, [status]: !prev[status] }));
  };

  const activeFilters = Object.keys(filters).filter(key => filters[key]);
  const filteredInvoices = invoices.filter(inv => 
    activeFilters.length === 0 ? true : activeFilters.includes(inv.status)
  );

  return (
    <div className="w-full relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-16 relative">
        <div>
          <h1 className="text-heading-m md:text-heading-l text-slate-900 dark:text-white mb-1 md:mb-2">
            Invoices
          </h1>
          <p className="text-body-var text-slate-500">
            <span className="hidden md:inline">There are </span>
            {filteredInvoices.length} 
            <span className="hidden md:inline"> total</span> invoices
          </p>
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          {/* Filter Dropdown */}
          <div className="relative">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <span className="text-heading-s-var font-bold text-slate-900 dark:text-white group-hover:opacity-80 transition-opacity select-none">
                <span className="hidden md:inline">Filter by status</span>
                <span className="md:hidden">Filter</span>
              </span>
              <svg 
                className={`transform transition-transform duration-300 ${filterOpen ? 'rotate-180' : ''}`} 
                width="11" height="7" xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
              </svg>
            </div>
            
            {filterOpen && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-white dark:bg-dark-hover shadow-[0_10px_20px_rgba(72,84,159,0.25)] dark:shadow-none rounded-lg p-6 z-20 flex flex-col gap-4">
                {['draft', 'pending', 'paid'].map(status => (
                  <label 
                    key={status} 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => handleFilterChange(status)}
                  >
                    <div className={`w-4 h-4 rounded-sm flex items-center justify-center transition-colors border border-transparent ${filters[status] ? 'bg-brand' : 'bg-slate-100 dark:bg-dark-main group-hover:border-brand'}`}>
                      {filters[status] && (
                        <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 4.5l2.124 2.124L8.97 1.28" stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd"/></svg>
                      )}
                    </div>
                    <span className="text-heading-s-var font-bold text-slate-900 dark:text-white capitalize group-hover:opacity-80">
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* New Invoice Button */}
          <Button variant="new" onClick={() => setIsFormOpen(true)}>
            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z" fill="#7C5DFA" fillRule="nonzero"/></svg>
            </div>
            <span className="hidden md:inline font-bold">New Invoice</span>
            <span className="md:hidden font-bold">New</span>
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredInvoices.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredInvoices.map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center mt-25 md:mt-40">
          <div className="mb-10 md:mb-16">
            <EmptyIllustration />
          </div>
          <h2 className="text-heading-m text-slate-900 dark:text-white mb-6">
            There is nothing here
          </h2>
          <p className="text-body-var text-slate-500 max-w-55">
            Create an invoice by clicking the <span className="font-bold">New Invoice</span> button and get started
          </p>
        </div>
      )}
      
      {/* Slide-out Form */}
      <InvoiceForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}