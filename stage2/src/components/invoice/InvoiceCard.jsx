import { Link } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';

export default function InvoiceCard({ invoice }) {
  return (
    <Link to={`/invoice/${invoice.id}`} className="block mb-4 outline-none group">
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white dark:bg-dark-card rounded-lg p-6 lg:px-8 border border-transparent hover:border-brand transition-all duration-300 cursor-pointer shadow-sm">
        
        {/* Mobile Top / Desktop Left */}
        <div className="flex justify-between items-center md:gap-10 mb-6 md:mb-0">
          <span className="text-heading-s-var font-bold text-slate-900 dark:text-white">
            <span className="text-slate-500">#</span>{invoice.id}
          </span>
          {/* Client Name (Visible only on mobile top right) */}
          <span className="text-body-var text-slate-500 md:hidden text-right">{invoice.clientName}</span>
          {/* Due Date (Desktop position) */}
          <span className="hidden md:block text-body-var text-slate-500 w-28">Due {invoice.paymentDue}</span>
          {/* Client Name (Desktop position) */}
          <span className="hidden md:block text-body-var text-slate-500 w-24">{invoice.clientName}</span>
        </div>

        {/* Mobile Bottom / Desktop Right */}
        <div className="flex justify-between items-center md:gap-10">
          <div className="flex flex-col md:flex-row md:items-center md:gap-10">
            {/* Due Date (Mobile position) */}
            <span className="text-body-var text-slate-500 md:hidden mb-2">Due {invoice.paymentDue}</span>
            {/* Total Amount */}
            <span className="text-heading-s font-bold text-slate-900 dark:text-white">
              £{invoice.total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="flex items-center gap-5">
            <StatusBadge status={invoice.status} />
            {/* Right Arrow Icon (Visible only on Desktop) */}
            <svg className="hidden md:block" width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
            </svg>
          </div>
        </div>

      </div>
    </Link>
  );
}