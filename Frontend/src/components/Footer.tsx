import { assets } from "../assets/frontend_assets/assets";
import ContainerLayout from "../layouts/ContainerLayout";

const Footer = () => {
  return (
    <footer className="pt-20 border-t border-gray-200">
      <ContainerLayout>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm text-center sm:text-left">
          {/* Logo & Description */}
          <div className="flex flex-col items-center sm:items-start">
            <img src={assets.logo} className="mb-5 w-32" alt="Forever Logo" />
            <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
              Forever Store is your destination for the latest in global fashion trends. We provide high-quality apparel that empowers you to express your unique style with confidence.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li className="cursor-pointer hover:text-black transition-colors">Home</li>
              <li className="cursor-pointer hover:text-black transition-colors">About us</li>
              <li className="cursor-pointer hover:text-black transition-colors">Delivery</li>
              <li className="cursor-pointer hover:text-black transition-colors">Privacy policy</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li className="cursor-pointer hover:text-black transition-colors">+1-212-456-7890</li>
              <li className="cursor-pointer hover:text-black transition-colors">contact@foreveryou.com</li>
              <li className="cursor-pointer hover:text-black transition-colors">Instagram</li>
            </ul>
          </div>
        </div>


        {/* Copyright */}
        <div className="py-5 border-t border-gray-100 text-center text-sm text-gray-500">
          <p>Copyright 2026 @ forever.com - All Rights Reserved.</p>
        </div>
      </ContainerLayout>
    </footer>
  );
};

export default Footer;
