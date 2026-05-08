import { Link } from "@tanstack/react-router";
import type { ProductCardType } from "../Types/ProductCardType";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";


const ProductCard = ({ id, name, image, price }: ProductCardType) => {
    const { currency } = useContext(ShopContext)!;
    return (
        <Link to="/product/$productid" params={{ productid: id }} className="text-gray-700 cursor-pointer">
            <div className="overflow-hidden">
                <img 
                    src={image[0]} 
                    alt={name} 
                    className="hover:scale-110 transition ease-in-out duration-300" 
                />
            </div>
            <p className="pt-3 pb-1 text-sm">{name}</p>
            <p className="text-sm font-medium">{currency}{price}</p>
        </Link>
    )
}


export default ProductCard