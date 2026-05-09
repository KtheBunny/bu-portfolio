import { MouseParallax } from "react-just-parallax";

import z1 from "../assets/UIUX/home-UI-z1.png";
import z2 from "../assets/UIUX/home-UI-z2.png";
import z3 from "../assets/UIUX/home-UI-z3.png";
import z4 from "../assets/UIUX/home-UI-z4.png";
import z5 from "../assets/UIUX/home-UI-z5.png";
import z6 from "../assets/UIUX/home-UI-z6.png";

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
          className="pointer-events-none absolute h-[115%] w-[115%] object-cover object-center"
          src={z3}
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
          src={z5}
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
          src={z6}
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
          src={z4}
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
          src={z2}
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
          src={z1}
        />
      </MouseParallax>
    </>
  );
}
