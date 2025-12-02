import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Logo + Description */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-900 rounded-sm flex items-center justify-center">
                {/* You can replace this with actual logo */}
                <span className="text-white font-bold text-lg">
                  CA
                </span>
              </div>
              <h2 className="text-2xl font-bold text-blue-700">
                COLLECTOR <br />
                AUCTION <br />
                <span className="text-blue-700">HUB</span>
              </h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mt-4 max-w-xs">
              Australia's complete classic car auction directory. Every car,
              every auction, one place.
            </p>
          </div>

          {/* Browse */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-5 text-lg">Browse</h3>
            <ul className="space-y-3 text-gray-500">
              <li>
                <Link href="/" className="hover:text-blue-600 transition">
                  All Listings
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className="hover:text-blue-600 transition"
                >
                  Auction Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/no-reserve"
                  className="hover:text-blue-600 transition"
                >
                  No Reserve Cars
                </Link>
              </li>
              <li>
                <Link href="/latest" className="hover:text-blue-600 transition">
                  Latest Additions
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-5 text-lg">
              Resources
            </h3>
            <ul className="space-y-3 text-gray-500">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-blue-600 transition"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/auction-houses"
                  className="hover:text-blue-600 transition"
                >
                  Auction Houses
                </Link>
              </li>
              <li>
                <Link
                  href="/price-guide"
                  className="hover:text-blue-600 transition"
                >
                  Price Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-5 text-lg">
              Contact
            </h3>
            <ul className="space-y-3 text-gray-500">
              <li>
                <a
                  href="mailto:info@ausclassicauctions.com.au"
                  className="hover:text-blue-600 transition"
                >
                  info@ausclassicauctions.com.au
                </a>
              </li>
              <li>
                <a
                  href="tel:+61212345678"
                  className="hover:text-blue-600 transition"
                >
                  +61 2 1234 5678
                </a>
              </li>
              <li className="mt-4">Sydney, Australia</li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
