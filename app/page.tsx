// ./app/page.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 z-0" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-center z-10 px-4 max-w-4xl w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-amber-500 mb-16 text-lg md:text-xl"
        >
          هل جاهز لدخول عالم لا نهاية له؟
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="text-6xl md:text-8xl font-bold mb-8 text-gray-400 leading-tight"
        >
          لماذا
          <br />
          كل
          <br />
          هذا
          <br />
          الضجيج؟
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="text-xl md:text-2xl mb-16 text-gray-500"
        >
          رواية من تأليف عبدالعزيز الحمداني
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-12"
        >
          <Button
            asChild
            className="bg-transparent hover:bg-amber-900/20 text-amber-500 border-2 border-amber-500 text-xl px-12 py-4 rounded-full transition duration-300"
          >
            <Link href="/story/1">ابدأ</Link>
          </Button>
        </motion.div>
      </motion.div>
    </main>
  )
}
