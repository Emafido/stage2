import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex justify-between items-center">
        <label className={`text-body-var ${error ? 'text-danger' : 'text-slate-500 dark:text-slate-100'}`}>
          {label}
        </label>
        {error && <span className="text-body-var text-danger">{error}</span>}
      </div>
      
      <input
        ref={ref}
        className={`
          w-full bg-white dark:bg-dark-card border rounded-sm px-5 py-4
          text-heading-s-var text-slate-900 dark:text-white outline-none transition-colors
          ${error 
            ? 'border-danger focus:border-danger' 
            : 'border-slate-100 dark:border-dark-hover focus:border-brand dark:focus:border-brand'
          }
        `}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';
export default Input;