import { ShopContext } from '../context/ShopContext';
import { useContext, useEffect, useState } from 'react';
import type { ProductType } from '../Types/ProductType';
import ProductCardSkeleton from './ProductCardSkeleton';
import ProductCard from './ProductCard';
import Title from './Title';
import ContainerLayout from '../layouts/ContainerLayout';
import { assets } from '../assets/frontend_assets/assets';

const ProductWithFilter = () => {
    const { products } = useContext(ShopContext)!;

    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState<ProductType[]>([]);
    const [category, setCategory] = useState<string[]>([]);
    const [subCategory, setSubCategory] = useState<string[]>([]);
    const [sortType, setSortType] = useState('relavent');
    const [loading, setLoading] = useState(true);

    const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    };

    const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    };

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }

        setFilterProducts(productsCopy);
    };

    const sortProduct = () => {
        let fpCopy = filterProducts.slice();

        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
                break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
                break;
            default:
                applyFilter();
                break;
        }
    };

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, products]);

    useEffect(() => {
        sortProduct();
    }, [sortType]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ContainerLayout>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">

                {/* Filter Options (Left Side) */}
                <div className="min-w-60 sm:sticky sm:top-26 self-start h-fit">
                    <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2 uppercase tracking-widest font-semibold text-gray-800">
                        Filters
                        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''} transition-transform`} src={assets.dropdown_icon} alt="" />
                    </p>

                    {/* Category Filter */}
                    <div className={`border border-gray-300 pl-5 py-4 mt-6 ${showFilter ? '' : 'hidden'} sm:block bg-white rounded-sm shadow-sm`}>
                        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-900 border-b pb-2 mr-5">Categories</p>
                        <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
                            <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                                <input className="w-4 h-4 accent-black" type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                                <input className="w-4 h-4 accent-black" type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                                <input className="w-4 h-4 accent-black" type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
                            </label>
                        </div>
                    </div>

                    {/* SubCategory Filter */}
                    <div className={`border border-gray-300 pl-5 py-4 my-5 ${showFilter ? '' : 'hidden'} sm:block bg-white rounded-sm shadow-sm`}>
                        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-900 border-b pb-2 mr-5">Type</p>
                        <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
                            <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                                <input className="w-4 h-4 accent-black" type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                                <input className="w-4 h-4 accent-black" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                                <input className="w-4 h-4 accent-black" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right Side (Product List) */}
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-base sm:text-2xl mb-6 gap-4">
                        <Title text1={'ALL'} text2={'COLLECTIONS'} />

                        {/* Product Sort */}
                        <div className="relative w-full sm:w-auto">
                            <select
                                onChange={(e) => setSortType(e.target.value)}
                                className="w-full sm:w-auto border border-gray-300 text-sm px-4 py-2.5 outline-none rounded-md bg-white shadow-sm hover:border-gray-400 transition-colors appearance-none pr-10"
                            >
                                <option value="relavent">Sort by: Relavent</option>
                                <option value="low-high">Sort by: Price: Low to High</option>
                                <option value="high-low">Sort by: Price: High to Low</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <img src={assets.dropdown_icon} className="h-2.5 opacity-60" alt="" />
                            </div>
                        </div>
                    </div>

                    {/* Products Display Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8">
                        {loading
                            ? Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)
                            : filterProducts.length > 0 ? (
                                filterProducts.map((item, index) => (
                                    <ProductCard key={index} name={item.name} id={item.id} price={item.price} image={item.image} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center text-gray-500">
                                    <p className="text-lg">No products found matching your filters.</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </ContainerLayout>
    );
};

export default ProductWithFilter;
