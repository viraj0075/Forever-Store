import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ContainerLayout from "../layouts/ContainerLayout";
import ProductCard from "./ProductCard";
import type { ProductType } from "../Types/ProductType";
import ProductCardSkeleton from "./ProductCardSkeleton";

const LatestCollection = () => {
    const { products } = useContext(ShopContext)!;

    const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLatestProducts(products.slice(0, 10));
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [products]);

    return (
        <ContainerLayout>

            {/* Heading */}
            <div className="pt-14 py-5 text-center text-3xl">
                <Title text1="NEW" text2="COLLECTIONS" />

                <p className="mx-auto mt-3 w-full max-w-2xl text-sm text-gray-600 md:text-base">
                    Explore our newest arrivals, curated just for you.
                    Quality and style in every piece.
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid w-full grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

                {loading
                    ? Array.from({ length: 10 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))
                    : latestProducts.map((item: ProductType) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))}
            </div>
        </ContainerLayout>
    );
};

export default LatestCollection;