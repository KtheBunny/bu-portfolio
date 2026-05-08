import { MouseParallax } from "react-just-parallax";

export default function HomeParaArt() {
  return (
    <>
      <img
        className="absolute h-full w-full object-cover object-center"
        src=".\src\assets\art\home_illustration-z101.webp"
      />

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.01}
        zIndex={2}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-full w-full scale-[101%] object-cover object-center"
          src=".\src\assets\art\home_illustration-z102.webp"
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.03}
        zIndex={3}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-full w-full scale-[103%] object-cover object-center"
          src=".\src\assets\art\home_illustration-z103.webp"
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.04}
        zIndex={4}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-full w-full scale-[104%] object-cover object-center"
          src=".\src\assets\art\home_illustration-z104.webp"
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.05}
        zIndex={5}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-full w-full scale-[105%] object-cover object-center"
          src=".\src\assets\art\home_illustration-z105.webp"
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
          src=".\src\assets\art\home_illustration-z106.webp"
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.1}
        zIndex={7}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-full w-full scale-[110%] object-cover object-center"
          src=".\src\assets\art\home_illustration-z107.webp"
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.15}
        zIndex={8}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-full w-full scale-[115%] object-cover object-center"
          src=".\src\assets\art\home_illustration-z108.webp"
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
          className="absolute h-full w-full object-cover object-center"
          src=".\src\assets\art\home_illustration-z109.webp"
        />
      </MouseParallax>
    </>
  );
}
