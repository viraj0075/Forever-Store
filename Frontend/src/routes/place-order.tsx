import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ContainerLayout from '../layouts/ContainerLayout'
import Title from '../components/Title'
import toast from 'react-hot-toast'
import InputField from '../components/InputField'
import CartTotalsAndPayment from '../components/CartTotalsAndPayment'

export const Route = createFileRoute('/place-order')({
  component: PlaceOrder,
})

function PlaceOrder() {
  const { getCartAmount, placeOrder } = useContext(ShopContext)!;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState('cod');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'email', label: 'Email' },
      { key: 'street', label: 'Street' },
      { key: 'city', label: 'City' },
      { key: 'state', label: 'State' },
      { key: 'zipcode', label: 'Zip Code' },
      { key: 'country', label: 'Country' },
      { key: 'phone', label: 'Phone' }
    ];

    requiredFields.forEach(field => {
      if (formData[field.key as keyof typeof formData].trim() === '') {
        newErrors[field.key] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (getCartAmount() === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    placeOrder({ ...formData, paymentMethod: method });
    toast.success("Order Placed Successfully!");
    navigate({ to: '/order' });
  };

  return (
    <div className="animate-fade-in border-t pt-10 sm:pt-14 pb-24">
      <ContainerLayout>
        <form onSubmit={onSubmitHandler} noValidate className="flex flex-col sm:flex-row justify-between gap-12 sm:gap-20">

          {/* Left Side - Delivery Info */}
          <div className="flex flex-col gap-5 w-full sm:max-w-[480px]">
            <div className="text-xl sm:text-2xl my-3">
              <Title text1={'DELIVERY'} text2={'INFORMATION'} />
            </div>
            <div className="flex gap-4">
              <InputField name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First name" error={errors.firstName} />
              <InputField name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last name" error={errors.lastName} />
            </div>
            <InputField type="email" name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email address" error={errors.email} />
            <InputField name="street" value={formData.street} onChange={onChangeHandler} placeholder="Street" error={errors.street} />
            <div className="flex gap-4">
              <InputField name="city" value={formData.city} onChange={onChangeHandler} placeholder="City" error={errors.city} />
              <InputField name="state" value={formData.state} onChange={onChangeHandler} placeholder="State" error={errors.state} />
            </div>
            <div className="flex gap-4">
              <InputField type="number" name="zipcode" value={formData.zipcode} onChange={onChangeHandler} placeholder="Zip code" error={errors.zipcode} />
              <InputField name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country" error={errors.country} />
            </div>
            <InputField type="number" name="phone" value={formData.phone} onChange={onChangeHandler} placeholder="Phone" error={errors.phone} />
          </div>

          {/* Right Side - Cart Totals & Payment */}
          <CartTotalsAndPayment method={method} setMethod={setMethod} />
        </form>
      </ContainerLayout>
    </div>
  )
}
