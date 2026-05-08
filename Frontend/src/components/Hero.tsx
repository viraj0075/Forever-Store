import ContainerLayout from "../layouts/ContainerLayout";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
    return (
        <>
            <ContainerLayout>
                <div className="flex flex-col sm:flex-row border border-gray-400 w-full">
                    {/* Hero Left Side */}
                    <div className="w-full sm:w-1/2 hidden sm:flex items-center justify-center">
                        <div className="text-center flex flex-col gap-5 justify-center items-center text-[#414141]">
                            <div className="flex items-center justify-center gap-2">
                                <p className="w-8 md:w-15 h-px bg-[#414141]"></p>
                                <p className=" font-medium text-sm md:text-lg">OUR BESTSELLERS</p>
                            </div>
                            <h1 className="text-3xl lg:text-5xl font-bold">Latest Arrivals</h1>
                            <div className=" flex items-center gap-2">
                                <p className="font-semibold text-sm md:text-lg">SHOP NOW</p>
                                <p className="w-8 md:w-15 h-px bg-[#414141]"></p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 h-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover block"
                            src={assets.hero_img}
                            alt="Latest Arrivals"
                            loading="lazy"
                        />
                    </div>
                </div>
            </ContainerLayout>
        </>
    );
};

export default Hero;