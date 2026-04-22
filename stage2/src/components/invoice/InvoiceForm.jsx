import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AnimatePresence } from 'framer-motion';
import { useInvoices } from '../../context/InvoiceContext';
import { generateId } from '../../utils/helpers';
import Button from '../ui/Button';
import Input from '../ui/Input';

const invoiceSchema = z.object({
  senderAddress: z.object({
    street: z.string().min(1, "can't be empty"),
    city: z.string().min(1, "can't be empty"),
    postCode: z.string().min(1, "can't be empty"),
    country: z.string().min(1, "can't be empty"),
  }),
  clientName: z.string().min(1, "can't be empty"),
  clientEmail: z.string().email("invalid email"),
  clientAddress: z.object({
    street: z.string().min(1, "can't be empty"),
    city: z.string().min(1, "can't be empty"),
    postCode: z.string().min(1, "can't be empty"),
    country: z.string().min(1, "can't be empty"),
  }),
  createdAt: z.string().min(1, "can't be empty"),
  paymentTerms: z.coerce.number(),
  description: z.string().min(1, "can't be empty"),
  items: z.array(
    z.object({
      name: z.string().min(1, "can't be empty"),
      quantity: z.coerce.number().min(1, "must be at least 1"),
      price: z.coerce.number().min(0.01, "must be > 0"),
    })
  ).min(1, "an item must be added"),
});

export default function InvoiceForm({ isOpen, onClose, invoice = null }) {
  const { addInvoice, updateInvoice } = useInvoices();
  const isEditing = !!invoice;

  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: isEditing ? invoice : {
      senderAddress: { street: '', city: '', postCode: '', country: '' },
      clientName: '', clientEmail: '',
      clientAddress: { street: '', city: '', postCode: '', country: '' },
      createdAt: new Date().toISOString().split('T')[0],
      paymentTerms: 30,
      description: '',
      items: [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        reset(invoice);
      } else {
        reset({
          senderAddress: { street: '', city: '', postCode: '', country: '' },
          clientName: '', clientEmail: '',
          clientAddress: { street: '', city: '', postCode: '', country: '' },
          createdAt: new Date().toISOString().split('T')[0],
          paymentTerms: 30,
          description: '',
          items: [],
        });
      }
    }
  }, [isOpen, isEditing, invoice, reset]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const calculateTotal = (items) => items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  const calculatePaymentDue = (createdAt, paymentTerms) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + Number(paymentTerms));
    return date.toISOString().split('T')[0];
  };

  const onSubmit = (data, status = 'pending') => {
    const finalData = {
      ...data,
      id: isEditing ? invoice.id : generateId(),
      status: status,
      paymentDue: calculatePaymentDue(data.createdAt, data.paymentTerms),
      total: calculateTotal(data.items),
      items: data.items.map(item => ({
        ...item,
        total: item.quantity * item.price
      }))
    };

    if (isEditing) {
      updateInvoice(invoice.id, finalData);
    } else {
      addInvoice(finalData);
    }
    onClose();
  };

  const handleSaveAsDraft = () => {
    const rawData = getValues();
    onSubmit(rawData, 'draft');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 pt-18 md:pt-20 lg:pt-0 lg:pl-25.75 flex">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full md:w-154 lg:w-179.75 h-full bg-white dark:bg-dark-main rounded-r-2xl lg:rounded-r-[20px] overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="flex-1 overflow-y-auto p-6 md:p-14 custom-scrollbar">
              <h2 className="text-heading-m text-slate-900 dark:text-white mb-12">
                {isEditing ? <span>Edit <span className="text-slate-500">#</span>{invoice.id}</span> : 'New Invoice'}
              </h2>

              <form id="invoice-form" onSubmit={handleSubmit((data) => onSubmit(data, isEditing ? invoice.status : 'pending'))}>
                <div className="mb-12">
                  <h3 className="text-body-var font-bold text-brand mb-6">Bill From</h3>
                  <Input label="Street Address" {...register("senderAddress.street")} error={errors.senderAddress?.street?.message} className="mb-6" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <Input label="City" {...register("senderAddress.city")} error={errors.senderAddress?.city?.message} />
                    <Input label="Post Code" {...register("senderAddress.postCode")} error={errors.senderAddress?.postCode?.message} />
                    <Input label="Country" {...register("senderAddress.country")} error={errors.senderAddress?.country?.message} className="col-span-2 md:col-span-1" />
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-body-var font-bold text-brand mb-6">Bill To</h3>
                  <Input label="Client's Name" {...register("clientName")} error={errors.clientName?.message} className="mb-6" />
                  <Input label="Client's Email" placeholder="e.g. email@example.com" {...register("clientEmail")} error={errors.clientEmail?.message} className="mb-6" />
                  <Input label="Street Address" {...register("clientAddress.street")} error={errors.clientAddress?.street?.message} className="mb-6" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <Input label="City" {...register("clientAddress.city")} error={errors.clientAddress?.city?.message} />
                    <Input label="Post Code" {...register("clientAddress.postCode")} error={errors.clientAddress?.postCode?.message} />
                    <Input label="Country" {...register("clientAddress.country")} error={errors.clientAddress?.country?.message} className="col-span-2 md:col-span-1" />
                  </div>
                </div>

                <div className="mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Input label="Invoice Date" type="date" {...register("createdAt")} error={errors.createdAt?.message} />
                    <div className="flex flex-col gap-2">
                      <label className="text-body-var text-slate-500 dark:text-slate-100">Payment Terms</label>
                      <select {...register("paymentTerms")} className="w-full bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-hover focus:border-brand rounded-sm px-5 py-4 text-heading-s-var text-slate-900 dark:text-white outline-none cursor-pointer">
                        <option value="1">Net 1 Day</option>
                        <option value="7">Net 7 Days</option>
                        <option value="14">Net 14 Days</option>
                        <option value="30">Net 30 Days</option>
                      </select>
                    </div>
                  </div>
                  <Input label="Project Description" placeholder="e.g. Graphic Design Service" {...register("description")} error={errors.description?.message} />
                </div>

                <div>
                  <h3 className="text-[18px] font-bold text-[#777F98] mb-6">Item List</h3>
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-[1fr_64px_100px_16px] md:grid-cols-[1fr_46px_100px_16px] gap-4 items-center mb-4">
                      <Input label={index === 0 ? "Item Name" : ""} {...register(`items.${index}.name`)} error={errors.items?.[index]?.name?.message && " "} />
                      <Input label={index === 0 ? "Qty." : ""} type="number" {...register(`items.${index}.quantity`)} error={errors.items?.[index]?.quantity?.message && " "} className="text-center" />
                      <Input label={index === 0 ? "Price" : ""} type="number" step="0.01" {...register(`items.${index}.price`)} error={errors.items?.[index]?.price?.message && " "} />
                      <div className="flex flex-col items-center justify-end h-full pb-4">
                        {index === 0 && <label className="text-body-var text-slate-500 dark:text-slate-100 mb-6 md:mb-5">Total</label>}
                        <button type="button" onClick={() => remove(index)} className="text-slate-300 hover:text-danger transition-colors pb-1">
                          <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.778 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.026 0h4.447z" fill="currentColor" fillRule="nonzero"/></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="full" onClick={() => append({ name: '', quantity: 1, price: 0 })}>+ Add New Item</Button>
                </div>
              </form>
            </div>

            <div className="bg-white dark:bg-dark-card px-6 py-5 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:px-14 md:py-8 flex justify-between rounded-br-2xl lg:rounded-br-[20px] z-10">
              {isEditing ? (
                <>
                  <Button variant="secondary" onClick={onClose}>Cancel</Button>
                  <Button type="submit" form="invoice-form" variant="primary">Save Changes</Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" onClick={onClose}>Discard</Button>
                  <div className="flex gap-2">
                    <Button type="button" variant="draft" onClick={handleSaveAsDraft}>Save as Draft</Button>
                    <Button type="submit" form="invoice-form" variant="primary">Save & Send</Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}