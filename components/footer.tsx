import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-amber-900 py-8 px-4 md:px-8 text-center">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-500">
              الأدب العميق
            </h3>
            <p className="text-gray-400">
              مساحة للتعبير عن الصراع النفسي الداخلي، التمرد على الواقع،
              والتجارب الوجدانية المؤلمة
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-500">
              روابط سريعة
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/stories"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  القصص
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  الكتب
                </Link>
              </li>
              <li>
                <Link
                  href="/quotes"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  اقتباسات
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-500">
              تواصل معنا
            </h3>
            <Link
              href="https://github.com/openaziz/Bad-world-.git"
              target="_blank"
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              زيارة الموقع الرئيسي
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-800 text-gray-500">
          <p>جميع الحقوق محفوظة © {new Date().getFullYear()} - الأدب العميق</p>
          <p className="mt-2">
            <Link
              href="https://github.com/openaziz/Bad-world-.git"
              target="_blank"
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              github.com/openaziz/Bad-world-.git
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
