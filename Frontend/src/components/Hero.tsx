import ContainerLayout from "../layouts/ContainerLayout";
import { assets } from "../assets/frontend_assets/assets";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <ContainerLayout>
            <div className="flex flex-col md:flex-row border border-gray-400 overflow-hidden min-h-[calc(100vh-100px)]">

                {/* Left Side - Text */}
                <div className="w-full md:w-1/2 bg-white flex items-center justify-center py-12 md:py-0">
                    <div className="text-center flex flex-col gap-6 text-[#414141] px-6">
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-8 md:w-12 h-px bg-[#414141]" />
                            <p className="font-medium text-sm md:text-base tracking-widest">
                                OUR BESTSELLERS
                            </p>
                            <div className="w-8 md:w-12 h-px bg-[#414141]" />
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Latest Arrivals
                        </h1>

                        <div className="flex items-center justify-center gap-2">
                            <p className="font-semibold text-sm md:text-base tracking-widest">
                                SHOP NOW
                            </p>
                            <div className="w-8 md:w-12 h-px bg-[#414141]" />
                        </div>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="relative w-full md:w-1/2 bg-[#ffe6e6] overflow-hidden">

                    {/* Skeleton */}
                    {!isLoaded && (
                        <Skeleton
                            height={700}
                            width={700}
                        />
                    )}

                    <img
                        src={assets.hero_img}           // ← This should be just the model image
                        alt="Latest arrivals - Shop our newest collection"
                        loading="eager"
                        fetchPriority="high"
                        width={700}                     // ← Add natural dimensions
                        height={700}
                        onLoad={() => setIsLoaded(true)}
                        className={`w-full h-full object-cover transition-opacity duration-700 
                            ${isLoaded ? "opacity-100" : "opacity-0"}`}
                    />
                </div>
            </div>
        </ContainerLayout>
    );
};

export default Hero;