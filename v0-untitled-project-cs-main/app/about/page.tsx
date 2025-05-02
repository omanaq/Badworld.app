import Link from "next/link"
import { Home } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            <Home className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-center text-red-500">عن الكاتب</h1>
          <div className="w-6"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6 md:p-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-red-500 mb-4">رسالة إلى القارئ</h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                أعزف على أوتار الصمت وطرقاته بخفوت، أرسل لك هذه الكلمات كما ترنّ جريدة الصباح برقة في قلب يوم جديد. إن
                هذه الرواية كانت صرخة توائها في أعماق الهادئ داخلي، محاولةً للبحث عن معنى الضجيج الذي أعيشه يوميًا.
              </p>
              <p>
                كل فصل هنا هو مرآة لجروحي ودموعي وضحكاتي الخافتة، نقرات على جدار الوحدة، همسة على باب اليأس، قبل أن
                يتحول الألم إلى نصٍّ أشاركه. ربما تجد في هذه الصفحات صدىً من قصتي، أو مرآةً لوجوهك الخفية.
              </p>
              <p>
                كتبت هذه الكلمات لأن الرغوة التي تتطاير من ضجيج الحياة بحيطانها الصامتة أصبحت عبئًا لا يحتمل، ولا بد من
                تفريغها في مكانٍ ما؛ فأسقطها بريشة الخيال والنسيان. والعالم الرمادي الذي رسمته هنا، بنورٍ خافت وظل أعمق،
                كان محاولةً لوصف عالمٍ داخلي حول الصمت والضجيج إلى واقع أُجربه أمام عيني.
              </p>
              <p>
                لم يكن الغرض منها سوى قول الحقيقة التي عشتها: أن الصمت المرعب في بعض الأحيان أقوى من أي ضجيج، وأن
                الكتابة هي الصوت الذي يترنح بينهما، يمد اليد نحو التوازن. لقد عبرتُ في هذه الصفحات رحلةً شخصية، ولهيبًا
                داخليًا، وسيمفونيةً من الصمت، لأن كل ضجيجٍ عميق يجب أن يجد طريقه إلى الضوء ولو من خلال أوراق إحدى الروايات.
              </p>
              <p>
                أشكرك على رحلتك معي. إذا مررتَ أخي/أختي بليلٍ طويل مثلما فعلتُ، أتمنى أن تجد بعض الأمل في «أصوات الصمت»
                التي تركتها هنا. لكل من حمل هذه الأسئلة المقلقة حول ذاته، دون أن يعلم ذلك، كنا نكتب الرد على «لماذا كل
                هذا الضجيج» حينما بدأنا نسمع الكلمات التي لم نكن نجرؤ على النطق بها.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-red-500 mb-4">عن المشروع</h2>
            <p className="text-gray-300 mb-4">هذا المشروع هو جزء من مستودع GitHub الذي يمكن الوصول إليه عبر:</p>
            <a
              href="https://omanaq.github.io/very-upset/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 underline transition-colors"
            >
              https://omanaq.github.io/very-upset/
            </a>
          </section>
        </div>
      </main>
    </div>
  )
}
