import logo from "@/app/logo-white.svg";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              <Image src={logo} alt="" className="w-20 h-auto" />
            </h3>
            <p className="text-gray-400">
              Your one-stop shop for all your nail care needs.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook mr-2"></i>Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram mr-2"></i>Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter mr-2"></i>Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-pinterest mr-2"></i>Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            &copy; 2024 Gạo Nails. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
