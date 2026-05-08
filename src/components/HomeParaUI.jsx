import { MouseParallax } from "react-just-parallax";

export default function HomeParaUI() {
  return (
    <>
      <MouseParallax
        isAbsolutelyPositioned
        strength={0.2}
        zIndex={7}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-[115%] w-[115%] object-cover object-center"
          src=".\src\assets\UIUX\home-UI-z3.png"
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.15}
        zIndex={6}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-[115%] w-[115%] object-cover object-center"
          src=".\src\assets\UIUX\home-UI-z5.png"
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.1}
        zIndex={1}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-[115%] w-[115%] object-cover object-center"
          src=".\src\assets\UIUX\home-UI-z6.png"
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.125}
        zIndex={4}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-[115%] w-[115%] object-cover object-center"
          src=".\src\assets\UIUX\home-UI-z4.png"
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.125}
        zIndex={2}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-[115%] w-[115%] object-cover object-center"
          src=".\src\assets\UIUX\home-UI-z2.png"
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned
        strength={0.05}
        zIndex={1}
        shouldPause={false}
        enableOnTouchDevice={true}
      >
        <img
          className="absolute h-[115%] w-[115%] object-cover object-center"
          src=".\src\assets\UIUX\home-UI-z1.png"
        />
      </MouseParallax>
    </>
  );
}
