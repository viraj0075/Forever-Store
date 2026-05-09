import type { products } from "../assets/frontend_assets/assets";
import type { ProductType } from "./ProductType";

export type OrderItemType = Omit<ProductType, 'date'> & {
    size: string;
    quantity: number;
    status: string;
    paymentMethod: string;
    date: string;
};

export type AddressType = {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    phone: string;
    paymentMethod?: string;
};

export type OrderType = {
    id: string;
    items: OrderItemType[];
    address: AddressType;
    amount: number;
    date: string;
};

export interface ShopContextType {
    products: typeof products;
    currency: string;
    delivery_fee: number;
    showSearch: boolean;
    setShowSearch: (showSearch: boolean) => void;
    search: string;
    setSearch: (search: string) => void;
    cartItems: {
        [key: string]: {
            [key: string]: number
        }
    };
    addToCart: (itemId: string, size: string) => void;
    removeFromCart: (itemId: string, size: string) => void;
    updateQuantity: (itemId: string, size: string, quantity: number) => void;
    getTotalCartCount: () => number;
    getCartAmount: () => number;
    orders: OrderType[];
    placeOrder: (address: AddressType) => void;
}