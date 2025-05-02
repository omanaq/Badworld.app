"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { getStory, getTotalStories } from "@/lib/stories"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Home } from "lucide-react"
import { generateStoryContent } from "@/lib/story-generator"

export default function StoryPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [storyContent, setStoryContent] = useState("")

  const id = Number.parseInt(params.id as string)
  const story = getStory(id)
  const totalStories = getTotalStories()

  useEffect(() => {
    if (!story) {
      router.push("/")
      return
    }

    setIsLoaded(false)
    // استخدام مولد القصص لإنشاء محتوى طويل
    const content = generateStoryContent(id, story.title, null)
    setStoryContent(content)

    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [id, router, story])

  if (!story) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-between items-center"
        >
          <Link href="/">
            <Button variant="ghost" className="text-amber-500 hover:text-amber-400 hover:bg-amber-950/20">
              <Home className="mr-2 h-4 w-4" />
              الرئيسية
            </Button>
          </Link>
          <div className="text-gray-400">
            قصة {id} من {totalStories}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-amber-500 text-center"
        >
          {story.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative aspect-video mb-10 overflow-hidden rounded-lg"
        >
          <Image src={`/${null}`} alt={story.title} fill className="object-cover image-fade-in" priority />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="prose prose-lg prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: storyContent }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex justify-between"
        >
          {story.prevId ? (
            <Link href={`/story/${story.prevId}`}>
              <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-950/20">
                <ArrowRight className="ml-2 h-4 w-4" />
                القصة السابقة
              </Button>
            </Link>
          ) : (
            <div></div>
          )}

          {story.nextId ? (
            <Link href={`/story/${story.nextId}`}>
              <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-950/20">
                القصة التالية
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Link href="/">
              <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-950/20">
                العودة للبداية
                <Home className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  )
}
