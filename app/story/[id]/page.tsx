import { allStories } from "@/lib/stories"
import { notFound } from "next/navigation"

export default function StoryPage({ params }: { params: { id: string } }) {
  const storyId = parseInt(params.id)
  const story = allStories.find((s) => s.id === storyId)

  if (!story) return notFound()

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl text-amber-500 font-bold text-center mb-12">{story.title}</h1>
        <div
          className="prose prose-invert max-w-none text-lg leading-loose"
          dangerouslySetInnerHTML={{ __html: story.getContent() }}
        />
      </div>
    </main>
  )
}
