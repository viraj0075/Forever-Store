import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import type { ShopContextType, OrderType, OrderItemType, AddressType } from "../Types/ShopContextType";

export const ShopContext = createContext<ShopContextType | null>(null);

export const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<{
        [key: string]: {
            [key: string]: number
        }
    }>({});
    const [orders, setOrders] = useState<OrderType[]>([]);
    const addToCart = async (itemId: string, size: string) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                [size]: (prev[itemId]?.[size] || 0) + 1,
            },
        }));
    }
    const removeFromCart = async (itemId: string, size: string) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                [size]: (prev[itemId]?.[size] || 0) - 1,
            },
        }));
    }
    const updateQuantity = async (itemId: string, size: string, quantity: number) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                [size]: quantity,
            },
        }));
    }
    const getTotalCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                totalCount += cartItems[itemId][size];
            }
        }
        return totalCount;
    }
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product.id === itemId);
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0 && itemInfo) {
                    totalAmount += itemInfo.price * cartItems[itemId][size];
                }
            }
        }
        return totalAmount;
    }

    const placeOrder = (address: AddressType) => {
        const orderItems: OrderItemType[] = [];
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    const productInfo = products.find(p => p.id === itemId);
                    if (productInfo) {
                        orderItems.push({
                            ...productInfo,
                            size: size,
                            quantity: cartItems[itemId][size],
                            status: 'Order Placed',
                            paymentMethod: 'COD',
                            date: new Date().toLocaleDateString()
                        });
                    }
                }
            }
        }
        
        if (orderItems.length > 0) {
            setOrders((prev) => [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    items: orderItems,
                    address,
                    amount: getCartAmount() + delivery_fee,
                    date: new Date().toLocaleDateString()
                },
                ...prev
            ]);
            setCartItems({}); // clear cart
        }
    }

    useEffect(() => {
        console.log(cartItems, "cartItems");
    }, [cartItems])

    const contextValue = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalCartCount,
        getCartAmount,
        orders,
        placeOrder
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;



