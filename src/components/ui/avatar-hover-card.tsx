"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Zap, MessageCircle } from "lucide-react";
import { useState } from "react";

export interface AvatarHoverCardProps {
  name: string;
  username?: string;
  description?: string;
  onMessage?: () => void;
  className?: string;
}

export function AvatarHoverCard({
  name,
  username,
  description,
  onMessage,
  className,
}: AvatarHoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar circle */}
      <motion.div
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 cursor-pointer"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <Zap className="h-7 w-7 text-yellow-400" fill="currentColor" strokeWidth={0} />
      </motion.div>

      {/* Expanded card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-zinc-800 bg-zinc-900/95 shadow-2xl shadow-black/60 backdrop-blur-md overflow-hidden"
          >
            {/* Top accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

            <div className="p-4">
              {/* Avatar + name row */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700">
                  <Zap className="h-5 w-5 text-yellow-400" fill="currentColor" strokeWidth={0} />
                </div>
                <div className="min-w-0">
                  <motion.p
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 }}
                    className="text-sm font-semibold text-white truncate"
                  >
                    {name}
                  </motion.p>
                  {username && (
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-xs text-zinc-500 truncate"
                    >
                      {username}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Description */}
              {description && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 }}
                  className="mt-3 text-xs text-zinc-400 leading-relaxed"
                >
                  {description}
                </motion.p>
              )}

              {/* Message button */}
              <motion.button
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                onClick={onMessage}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-2 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-700/60 hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Написать
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
