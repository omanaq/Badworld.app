// ./app/quotes/page.tsx

import { Card, CardContent } from "@/components/ui/card"

const quotes = [
  {
    text: "في لحظات الانكسار الوجودي، نكتشف حقيقة أنفسنا بعيداً عن الأقنعة التي نرتديها للآخرين.",
    source: "من كتاب الغرباء",
  },
  {
    text: "السخرية السوداء هي الملاذ الأخير للروح المتعبة، حين تعجز الدموع عن التعبير.",
    source: "من كتاب موسم الهجرة إلى الشمال",
  },
  {
    text: "الألم هو المعلم الأول للإنسان، يكشف له حقائق لم يكن ليدركها في حالة الراحة والسعادة.",
    source: "من كتاب الأيام",
  },
  {
    text: "الكتابة هي محاولة يائسة للتصالح مع الذات، وفي الوقت نفسه هي تمرد على الواقع الذي لا نستطيع تغييره.",
    source: "من كتاب ذاكرة الجسد",
  },
  {
    text: "الوحدة ليست غياب الآخرين، بل غياب المعنى في وجودهم.",
    source: "من كتاب فوضى الحواس",
  },
  {
    text: "الصمت أحياناً هو أبلغ صرخة في وجه عالم لا يريد أن يسمع.",
    source: "من كتاب اللص والكلاب",
  },
  {
    text: "الحرية هي القدرة على قول لا، حتى حين يكلفك ذلك حياتك.",
    source: "من كتاب أولاد حارتنا",
  },
  {
    text: "الذكريات سجن نبنيه بأيدينا، ثم نشكو من ضيقه.",
    source: "من كتاب مدن الملح",
  },
  {
    text: "الحب ليس سوى وهم نخلقه لنهرب من وحشة الوجود.",
    source: "من كتاب فوضى الحواس",
  },
  {
    text: "الكتابة هي الانتقام الأخير من واقع لا نستطيع تغييره.",
    source: "من كتاب ذاكرة الجسد",
  },
  {
    text: "الموت ليس نهاية الحياة، بل نهاية الوهم الذي نعيشه.",
    source: "من كتاب الغرباء",
  },
  {
    text: "الحقيقة مثل الشمس، يمكنك أن تحجبها لفترة، لكنها لا تغيب.",
    source: "من كتاب الطريق",
  },
]

export default function QuotesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-12 bg-black text-white">
      <section className="w-full max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-amber-500">
          اقتباسات أدبية
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-300">
          مجموعة من الاقتباسات التي تعبر عن الصراع النفسي الداخلي، التمرد على الواقع، والتجارب الوجدانية المؤلمة.
        </p>
      </section>

      <section className="grid gap-6 w-full max-w-5xl md:grid-cols-2">
        {quotes.map((quote, index) => (
          <Card key={index} className="bg-gray-900 border border-amber-800 rounded-2xl shadow-lg transition hover:border-amber-600">
            <CardContent className="p-6 space-y-4">
              <p className="text-lg leading-relaxed text-gray-100">"{quote.text}"</p>
              <p className="text-amber-500 text-sm text-right">{quote.source}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
