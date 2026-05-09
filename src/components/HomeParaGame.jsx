import { MouseParallax } from "react-just-parallax";

import z1 from "../assets/game/home-game-z1.png";
import z2 from "../assets/game/home-game-z50.png";
import z3 from "../assets/game/home-game-z60.png";
import z4 from "../assets/game/home-game-z70.png";
import z5 from "../assets/game/home-game-z80.png";
import z6 from "../assets/game/home-game-z90.gif";
import z7 from "../assets/game/home-game-z100.png";

export default function HomeParaGame() {
  return (
    <>
      <img
        className="absolute h-full w-full object-cover object-center"
        src={z1}
        style={{ imageRendering: "pixelated" }}
      />

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.05}
        zIndex={5}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-full w-full scale-[105%] object-cover object-center"
          src={z2}
          style={{ imageRendering: "pixelated" }}
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.1}
        zIndex={6}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-full w-full scale-[110%] object-cover object-center"
          src={z3}
          style={{ imageRendering: "pixelated" }}
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.2}
        zIndex={7}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-full w-full scale-[120%] object-cover object-center"
          src={z4}
          style={{ imageRendering: "pixelated" }}
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.22}
        zIndex={8}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-full w-full scale-[122%] object-cover object-center"
          src={z5}
          style={{ imageRendering: "pixelated" }}
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.25}
        zIndex={9}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-full w-full scale-[125%] object-cover object-center"
          src={z6}
          style={{ imageRendering: "pixelated" }}
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.25}
        zIndex={10}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="pointer-events-none absolute h-full w-full scale-[125%] object-cover object-center"
          src={z7}
          style={{ imageRendering: "pixelated" }}
        />
      </MouseParallax>
    </>
  );
}
