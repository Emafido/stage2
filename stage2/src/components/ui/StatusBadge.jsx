export default function StatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase() || 'draft';

  const variants = {
    paid: "bg-[#33D69F]/10 text-[#33D69F]",
    pending: "bg-[#FF8F00]/10 text-[#FF8F00]",
    draft: "bg-[#373B53]/10 text-[#373B53] dark:bg-[#DFE3FA]/10 dark:text-[#DFE3FA]"
  };

  const dotVariants = {
    paid: "bg-[#33D69F]",
    pending: "bg-[#FF8F00]",
    draft: "bg-[#373B53] dark:bg-[#DFE3FA]"
  };

  const currentVariant = variants[normalizedStatus];
  const currentDot = dotVariants[normalizedStatus];

  return (
    <div className={`flex items-center justify-center gap-2 w-26 py-3 rounded-md capitalize font-bold text-heading-s-var ${currentVariant}`}>
      <div className={`w-2 h-2 rounded-full ${currentDot}`}></div>
      {status}
    </div>
  );
}