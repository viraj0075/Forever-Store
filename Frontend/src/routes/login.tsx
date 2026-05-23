import { createFileRoute } from '@tanstack/react-router'
import ContainerLayout from '../layouts/ContainerLayout'
import { SignIn, useAuth } from '@clerk/clerk-react'
import Skeleton from 'react-loading-skeleton'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const { isLoaded } = useAuth()

  return (
    <div className="animate-fade-in py-8 sm:py-12">
      <ContainerLayout>
        <div className="flex justify-center items-center py-8">
          {!isLoaded ? (
            <div className="w-full max-w-[440px] border border-gray-100 bg-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(8,_112,_184,_0.05)] rounded-3xl flex flex-col gap-6">
              {/* Brand Logo & Header Skeleton */}
              <div className="flex flex-col gap-3">
                <Skeleton height={28} width="50%" className="rounded-lg" />
                <Skeleton height={16} width="75%" className="rounded-md" />
              </div>

              {/* Social Buttons Skeleton */}
              <div className="flex flex-col gap-3 mt-2">
                <Skeleton height={42} className="rounded-xl" />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-2">
                <div className="flex-1 h-[1px] bg-gray-100"></div>
                <span className="text-[10px] uppercase font-bold text-gray-300 tracking-wider">or</span>
                <div className="flex-1 h-[1px] bg-gray-100"></div>
              </div>

              {/* Input Form Fields */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Skeleton height={14} width="30%" className="rounded-md" />
                  <Skeleton height={40} className="rounded-xl" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <Skeleton height={14} width="35%" className="rounded-md" />
                    <Skeleton height={12} width="25%" className="rounded-md" />
                  </div>
                  <Skeleton height={40} className="rounded-xl" />
                </div>
              </div>

              {/* Action Button */}
              <Skeleton height={46} className="rounded-xl mt-2" />

              {/* Footer */}
              <div className="flex justify-center mt-2">
                <Skeleton height={16} width="55%" className="rounded-md" />
              </div>
            </div>
          ) : (
            <SignIn
              signUpUrl="/signup"
              fallbackRedirectUrl="/"
              appearance={{
                elements: {
                  card: "shadow-[0_20px_50px_rgba(8,_112,_184,_0.05)] border border-gray-100 rounded-3xl p-4 sm:p-6",
                  headerTitle: "text-2xl font-black text-gray-800 tracking-wide",
                  formButtonPrimary: "bg-black hover:bg-gray-800 text-sm font-bold uppercase tracking-widest text-white py-3.5 rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer",
                  footerActionLink: "font-bold text-gray-800 hover:text-black transition-colors"
                }
              }}
            />
          )}
        </div>
      </ContainerLayout>
    </div>
  )
}

