import React, { useLayoutEffect, useRef, useState } from "react";

import { Billiard } from "../billiard/billiard";
import { createBilliard } from "../create-billiard";
import { ColorPalette } from "../billiard/ui/color-palette.component";
import { BilliardBall } from "../billiard/entities/billiard-ball";
import { ControlsGuide } from "./controls-guide.component";

export const App: React.FC = () => {
  const [selectedBall, setSelectedBall] = useState<BilliardBall | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const billiard = useRef<Billiard | null>(null);

  const selectBallHandler = (color: string) => {
    if (selectedBall) {
      selectedBall.style.fillStyle = color;
      setSelectedBall(null);
    }
  };

  useLayoutEffect(() => {
    billiard.current = createBilliard(canvasRef.current!);
    billiard.current.clickListener.onRightClick((event) => {
      setSelectedBall(event.detail.ball);
    });
  }, []);

  return (
    <>
      <header className="app__header">
        <h1 className="app__title">Billiard Game</h1>
        <small>
          <i>Для начала нажмите "r"</i>
        </small>
      </header>

      <ControlsGuide />

      <div className="app__game">
        <canvas className="app__balls-canvas" ref={canvasRef} />
        <ColorPalette disabled={!selectedBall} onSelect={selectBallHandler} />
      </div>
    </>
  );
};
