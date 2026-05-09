import { useParams, createFileRoute } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { assets } from '../../assets/frontend_assets/assets';
import RelatedProducts from '../../components/RelatedProducts';
import ContainerLayout from '../../layouts/ContainerLayout';
import type { ProductType } from '../../Types/ProductType';

export const Route = createFileRoute('/product/$productid')({
  component: Product,
})

function Product() {
  const { productid } = useParams({ from: '/product/$productid' });
  const { products, currency } = useContext(ShopContext)!;
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  const fetchProductData = async () => {
    const foundProduct = products.find((item) => item.id === productid);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
  }, [productid, products]);

  return productData ? (
    <ContainerLayout>
      <div className='pt-5 sm:pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* Product Data */}
        <div className='flex gap-6 sm:gap-12 flex-col sm:flex-row'>

          {/* Product Images */}
          {/* Product Images */}
          <div className="flex flex-col-reverse sm:flex-row gap-4 flex-1">
            {/* Thumbnail Column */}
            <div className="flex sm:flex-col gap-3 sm:w-24 w-full overflow-x-auto sm:overflow-visible scrollbar-hide">
              {productData.image.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setImage(item)}
                  className={`shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${image === item
                      ? "border-black shadow-md"
                      : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                  <img
                    src={item}
                    alt={productData.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 max-w-3xl">
              <img
                src={image}
                alt={productData.name}
                className="w-full h-auto rounded-2xl object-cover shadow-xl"
              />
            </div>
          </div>
          {/* Product Info */}
          <div className='flex-1'>
            <h1 className='font-bold text-2xl sm:text-3xl mt-2 text-gray-800 tracking-tight'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-3'>
              <div className="flex gap-0.5 items-center">
                {[...Array(4)].map((_, i) => (
                  <img key={i} src={assets.star_icon} alt="Star icon" className="w-3 sm:w-3.5" loading='lazy' />
                ))}
                <img src={assets.star_dull_icon} alt="Star icon" className="w-3 sm:w-3.5" loading='lazy' />
              </div>
              <p className='pl-2 text-xs sm:text-sm text-gray-500 cursor-pointer hover:text-black transition-colors' onClick={() => setActiveTab('reviews')}>(122 reviews)</p>
            </div>
            <p className='mt-4 sm:mt-6 text-3xl sm:text-4xl font-extrabold text-gray-900'>{currency}{productData.price}</p>
            <p className='mt-4 sm:mt-6 text-sm sm:text-base text-gray-600 md:w-4/5 leading-relaxed'>{productData.description}</p>

            <div className='flex flex-col gap-4 my-6 sm:my-8'>
              <p className='font-bold text-base sm:text-lg text-gray-800'>Select Size</p>
              <div className='flex gap-2 sm:gap-3 flex-wrap'>
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    key={index}
                    className={`min-w-[44px] px-4 py-2 sm:px-6 sm:py-3 rounded-xl border-2 font-semibold transition-all duration-300 active:scale-95 cursor-pointer ${item === size
                      ? 'border-black bg-black text-white shadow-lg'
                      : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-300'
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button className='w-full sm:w-auto bg-black text-white px-12 py-4 text-xs sm:text-sm font-bold active:bg-gray-800 transition-all rounded-xl shadow-xl hover:shadow-2xl uppercase tracking-widest hover:-translate-y-1 cursor-pointer'>
              Add to Cart
            </button>

            <hr className='mt-8 sm:mt-10 sm:w-4/5 border-gray-100' />
            <div className='text-xs sm:text-sm text-gray-500 mt-6 flex flex-col gap-3 tracking-wide bg-gray-50/50 p-4 rounded-xl border border-gray-100 sm:w-4/5'>
              <p className="flex items-center gap-2">✨ <span className="font-medium text-gray-700">100% Original product.</span></p>
              <p className="flex items-center gap-2">🚚 <span className="font-medium text-gray-700">Cash on delivery is available.</span></p>
              <p className="flex items-center gap-2">🔄 <span className="font-medium text-gray-700">Easy 7-day return policy.</span></p>
            </div>
          </div>
        </div>

        {/* Description & Review Section */}
        <div className='mt-12 sm:mt-20'>
          <div className='flex items-end'>
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-4 text-sm font-bold border-t-2 border-l-2 border-r-2 rounded-t-xl transition-all duration-300 cursor-pointer ${activeTab === 'description'
                ? 'border-black bg-white -mb-[2px] z-10'
                : 'border-transparent bg-gray-50 text-gray-500 hover:text-black'
                }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 text-sm font-bold border-t-2 border-l-2 border-r-2 rounded-t-xl transition-all duration-300 cursor-pointer ${activeTab === 'reviews'
                ? 'border-black bg-white -mb-[2px] z-10'
                : 'border-transparent bg-gray-50 text-gray-500 hover:text-black'
                }`}
            >
              Reviews (122)
            </button>
          </div>

          <div className='flex flex-col gap-6 border-2 p-5 sm:p-10 text-xs sm:text-sm text-gray-600 leading-relaxed sm:leading-loose bg-white rounded-b-2xl rounded-tr-2xl shadow-sm min-h-[200px]'>
            {activeTab === 'description' ? (
              <>
                <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
              </>
            ) : (
              <div className='flex flex-col gap-4'>
                <p className='italic text-gray-400'>Customer Reviews (122)</p>
                <div className='border-b pb-4'>
                  <div className='flex gap-1 mb-1'>
                    <img src={assets.star_icon} alt="Star icon" className="w-3" loading='lazy' />
                    <img src={assets.star_icon} alt="Star icon" className="w-3" loading='lazy' />
                    <img src={assets.star_icon} alt="Star icon" className="w-3" loading='lazy' />
                    <img src={assets.star_icon} alt="Star icon" className="w-3" loading='lazy' />
                    <img src={assets.star_icon} alt="Star icon" className="w-3" loading='lazy' />
                  </div>
                  <p className='font-bold text-gray-800'>Quality is amazing!</p>
                  <p className='text-xs'>Great fabric and perfect fit. Will buy again.</p>
                </div>
                <div className='border-b pb-4'>
                  <div className='flex gap-1 mb-1'>
                    <img src={assets.star_icon} alt="Star icon" className="w-3" />
                    <img src={assets.star_icon} alt="Star icon" className="w-3" />
                    <img src={assets.star_icon} alt="Star icon" className="w-3" />
                    <img src={assets.star_icon} alt="Star icon" className="w-3" />
                    <img src={assets.star_dull_icon} alt="Star icon" className="w-3" />
                  </div>
                  <p className='font-bold text-gray-800'>Very comfortable</p>
                  <p className='text-xs'>Soft material, feels very premium.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 sm:mt-24">
          <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
      </div>
    </ContainerLayout>
  ) : <div className='opacity-0'></div>
}
