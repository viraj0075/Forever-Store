import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import type { ProductType } from "../Types/ProductType";
import ProductCard from "./ProductCard";
import ContainerLayout from "../layouts/ContainerLayout";
import Title from "./Title";

const BestSeller = () => {
    const { products } = useContext(ShopContext)!;
    const [bestSellers, setbestSellers] = useState<ProductType[]>(products);

    useEffect(() => {
        setbestSellers(products.filter((items: ProductType) => items.bestseller))
    }, [products])


    return (
        <ContainerLayout>
            <div>
                <div className="text-center py-5 text-3xl">
                    <Title text1="BEST" text2=" SELLER" />
                    <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                        Discover our best sellers, loved by customers worldwide. Style that speaks for itself.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {bestSellers.map((product: ProductType) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
        </ContainerLayout>
    )
}

export default BestSeller