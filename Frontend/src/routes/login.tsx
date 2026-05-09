import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import ContainerLayout from '../layouts/ContainerLayout'
import Title from '../components/Title'
import InputField from '../components/InputField'
import toast from 'react-hot-toast'
import { assets } from '../assets/frontend_assets/assets'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate login
    toast.success("Logged in successfully!");
    navigate({ to: '/' });
  };

  return (
    <div className="animate-fade-in py-2 sm:py-4">
      <ContainerLayout>
        <div className="flex bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] overflow-hidden my-2 border border-gray-100 lg:min-h-[500px]">
          
          {/* Image Side */}
          <div className="hidden lg:block lg:w-1/2 relative bg-gray-50">
            <img src={assets.contact_img} className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply" alt="Login Cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
              <h2 className="text-white text-3xl font-bold mb-3 tracking-wide">Welcome Back.</h2>
              <p className="text-gray-200 text-sm leading-relaxed">Sign in to access your saved items, track your recent orders, and get personalized fashion recommendations.</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-6 text-center lg:text-left">
              <div className="text-3xl sm:text-4xl mb-2 inline-block">
                <Title text1={'SIGN'} text2={'IN'} />
              </div>
              <p className="text-gray-500 text-sm">Please enter your details to login.</p>
            </div>
            
            <form onSubmit={onSubmitHandler} noValidate className="flex flex-col gap-4">
              <InputField 
                name="email" 
                type="email"
                value={formData.email} 
                onChange={onChangeHandler} 
                placeholder="Email address" 
                error={errors.email} 
                autoComplete="email"
              />
              <InputField 
                name="password" 
                type="password"
                value={formData.password} 
                onChange={onChangeHandler} 
                placeholder="Password" 
                error={errors.password} 
                autoComplete="current-password"
              />
              
              <div className="flex justify-between items-center text-sm mt-2">
                <p className="cursor-pointer hover:text-black text-gray-500 transition-colors">Forgot password?</p>
                <Link to="/signup" className="font-bold text-gray-800 hover:text-black transition-colors border-b border-gray-800 pb-0.5">Create account</Link>
              </div>

              <button type="submit" className="mt-6 w-full bg-black text-white font-bold tracking-widest uppercase py-3.5 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 cursor-pointer">
                Sign In
              </button>
            </form>
          </div>

        </div>
      </ContainerLayout>
    </div>
  )
}
