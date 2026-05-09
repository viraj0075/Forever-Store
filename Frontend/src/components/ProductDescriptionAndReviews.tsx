import { assets } from '../assets/frontend_assets/assets';

interface ProductDescriptionAndReviewsProps {
  activeTab: 'description' | 'reviews';
  setActiveTab: (tab: 'description' | 'reviews') => void;
}

export default function ProductDescriptionAndReviews({ activeTab, setActiveTab }: ProductDescriptionAndReviewsProps) {

  return (
    <div className='mt-12 sm:mt-20'>
      <div className='flex items-end'>
        <button
          onClick={() => setActiveTab('description')}
          className={`px-6 py-4 text-sm font-bold border-t-2 border-l-2 border-r-2 rounded-t-xl transition-all duration-300 cursor-pointer ${activeTab === 'description'
            ? 'border-black bg-white mb-[-2px] z-10'
            : 'border-transparent bg-gray-50 text-gray-500 hover:text-black'
            }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-6 py-4 text-sm font-bold border-t-2 border-l-2 border-r-2 rounded-t-xl transition-all duration-300 cursor-pointer ${activeTab === 'reviews'
            ? 'border-black bg-white mb-[-2px] z-10'
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
                <img src={assets.star_icon} alt="Star icon" className="w-3" loading='lazy' />
                <img src={assets.star_icon} alt="Star icon" className="w-3" loading='lazy' />
                <img src={assets.star_icon} alt="Star icon" className="w-3" loading='lazy' />
                <img src={assets.star_icon} alt="Star icon" className="w-3" loading='lazy' />
                <img src={assets.star_dull_icon} alt="Star icon" className="w-3" loading='lazy' />
              </div>
              <p className='font-bold text-gray-800'>Very comfortable</p>
              <p className='text-xs'>Soft material, feels very premium.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
