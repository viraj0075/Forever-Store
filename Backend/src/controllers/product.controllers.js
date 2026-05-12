import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { prisma } from "../config/db.js";
import { uploadToCloudinary } from "../config/uploadToCloudinary.js";
import { deleteFromCloudinary } from "../config/deleteCloudinaryImage.js";

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const images = Object.values(req.files).flat().filter(Boolean);
        console.log(images);

        if (images.length === 0) {
            throw new ApiError(400, "Please provide at least one image")
        }

        let imagesUrls = await Promise.all(images.map((item) => {
            return uploadToCloudinary(item.path, "products")
        }));

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: typeof sizes === "string" ? JSON.parse(sizes) : sizes,
            bestseller:
                typeof bestseller === "string"
                    ? bestseller === "true"
                    : Boolean(bestseller),
            image: imagesUrls,
        };
        console.log("imagesUrls", imagesUrls);
        const product = await prisma.products.create({
            data: productData,
        });
        return res.status(201).json(new ApiResponse(201, product, "Product created successfully"))



    } catch (err) {
        res.status(500).json(new ApiError(400, err.message))
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new ApiError(400, "Product id is required.")
        }
        const product = await prisma.products.findUnique({
            where: {
                id
            }
        });
        if (!product) {
            throw new ApiError(404, "Product not found")
        }
        return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"))
    }
    catch (err) {
        res.status(500).json(new ApiError(400, err.message))
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.products.findMany();
        console.log("products", products);


        return res
            .status(200)
            .json(new ApiResponse(200, products, "Products fetched successfully"));
    } catch (err) {
        return res
            .status(500)
            .json(new ApiError(500, err.message || "Something went wrong"));
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Validate product ID
        if (!id) {
            return res.status(400).json(
                new ApiError(
                    400,
                    "Product id is required."
                )
            );
        }

        // 2. Find product first
        const product = await prisma.products.findUnique({
            where: {
                id
            },
        });

        console.log("product", product);


        // 3. Check if product exists
        if (!product) {
            return res.status(404).json(
                new ApiError(
                    404,
                    "Product not found"
                )
            );
        }

        // 4. Delete all product images from Cloudinary
        // Assumes product.image is a String[] of image URLs
        if (product.image && product.image.length > 0) {
            await Promise.all(
                product.image.map((imageUrl) =>
                    deleteFromCloudinary(imageUrl)
                )
            );
        }

        // 5. Delete product from database
        const deletedProduct = await prisma.products.delete({
            where: {
                id
            },
        });

        // 6. Return success response
        return res.status(200).json(
            new ApiResponse(
                200,
                deletedProduct,
                "Product deleted successfully"
            )
        );
    } catch (err) {
        return res.status(err.statusCode || 500).json(
            new ApiError(
                err.statusCode || 500,
                err.message || "Something went wrong"
            )
        );
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(400, "Product id is required");
        }

        // 1. Find existing product
        const existingProduct = await prisma.products.findUnique({
            where: {
                id
            },
        });

        if (!existingProduct) {
            throw new ApiError(404, "Product not found.");
        }

        // 2. Extract body data
        let {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller,
        } = req.body;

        // Parse sizes if sent as JSON string
        if (typeof sizes === "string") {
            sizes = JSON.parse(sizes);
        }

        // Parse bestseller if sent as string
        if (typeof bestseller === "string") {
            bestseller = bestseller === "true";
        }

        // 3. Handle uploaded images (optional)
        const uploadedFiles = Object.values(req.files || {})
            .flat()
            .filter(Boolean);

        let imageUrls = existingProduct.image;

        // If new images are uploaded, replace old images
        if (uploadedFiles.length > 0) {
            // Delete old images from Cloudinary
            if (existingProduct.image?.length > 0) {
                await Promise.all(
                    existingProduct.image.map((url) =>
                        deleteFromCloudinary(url)
                    )
                );
            }

            // Upload new images
            const uploadedResults = await Promise.all(
                uploadedFiles.map((file) =>
                    uploadToCloudinary(file.path, "products")
                )
            );

            imageUrls = uploadedResults;
        }

        // 4. Update product
        const updatedProduct = await prisma.products.update({
            where: {
                id
            },
            data: {
                name: name ?? existingProduct.name,
                description:
                    description ?? existingProduct.description,
                price:
                    price !== undefined
                        ? Number(price)
                        : existingProduct.price,
                category: category ?? existingProduct.category,
                subCategory:
                    subCategory ?? existingProduct.subCategory,
                sizes: sizes ?? existingProduct.sizes,
                bestseller:
                    bestseller !== undefined
                        ? bestseller
                        : existingProduct.bestseller,
                image: imageUrls,
            },
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedProduct,
                "Product updated successfully"
            )
        );
    } catch (err) {
        return res.status(err.statusCode || 500).json(
            new ApiError(
                err.statusCode || 500,
                err.message || "Something went wrong"
            )
        );
    }
};