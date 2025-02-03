import { ChromePicker, CirclePicker } from "react-color";

import { colors } from "@/features/editor/types";
import { rgbaObjectToString } from "@/features/editor/utils";
import { useEffect, useState } from "react";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
        className="rounded-lg border"
      />

      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
      />
    </div>
  );
};

export default ColorPicker;
