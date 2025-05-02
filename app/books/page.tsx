import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const books = [
  {
    title: "الغرباء",
    author: "ألبير كامو",
    description: "رواية تتناول الاغتراب والعبثية والصراع الوجودي للإنسان في مواجهة عالم لا معنى له.",
    link: "https://omanaq.github.io/very-upset/",
  },
  {
    title: "موسم الهجرة إلى الشمال",
    author: "الطيب صالح",
    description: "رواية تتناول صراع الحضارات والهوية والاغتراب النفسي والثقافي.",
    link: "https://omanaq.github.io/very-upset/",
  },
  {
    title: "مدن الملح",
    author: "عبد الرحمن منيف",
    description: "خماسية روائية تصور التحولات الاجتماعية والنفسية في المجتمع العربي مع اكتشاف النفط.",
    link: "https://omanaq.github.io/very-upset/",
  },
  {
    title: "الطريق",
    author: "نجيب محفوظ",
    description: "رواية تتناول الصراع النفسي والفكري للإنسان في مواجهة الواقع والمجتمع.",
    link: "https://omanaq.github.io/very-upset/",
  },
  {
    title: "أولاد حارتنا",
    author: "نجيب محفوظ",
    description: "رواية رمزية تتناول صراع الإنسان مع السلطة والدين والعلم والمعرفة.",
    link: "https://omanaq.github.io/very-upset/",
  },
  {
    title: "اللص والكلاب",
    author: "نجيب محفوظ",
    description: "رواية تتناول الانتقام والخيانة والصراع النفسي للإنسان المهمش في المجتمع.",
    link: "https://omanaq.github.io/very-upset/",
  },
  {
    title: "الأيام",
    author: "طه حسين",
    description: "سيرة ذاتية تتناول معاناة الكاتب مع العمى والفقر والجهل في المجتمع المصري.",
    link: "https://omanaq.github.io/very-upset/",
  },
  {
    title: "ذاكرة الجسد",
    author: "أحلام مستغانمي",
    description: "رواية تتناول الحب والوطن والذاكرة والصراع النفسي للإنسان العربي.",
    link: "https://omanaq.github.io/very-upset/",
  },
  {
    title: "فوضى الحواس",
    author: "أحلام مستغانمي",
    description: "رواية تتناول الحب والكتابة والصراع النفسي للمرأة العربية.",
    link: "https://omanaq.github.io/very-upset/",
  },
]

export default function BooksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-black text-white">
      <div className="w-full max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-amber-500">الكتب الموصى بها</h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
            مجموعة من الكتب التي تتناول الصراع النفسي الداخلي، التمرد على الواقع، الانكسار الوجودي، والتجارب النفسية
            المؤلمة
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book, index) => (
            <Card key={index} className="bg-gray-900 border-amber-900">
              <CardHeader>
                <CardTitle className="text-amber-500">{book.title}</CardTitle>
                <CardDescription>{book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{book.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-950 w-full">
                  <Link href={book.link} target="_blank">
                    اقرأ المزيد
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
