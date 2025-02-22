"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

const notifications: Item[] = [
  {
    name: "Landlord Response Received",
    description: "Your landlord has replied to your case.",
    time: "15m ago",
    icon: "🏠",
    color: "#00C9A7",
  },
  {
    name: "New Rent Control Law",
    description: "A new rent cap has been implemented in your province.",
    time: "10m ago",
    icon: "📜",
    color: "#FFB800",
  },
  {
    name: "Evidence Submitted",
    description: "You uploaded a new document for your case.",
    time: "5m ago",
    icon: "📎",
    color: "#FF3D71",
  },
  {
    name: "Hearing Scheduled",
    description: "Your case hearing is scheduled for March 10, 2024.",
    time: "2m ago",
    icon: "📅",
    color: "#1E86FF",
  },
  {
    name: "Rent Increase Alert",
    description: "Your landlord has proposed a rent increase of 10%.",
    time: "1h ago",
    icon: "📈",
    color: "#FF5733",
  },
  {
    name: "Lease Agreement Reviewed",
    description: "A legal expert has reviewed your lease agreement.",
    time: "2h ago",
    icon: "📑",
    color: "#4CAF50",
  },
];

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white shadow-md",
        // dark styles
        "dark:bg-gray-900 dark:border dark:border-gray-700 dark:shadow-lg"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}
