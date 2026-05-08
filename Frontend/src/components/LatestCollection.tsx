import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ContainerLayout from "../layouts/ContainerLayout";
import ProductCard from "./ProductCard";
import type { ProductType } from "../Types/ProductType";

const LatestCollection = () => {
    const { products } = useContext(ShopContext)!;
    const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 20));
    }, [products]);

    return (
        <ContainerLayout>
            <div className="my-10">
                <div className="text-center py-8 text-3xl">
                    <Title text1="LATEST" text2="COLLECTIONS" />
                    <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                        Explore our newest arrivals, curated just for you. Quality and style in every piece.
                    </p>
                </div>

                {/* Rendering Products */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {latestProducts.map((item: ProductType) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))}
                </div>
            </div>
        </ContainerLayout>
    )
}

export default LatestCollection;