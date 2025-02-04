import { MinusIcon, PlusIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FontSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const FontSizeInput = ({ value, onChange }: FontSizeInputProps) => {
  const maxValue = 500;
  const minValue = 1;
  const increment = () => onChange(value >= maxValue ? maxValue : value + 1);
  const decrement = () => onChange(value < minValue ? minValue : value - 1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const fontSize = value >= maxValue ? maxValue : value;

    onChange(fontSize);
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={decrement}
        className="rounded-r-none border-r-0 p-2 [&_svg]:size-4"
      >
        <MinusIcon />
      </Button>

      <Input
        onChange={handleChange}
        value={value}
        className={cn(
          "h-8 w-[50px] rounded-none",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
        )}
      />

      <Button
        variant="outline"
        size="icon"
        onClick={increment}
        className="rounded-l-none border-l-0 p-2 [&_svg]:size-4"
      >
        <PlusIcon />
      </Button>
    </div>
  );
};
