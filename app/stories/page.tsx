import Link from "next/link"
import Image from "next/image"
import { allStories } from "@/lib/stories"

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-amber-500 mb-12">
          فصول الرواية
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allStories.map((story) => (
            <Link
              key={story.id}
              href={`/story/${story.id}`}
              className="group border border-amber-900 rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative w-full h-64">
                <Image
                  src={story.image}
                  alt={story.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-gray-900 text-center">
                <h2 className="text-xl font-semibold text-amber-400">{story.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
