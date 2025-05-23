"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getStory, getTotalStories } from "@/lib/stories";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Home, Loader2 } from "lucide-react";
import { generateStory } from "@/lib/story-generator";
import { useReadingProgress } from "@/hooks/useReadingProgress";

export default function StoryPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [storyContent, setStoryContent] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const readingProgress = useReadingProgress();

  const id = useMemo(() => Number(params.id as string), [params.id]);
  const story = useMemo(() => getStory(id), [id]);
  const totalStories = useMemo(getTotalStories, []);

  useEffect(() => {
    if (!story) {
      router.replace("/not-found");
      return;
    }

    const loadContent = async () => {
      setIsLoaded(false);
      try {
        const generatedStory = await generateStory(id, story.title);
        setStoryContent(generatedStory.content);
      } catch (error) {
        console.error("Failed to generate story:", error);
        router.replace("/error");
      } finally {
        setIsLoaded(true);
      }
    };

    loadContent();

    return () => {
      setIsLoaded(false);
    };
  }, [id, router, story]);

  if (!story) {
    return null;
  }

  const navigationButtons = (
    <div className="flex justify-between gap-4">
      {story.prevId ? (
        <Link href={`/story/${story.prevId}`} passHref legacyBehavior>
          <Button
            variant="outline"
            className="border-amber-500 text-amber-500 hover:bg-amber-950/20 flex-1 sm:flex-initial"
            aria-label="القصة السابقة"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            القصة السابقة
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {story.nextId ? (
        <Link href={`/story/${story.nextId}`} passHref legacyBehavior>
          <Button
            variant="outline"
            className="border-amber-500 text-amber-500 hover:bg-amber-950/20 flex-1 sm:flex-initial"
            aria-label="القصة التالية"
          >
            القصة التالية
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Link href="/" passHref legacyBehavior>
          <Button
            variant="outline"
            className="border-amber-500 text-amber-500 hover:bg-amber-950/20 flex-1 sm:flex-initial"
            aria-label="العودة للبداية"
          >
            العودة للبداية
            <Home className="mr-2 h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div
        className="fixed top-0 left-0 h-1 bg-amber-500 z-50"
        style={{ width: `${readingProgress}%` }}
      />

      <div className="container mx-auto px-4 md:px-6 py-8 max-w-4xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <Link href="/" passHref legacyBehavior>
            <Button
              variant="ghost"
              className="text-amber-500 hover:text-amber-400 hover:bg-amber-950/20"
              aria-label="الرئيسية"
            >
              <Home className="mr-2 h-4 w-4" />
              الرئيسية
            </Button>
          </Link>
          <div className="text-gray-400 text-sm sm:text-base">
            قصة {id} من {totalStories}
          </div>
        </motion.header>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-amber-500 text-center"
        >
          {story.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.95 }}
          transition={{ duration: 0.7 }}
          className="relative aspect-video mb-10 overflow-hidden rounded-lg bg-gray-900"
        >
          <Image
            src={`/images/${story.image}`}
            alt={story.title}
            fill
            className="object-cover transition-opacity duration-500"
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoadingComplete={() => setImageLoaded(true)}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoaded ? (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: storyContent }}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <Loader2 className="h-12 w-12 animate-spin text-amber-500" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          {navigationButtons}
        </motion.footer>
      </div>
    </div>
  );
}
