import type { products } from "../assets/frontend_assets/assets";

export interface ShopContextType {
    products: typeof products;
    currency: string;
    delivery_fee: number;
    showSearch: boolean;
    setShowSearch: (showSearch: boolean) => void;
    search: string;
    setSearch: (search: string) => void;
}