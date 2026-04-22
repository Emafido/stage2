import { useTheme } from '../../context/ThemeContext';

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="fixed z-50 flex flex-row items-center justify-between w-full h-18 pr-6 transition-colors duration-300 md:h-20 lg:flex-col lg:h-screen lg:w-25.75 lg:pr-0 lg:pb-6 bg-dark-card rounded-r-2xl lg:rounded-r-[20px]">
      
      <div className="relative flex items-center justify-center h-full w-18 md:w-20 lg:w-full lg:h-25.75 bg-brand rounded-r-2xl lg:rounded-r-[20px] overflow-hidden">
        <div className="absolute bottom-0 w-full h-1/2 bg-brand-hover rounded-tl-2xl lg:rounded-tl-[20px]"></div>
        <div className="relative z-10 w-7 h-7 bg-white rounded-full"></div>
      </div>

      <div className="flex flex-row items-center gap-6 lg:flex-col lg:gap-8">
        <button 
          onClick={toggleTheme} 
          className="text-slate-500 hover:text-slate-100 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? (
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.502 11.342a.703.703 0 00-.588.128 7.499 7.499 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.713.41-2.48.28-.84.697-1.559 1.226-2.137a.703.703 0 00-.59-.133C3.426 1.947 0 5.554 0 10.12A10.08 10.08 0 0010.003 20c4.356 0 8.058-3.15 8.948-7.319a.703.703 0 00-.45-.899z" fill="currentColor" fillRule="nonzero"/></svg>
          ) : (
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M9.81 16.035c-3.412 0-6.175-2.776-6.175-6.208S6.398 3.619 9.81 3.619c3.413 0 6.175 2.776 6.175 6.208s-2.762 6.208-6.175 6.208zm0-1.862c2.385 0 4.312-1.936 4.312-4.346 0-2.41-1.927-4.346-4.312-4.346-2.384 0-4.312 1.936-4.312 4.346 0 2.41 1.928 4.346 4.312 4.346zM10.741 0v1.862H8.879V0h1.862zm0 17.759v1.862H8.879v-1.862h1.862zM3.447 2.05l1.317 1.323-1.317 1.324-1.317-1.324 1.317-1.323zm12.726 12.784l1.317 1.324-1.317 1.323-1.317-1.323 1.317-1.324zM1.144 8.89v1.863H-.718V8.89h1.862zm19.535 0v1.863h-1.862V8.89h1.862zM3.447 16.634l1.317-1.324 1.317 1.324-1.317 1.323-1.317-1.323zm12.726-12.784l1.317-1.323 1.317 1.323-1.317 1.324-1.317-1.324z" fill="currentColor" fillRule="nonzero"/></svg>
          )}
        </button>

        <div className="w-px h-full lg:w-full lg:h-px bg-[#494E6E]"></div>

        <div className="lg:mb-0">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User Avatar" 
            className="w-8 h-8 rounded-full md:w-10 md:h-10" 
          />
        </div>
      </div>
    </aside>
  );
}