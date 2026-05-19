"use client";

import { useState, useRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  image: string;
  title: string;
}

interface AnimatedFolderProps {
  title: string;
  projects: Project[];
  className?: string;
  onProjectClick?: (projectId: string) => void;
}

const ProjectCard = forwardRef<
  HTMLDivElement,
  {
    image: string;
    title: string;
    delay: number;
    isVisible: boolean;
    index: number;
    onClick: () => void;
    isSelected: boolean;
  }
>(({ image, title, delay, isVisible, index, onClick, isSelected }, ref) => {
  const rotations = [-12, 0, 12];
  const translations = [-55, 0, 55];

  return (
    <div
      ref={ref}
      className={cn(
        "absolute w-20 h-28 rounded-lg overflow-hidden shadow-xl",
        "bg-zinc-800 border border-zinc-700",
        "cursor-pointer hover:ring-2 hover:ring-indigo-400/60",
        isSelected && "opacity-0"
      )}
      style={{
        transform: isVisible
          ? `translateY(-90px) translateX(${translations[index]}px) rotate(${rotations[index]}deg) scale(1)`
          : "translateY(0px) translateX(0px) rotate(0deg) scale(0.5)",
        opacity: isSelected ? 0 : isVisible ? 1 : 0,
        transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
        zIndex: 10 - index,
        left: "-40px",
        top: "-56px",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-medium text-white truncate">
        {title}
      </p>
    </div>
  );
});
ProjectCard.displayName = "ProjectCard";

export function AnimatedFolder({
  title,
  projects,
  className,
  onProjectClick,
}: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        "p-8 rounded-2xl cursor-pointer",
        "bg-zinc-900 border border-zinc-800",
        "transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-indigo-500/10",
        "hover:border-zinc-700",
        "group",
        className
      )}
      style={{ minWidth: "200px", minHeight: "280px", perspective: "1000px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 70%, #6366f1 0%, transparent 70%)",
          opacity: isHovered ? 0.08 : 0,
        }}
      />

      <div
        className="relative flex items-center justify-center mb-4"
        style={{ height: "160px", width: "200px" }}
      >
        {/* Folder back */}
        <div
          className="absolute w-32 h-24 rounded-lg shadow-md"
          style={{
            background: "linear-gradient(180deg, #3f3f46 0%, #27272a 100%)",
            transformOrigin: "bottom center",
            transform: isHovered ? "rotateX(-15deg)" : "rotateX(0deg)",
            transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 10,
          }}
        />

        {/* Folder tab */}
        <div
          className="absolute w-12 h-4 rounded-t-md"
          style={{
            background: "#52525b",
            top: "calc(50% - 48px - 12px)",
            left: "calc(50% - 64px + 16px)",
            transformOrigin: "bottom center",
            transform: isHovered ? "rotateX(-25deg) translateY(-2px)" : "rotateX(0deg)",
            transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 10,
          }}
        />

        {/* Project cards */}
        <div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 20,
          }}
        >
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              image={project.image}
              title={project.title}
              delay={index * 80}
              isVisible={isHovered}
              index={index}
              isSelected={false}
              onClick={() => onProjectClick?.(project.id)}
            />
          ))}
        </div>

        {/* Folder front */}
        <div
          className="absolute w-32 h-24 rounded-lg shadow-lg"
          style={{
            background: "linear-gradient(180deg, #52525b 0%, #3f3f46 100%)",
            top: "calc(50% - 48px + 4px)",
            transformOrigin: "bottom center",
            transform: isHovered ? "rotateX(25deg) translateY(8px)" : "rotateX(0deg)",
            transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 30,
          }}
        />

        {/* Folder shine */}
        <div
          className="absolute w-32 h-24 rounded-lg overflow-hidden pointer-events-none"
          style={{
            top: "calc(50% - 48px + 4px)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
            transformOrigin: "bottom center",
            transform: isHovered ? "rotateX(25deg) translateY(8px)" : "rotateX(0deg)",
            transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 31,
          }}
        />
      </div>

      <h3
        className="text-base font-semibold text-white mt-4 text-center transition-all duration-300"
        style={{ transform: isHovered ? "translateY(4px)" : "translateY(0)" }}
      >
        {title}
      </h3>
      <p
        className="text-xs text-zinc-500 mt-1 transition-all duration-300"
        style={{ opacity: isHovered ? 0.7 : 1 }}
      >
        {projects.length} {projects.length === 1 ? "кейс" : projects.length < 5 ? "кейса" : "кейсов"}
      </p>

      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-zinc-600 transition-all duration-300"
        style={{
          opacity: isHovered ? 0 : 0.6,
          transform: isHovered ? "translateY(10px)" : "translateY(0)",
        }}
      >
        Наведи для просмотра
      </div>
    </div>
  );
}
