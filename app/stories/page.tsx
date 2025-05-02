"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { allImages, storyTitles } from "@/lib/stories"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function StoriesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredStories, setFilteredStories] = useState<{ id: number; title: string; image: string }[]>([])

  useEffect(() => {
    // إنشاء قائمة القصص
    const stories = allImages.map((image, index) => ({
      id: index + 1,
      title: storyTitles[index] || `قصة ${index + 1}`,
      image,
    }))

    // تطبيق البحث إذا كان هناك مصطلح بحث
    if (searchTerm) {
      setFilteredStories(stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase())))
    } else {
      setFilteredStories(stories)
    }

    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-500">مجموعة القصص</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            مجموعة من القصص التي تعبر عن الصراع النفسي الداخلي، التمرد على الواقع، الانكسار الوجودي، والتجارب النفسية
            المؤلمة
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 relative"
        >
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن قصة..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-10 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 * (index % 8) }}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-amber-900 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/20"
            >
              <Link href={`/story/${story.id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={`/${story.image}`}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 text-amber-500">{story.title}</h2>
                  <p className="text-gray-400 text-sm mb-4">قصة {story.id}</p>
                  <Button variant="outline" className="w-full border-amber-500 text-amber-500 hover:bg-amber-950/20">
                    اقرأ القصة
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 text-center"
        >
          <Link href="/">
            <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-950/20">
              العودة للصفحة الرئيسية
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
