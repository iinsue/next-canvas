import { cn } from "@/lib/utils";
import { CrownIcon } from "lucide-react";
import Image from "next/image";

interface TemplateCardProps {
  imageSrc: string;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  width: number;
  height: number;
  isPro: boolean | null;
  description: string;
}

export const TemplateCard = ({
  imageSrc,
  title,
  onClick,
  disabled,
  width,
  height,
  description,
  isPro,
}: TemplateCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group flex flex-col space-y-2 text-left transition",
        disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer",
      )}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-xl border"
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <Image
          fill
          src={imageSrc}
          alt={title}
          className="transform object-cover transition group-hover:scale-105"
        />

        {isPro && (
          <div className="absolute right-2 top-2 z-[10] flex size-10 items-center justify-center rounded-full bg-black/50">
            <CrownIcon className="size-5 fill-yellow-500 text-yellow-500" />
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 opacity-0 backdrop-blur-sm backdrop-filter transition group-hover:opacity-100">
          <p className="font-semibold text-white">Open in editor</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground opacity-0 transition group-hover:opacity-75">
          {description}
        </p>
      </div>
    </button>
  );
};
