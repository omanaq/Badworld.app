import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-br from-gray-900 to-black text-gray-100">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-red-500 mb-6">لماذا كل هذا الضجيج؟</h1>

        <div className="text-xl md:text-2xl mb-12 text-gray-300">
          <p className="mb-4">هل شعرت يومًا أنك محطمًا؟</p>
          <p className="italic text-gray-400">
            ❝ الضجيج في رأسي لا ينقطع، وتلاحقني الأسئلة في كل لحظة... هل سأعود يومًا إلى صمتِ السكينة؟ ❞
          </p>
        </div>

        <div className="flex flex-col space-y-4 items-center">
          <Link
            href="/novel"
            className="group flex items-center justify-center space-x-2 rtl:space-x-reverse bg-red-900/30 hover:bg-red-900/50 text-white px-8 py-4 rounded-md transition-all duration-300 border border-red-800/50 hover:border-red-500"
          >
            <span className="text-xl">ابدأ القراءة</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>

          <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
            عن الكاتب
          </Link>
        </div>
      </div>
    </main>
  )
}
