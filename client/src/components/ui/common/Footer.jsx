// import { Button } from "@/components/ui/button";
// import { Separator } from "@radix-ui/react-dropdown-menu";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-6">
//       <div className="max-w-6xl mx-auto text-center">
//         <p className="text-sm mb-3">© {new Date().getFullYear()} Company Name. All Rights Reserved.</p>
        
//         <Separator className="my-4" />
        
//         <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
//           <Button variant="link" className="text-gray-300 hover:text-white">
//             Privacy Policy
//           </Button>
//           <Button variant="link" className="text-gray-300 hover:text-white">
//             Terms of Service
//           </Button>
//           <Button variant="link" className="text-gray-300 hover:text-white">
//             Contact Us
//           </Button>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company Name</h3>
          <p className="text-gray-400">
            Building a better future, one step at a time. Delivering solutions for every challenge.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">
            Subscribe to our newsletter to get the latest updates.
          </p>
          <div className="flex">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-white border-none"
            />
            <Button className="ml-2">Subscribe</Button>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-8 pt-4">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
