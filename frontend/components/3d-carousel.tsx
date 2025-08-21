"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { CropGrowthChart } from "./crop-yield"
import { WaterQualityChart } from "./water-quality"
import { ChartRadarDots } from "./chart-radar-dots"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/3d-card"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const images = [
  { src: "/crop.jpg", alt: "Crops Growth Stats", content: <CropGrowthChart /> },
  { src: "/river.jpg", alt: "Water Quality Stats", content: <WaterQualityChart /> },
  { src: "/soil.jpg", alt: "Soil Health Stats", content: <ChartRadarDots /> },
]

export function ThreeDCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 10000, stopOnInteraction: true })
  )

  const [open, setOpen] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState<number | null>(null)
  const [hoveredItem, setHoveredItem] = React.useState<number | null>(null)
  const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 })

  return (
    <>
      <CardContainer className="inter-var w-full h-[700px]">
        <CardBody
          className="bg-gray-50 relative group/card dark:hover:shadow-2xl 
          dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] 
          border-black/[0.1] w-full h-[700px] rounded-xl border"
        >
          <CardItem translateZ="80" className="w-full h-[700px]">
            <Carousel
              plugins={[plugin.current]}
              className="w-full h-[700px] relative"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="h-[700px]">
                {images.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="flex justify-center h-[700px] relative"
                  >
                    <div
                      className="relative w-full h-[700px] group"
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        setCursorPosition({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top
                        })
                      }}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        onClick={() => {
                          setActiveItem(index)
                          setOpen(true)
                        }}
                        className="h-[700px] w-full object-cover rounded-xl cursor-pointer group-hover:shadow-xl transition-all duration-300"
                      />
                      
                      {/* Hover Badge */}
                      {hoveredItem === index && (
                        <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg border border-white/20 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                          <span className="text-2xl font-bold">{item.alt}</span>
                        </div>
                      )}
                      
                      {/* Click Me Cursor Follower */}
                      {hoveredItem === index && (
                        <div 
                          className="absolute pointer-events-none bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
                          style={{
                            left: cursorPosition.x + 10,
                            top: cursorPosition.y - 10,
                            transform: 'translate(0, 0)',
                            zIndex: 50
                          }}
                        >
                          Click me
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation buttons inside frame */}
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60 rounded-full" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60 rounded-full" />
            </Carousel>
          </CardItem>
        </CardBody>
      </CardContainer>

      {/* Overlay card (using shadcn dialog) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-9xl rounded-2xl shadow-xl">
          <div className="mt-4">
            {activeItem !== null && (
              <p>{images[activeItem].content}</p>
              // You can replace this with charts or React components instead of plain text
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}