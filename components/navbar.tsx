"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-amber-900 py-4 px-4 md:px-8 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-amber-500">
          الأدب العميق
        </Link>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-amber-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/"
            className="text-white hover:text-amber-400 transition-colors"
          >
            الرئيسية
          </Link>
          <Link
            href="/stories"
            className="text-white hover:text-amber-400 transition-colors"
          >
            القصص
          </Link>
          <Link
            href="/books"
            className="text-white hover:text-amber-400 transition-colors"
          >
            الكتب
          </Link>
          <Link
            href="/quotes"
            className="text-white hover:text-amber-400 transition-colors"
          >
            اقتباسات
          </Link>
          <Button
            asChild
            variant="outline"
            className="border-amber-500 text-amber-500 hover:bg-amber-950"
          >
            <Link
              href="https://github.com/openaziz/Bad-world-.git"
              target="_blank"
            >
              الموقع الرئيسي
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-gray-900 p-4 rounded-lg">
          <Link
            href="/"
            className="text-white hover:text-amber-400 transition-colors py-2 border-b border-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            الرئيسية
          </Link>
          <Link
            href="/stories"
            className="text-white hover:text-amber-400 transition-colors py-2 border-b border-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            القصص
          </Link>
          <Link
            href="/books"
            className="text-white hover:text-amber-400 transition-colors py-2 border-b border-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            الكتب
          </Link>
          <Link
            href="/quotes"
            className="text-white hover:text-amber-400 transition-colors py-2 border-b border-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            اقتباسات
          </Link>
          <Button
            asChild
            variant="outline"
            className="border-amber-500 text-amber-500 hover:bg-amber-950"
          >
            <Link
              href="https://github.com/openaziz/Bad-world-.git"
              target="_blank"
              onClick={() => setIsMenuOpen(false)}
            >
              الموقع الرئيسي
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
