import React, { useRef } from "react";

export interface ColorPaletteProps {
  onSelect: (v: string) => void;
  disabled?: boolean;
}

const COLORS = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#2196f3",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#607d8b",
  "#ffffff",
];

export const ColorPalette: React.FC<ColorPaletteProps> = ({ disabled, onSelect }) => {
  const colors = useRef(COLORS);

  return (
    <div className={`color-palette ${disabled ? "disabled" : ""}`}>
      <h4 className="color-palette__title">Palette</h4>
      <div className="color-palette__grid">
        {colors.current.map((c, idx) => (
          <div
            key={`${idx}-${c}`}
            className="color-palette__color"
            style={{ backgroundColor: c }}
            onClick={() => onSelect(c)}
          />
        ))}
      </div>
    </div>
  );
};
