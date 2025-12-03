"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Cars", href: "/browse" },
    { name: "Auction Calendar", href: "/auctionCalender" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      {/* Top thin line */}
      <div className="h-px bg-gray-300 w-full" />

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-900 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg">CA</span>
              </div>
              <div className="leading-tight">
                <span className="text-xl font-black text-blue-700">
                  COLLECTOR
                </span>
                <br />
                <span className="text-xl font-black text-blue-700">
                  AUCTION
                </span>
                <br />
                <span className="text-xl font-black text-blue-700">HUB</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 font-medium transition text-base uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Sign In Button - Desktop */}
            <div className="hidden lg:block">
              <Link
                href="/siglnin"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition shadow-md"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-700 hover:text-gray-900"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-6 py-6 space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 hover:text-gray-900 font-medium text-lg uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/signin"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 transition"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
