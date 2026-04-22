export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const baseStyles = "font-spartan text-heading-s-var rounded-full transition-colors duration-300 flex items-center justify-center font-bold";

  const variants = {
    // Button 1 & 2
    primary: "bg-brand hover:bg-brand-hover text-white px-6 py-4",
    // Button 3 (Edit)
    secondary: "bg-light-main hover:bg-slate-100 text-slate-500 dark:bg-dark-hover dark:hover:bg-white dark:hover:text-slate-500 dark:text-slate-100 px-6 py-4",
    // Button 6 (Delete)
    danger: "bg-danger hover:bg-danger-hover text-white px-6 py-4",
    // Button 4 (Save as Draft)
    draft: "bg-[#373B53] hover:bg-slate-900 text-slate-300 dark:bg-dark-card dark:hover:bg-dark-hover dark:text-slate-100 px-6 py-4",
    // Button 5 (Add New Item)
    full: "w-full bg-light-main hover:bg-slate-100 text-slate-500 dark:bg-dark-hover dark:hover:bg-dark-hover/80 dark:text-slate-100 py-4",
    // New Invoice Button (With Icon)
    new: "bg-brand hover:bg-brand-hover text-white pl-2 pr-4 py-2 gap-4"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}