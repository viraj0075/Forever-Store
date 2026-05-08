import { policies } from "../constants/PolicyData";
import ContainerLayout from "../layouts/ContainerLayout";
import Title from "./Title";

const OurPolicy = () => {
    return (
        <ContainerLayout>
            <div className="py-10">
                <div className="text-center py-8 text-3xl">
                    <Title text1="OUR" text2="POLICY" />
                    <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                        Experience shopping with complete peace of mind. We prioritize your satisfaction above all else.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-20 text-center py-10 text-xs sm:text-sm md:text-base text-gray-700">
                    {policies.map((policy, index) => (
                        <div key={index} className="flex flex-col items-center p-5">
                            <img src={policy.icon} className="w-12 mb-5" alt={policy.title} />
                            <p className="font-semibold text-gray-800">{policy.title}</p>
                            <p className="text-gray-500 mt-2">{policy.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ContainerLayout>
    );
};

export default OurPolicy;
