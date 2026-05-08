import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";

interface ShopContextType {
    products: typeof products;
    currency: string;
    delivery_fee: number;
}

export const ShopContext = createContext<ShopContextType | null>(null);

export const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
    const currency = "$";
    const delivery_fee = 10;

    const contextValue = {
        products,
        currency,
        delivery_fee
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;



