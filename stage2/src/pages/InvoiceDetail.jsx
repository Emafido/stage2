import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useInvoices } from '../context/InvoiceContext';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import InvoiceForm from '../components/invoice/InvoiceForm';

export default function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, deleteInvoice, markAsPaid } = useInvoices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const invoice = invoices.find(inv => inv.id === id);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
  };
  const formatPrice = (num) => `£${Number(num).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`;

  if (!invoice) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-heading-m text-slate-900 dark:text-white">Invoice Not Found</h2>
        <Button onClick={() => navigate('/')} className="mt-6">Go Back</Button>
      </div>
    );
  }

  const actionButtons = (
    <>
      <Button variant="secondary" onClick={() => setIsFormOpen(true)}>
        Edit
      </Button>
      <Button variant="danger" onClick={() => setIsModalOpen(true)}>
        Delete
      </Button>
      {invoice.status !== 'paid' && (
        <Button variant="primary" onClick={() => markAsPaid(invoice.id)}>
          Mark as Paid
        </Button>
      )}
    </>
  );

  return (
    <div className="w-full relative pb-24 md:pb-0">
      
      <Link to="/" className="flex items-center gap-6 mb-8 w-max group outline-none">
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none" fillRule="evenodd"/></svg>
        <span className="text-heading-s-var font-bold text-slate-900 dark:text-white group-hover:text-slate-500 transition-colors">Go back</span>
      </Link>

      <div className="bg-white dark:bg-dark-card rounded-lg p-6 lg:px-8 mb-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center justify-between w-full md:w-auto md:gap-4">
          <span className="text-body-var text-slate-500">Status</span>
          <StatusBadge status={invoice.status} />
        </div>
        
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {actionButtons}
        </div>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-lg p-6 md:p-8 lg:p-12 shadow-sm">
        
        <div className="flex flex-col md:flex-row md:justify-between mb-8 md:mb-12">
          <div className="mb-8 md:mb-0">
            <h2 className="text-heading-s-var font-bold text-slate-900 dark:text-white mb-2">
              <span className="text-slate-500">#</span>{invoice.id}
            </h2>
            <p className="text-body-var text-slate-500">{invoice.description}</p>
          </div>
          <div className="text-body-var text-slate-500 md:text-right flex flex-col">
            <span>{invoice.senderAddress?.street}</span>
            <span>{invoice.senderAddress?.city}</span>
            <span>{invoice.senderAddress?.postCode}</span>
            <span>{invoice.senderAddress?.country}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-24 lg:gap-29.5 mb-10 md:mb-12">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-body-var text-slate-500 mb-3">Invoice Date</p>
              <p className="text-heading-s-var font-bold text-slate-900 dark:text-white">{formatDate(invoice.createdAt)}</p>
            </div>
            <div>
              <p className="text-body-var text-slate-500 mb-3">Payment Due</p>
              <p className="text-heading-s-var font-bold text-slate-900 dark:text-white">{formatDate(invoice.paymentDue)}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-body-var text-slate-500 mb-3">Bill To</p>
            <p className="text-heading-s-var font-bold text-slate-900 dark:text-white mb-2">{invoice.clientName}</p>
            <div className="text-body-var text-slate-500 flex flex-col">
              <span>{invoice.clientAddress?.street}</span>
              <span>{invoice.clientAddress?.city}</span>
              <span>{invoice.clientAddress?.postCode}</span>
              <span>{invoice.clientAddress?.country}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-body-var text-slate-500 mb-3">Sent to</p>
            <p className="text-heading-s-var font-bold text-slate-900 dark:text-white">{invoice.clientEmail}</p>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden bg-[#F9FAFE] dark:bg-dark-hover">
          <div className="p-6 md:p-8">
            <div className="hidden md:grid grid-cols-5 text-body-var text-slate-500 mb-8">
              <span className="col-span-2">Item Name</span>
              <span className="text-center">QTY.</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
              {invoice.items?.map((item, index) => (
                <div key={index} className="flex justify-between items-center md:grid md:grid-cols-5 text-heading-s-var font-bold text-slate-900 dark:text-white">
                  <div className="md:col-span-2 flex flex-col gap-2 md:gap-0">
                    <span>{item.name}</span>
                    <span className="text-slate-500 md:hidden">{item.quantity} x {formatPrice(item.price)}</span>
                  </div>
                  <span className="hidden md:block text-slate-500 text-center">{item.quantity}</span>
                  <span className="hidden md:block text-slate-500 text-right">{formatPrice(item.price)}</span>
                  <span className="text-right">{formatPrice(item.total)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#373B53] dark:bg-slate-900 text-white p-6 md:px-8 md:py-6 flex items-center justify-between">
            <span className="text-body text-white font-normal">Amount Due</span>
            <span className="text-heading-m">{formatPrice(invoice.total)}</span>
          </div>
        </div>

      </div>

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-dark-card p-6 flex items-center justify-center gap-2 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        {actionButtons}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-6">
          <div 
            className="bg-white dark:bg-dark-card rounded-lg p-8 max-w-120 w-full shadow-xl"
            role="dialog" 
            aria-modal="true"
          >
            <h2 className="text-heading-m text-slate-900 dark:text-white mb-3">Confirm Deletion</h2>
            <p className="text-body-var text-slate-500 mb-4 leading-5.5">
              Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => {
                deleteInvoice(invoice.id);
                navigate('/');
              }}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Form for Editing */}
      <InvoiceForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} invoice={invoice} />
    </div>
  );
}