import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

interface ShopContextType {
    products: typeof products;
    currency: string;
    delivery_fee: number;
    showSearch: boolean;
    setShowSearch: (showSearch: boolean) => void;
    search: string;
    setSearch: (search: string) => void;


}

export const ShopContext = createContext<ShopContextType | null>(null);

export const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(false);


    const contextValue = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;



