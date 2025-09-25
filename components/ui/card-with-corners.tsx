import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface CardWithCornersProps extends React.ComponentProps<"div"> {
  cornerSize?: number
}

function CardWithCorners({ className, cornerSize = 48, children, ...props }: CardWithCornersProps) {
  return (
    <div
      data-slot="card-with-corners"
      className={cn(
        "bg-card/70 text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm relative",
        className
      )}
      {...props}
    >
      {/* Corner SVG decorations */}
      <div className="absolute top-0 left-0 w-12 h-12 z-30">
        <Image
          src="/corner.svg"
          alt="Top left corner"
          width={cornerSize}
          height={cornerSize}
          className="w-full h-full object-contain"
          style={{ transform: 'rotate(0deg)' }}
        />
      </div>
      <div className="absolute top-0 right-0 w-12 h-12 z-30">
        <Image
          src="/corner.svg"
          alt="Top right corner"
          width={cornerSize}
          height={cornerSize}
          className="w-full h-full object-contain"
          style={{ transform: 'rotate(90deg)' }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-12 h-12 z-30">
        <Image
          src="/corner.svg"
          alt="Bottom left corner"
          width={cornerSize}
          height={cornerSize}
          className="w-full h-full object-contain"
          style={{ transform: 'rotate(270deg)' }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-12 h-12 z-30">
        <Image
          src="/corner.svg"
          alt="Bottom right corner"
          width={cornerSize}
          height={cornerSize}
          className="w-full h-full object-contain"
          style={{ transform: 'rotate(180deg)' }}
        />
      </div>
      
      {children}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  CardWithCorners,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}