import { prisma } from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createOrder = async (req, res) => {
    try {

        const { clerkId, items, address } = req.body;

        const productIds = items.map(
            (item) => item.productId
        );

        const products = await prisma.products.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
        });

        let totalAmount = 0;

        const orderItems = items.map((item) => {

            const product = products.find(
                (p) => p.id === item.productId
            );

            if (!product) {
                throw new Error("Product not found");
            }

            totalAmount +=
                Number(product.price) * item.quantity;

            return {
                productId: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: item.quantity,
            };
        });

        const order = await prisma.$transaction(
            async (tx) => {

                const createdOrder =
                    await tx.orders.create({
                        data: {
                            clerkId,
                            items: orderItems,
                            address,
                            totalAmount,
                        },
                    });

                await tx.users.update({
                    where: {
                        clerk_user_id: clerkId,
                    },
                    data: {
                        cartData: null,
                    },
                });

                return createdOrder;
            }
        );

        return res.status(201).json(
            new ApiResponse(
                201,
                order,
                "Order created successfully"
            )
        );

    } catch (err) {

        return res.status(500).json(
            new ApiError(500, err.message)
        );

    }
};

export const listAllOrder = async (req, res) => {
    try {

        const orders = await prisma.orders.findMany();
        return res.status(200).json(new ApiResponse(200, orders, "Orders fetched successfully"));

    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message));
    }
}

export const deleteOrders = async (req, res) => {
    try {

        const { orderId } = req.params;
        const isOrder = await prisma.orders.findUnique({
            where: {
                orderId,
            },
        });

        if (!isOrder) {
            throw new ApiError(404, "Order not found");
        }
        const order = await prisma.orders.delete({
            where: {
                orderId,
            },
        });

        return res.status(200).json(new ApiResponse(200, order, "Order deleted successfully"));

    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message));
    }
}


