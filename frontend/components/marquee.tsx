import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Sarah Thompson",
    username: "@sarah_tenant",
    body: "Tenant Shield helped me challenge an unfair rent increase. The AI chatbot guided me step-by-step. Highly recommend!",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "James Carter",
    username: "@james_renter",
    body: "I was facing eviction, and the legal document generator saved me. It created a formal appeal letter in seconds!",
    img: "https://avatar.vercel.sh/james",
  },
  {
    name: "Ayesha Malik",
    username: "@ayesha_m",
    body: "I had a dispute with my landlord over repairs, and this platform made filing a formal complaint super easy!",
    img: "https://avatar.vercel.sh/ayesha",
  },
  {
    name: "Daniel Lee",
    username: "@daniel_l",
    body: "The AI assistant answered all my tenant rights questions. It’s like having a lawyer in your pocket!",
    img: "https://avatar.vercel.sh/daniel",
  },
  {
    name: "Maria Sanchez",
    username: "@maria_s",
    body: "I used the case tracker, and it kept me updated on my legal complaint. Great tool for tenants!",
    img: "https://avatar.vercel.sh/maria",
  },
  {
    name: "Chris Reynolds",
    username: "@chris_r",
    body: "Simple, fast, and reliable. Tenant Shield saved me $$$ in legal fees by automating my dispute process.",
    img: "https://avatar.vercel.sh/chris",
  },
  {
    name: "Emma Patel",
    username: "@emma_p",
    body: "I had trouble getting my security deposit back, but the AI assistant helped me draft a demand letter. My landlord responded immediately!",
    img: "https://avatar.vercel.sh/emma",
  },
  {
    name: "Nathan Smith",
    username: "@nathan_s",
    body: "Legal advice is expensive, but this platform made it accessible for free. Every renter should use it!",
    img: "https://avatar.vercel.sh/nathan",
  },
  {
    name: "Olivia Brown",
    username: "@olivia_b",
    body: "The evidence uploader was a game changer! I was able to store and organize everything for my dispute.",
    img: "https://avatar.vercel.sh/olivia",
  },
  {
    name: "Ethan Wilson",
    username: "@ethan_w",
    body: "Fast, efficient, and effective! I got my rental dispute resolved much quicker thanks to Tenant Shield.",
    img: "https://avatar.vercel.sh/ethan",
  },
];
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
