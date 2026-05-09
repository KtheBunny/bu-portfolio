import { MouseParallax } from "react-just-parallax";

export default function HomeParaGame() {
  return (
    <>
      <img
        className="absolute h-full w-full object-cover object-center"
        src=".\src\assets\game\home-game-z1.png"
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
          src=".\src\assets\game\home-game-z50.png"
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
          src=".\src\assets\game\home-game-z60.png"
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
          src=".\src\assets\game\home-game-z70.png"
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
          src=".\src\assets\game\home-game-z80.png"
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
          src=".\src\assets\game\home-game-z90.gif"
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
          src=".\src\assets\game\home-game-z100.png"
          style={{ imageRendering: "pixelated" }}
        />
      </MouseParallax>
    </>
  );
}
