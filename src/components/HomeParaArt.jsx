import { MouseParallax } from "react-just-parallax";

import z1 from "../assets/art/home-illustration-z101.webp";
import z2 from "../assets/art/home-illustration-z102.webp";
import z3 from "../assets/art/home-illustration-z103.webp";
import z4 from "../assets/art/home-illustration-z104.webp";
import z5 from "../assets/art/home-illustration-z105.webp";
import z6 from "../assets/art/home-illustration-z106.webp";
import z7 from "../assets/art/home-illustration-z107.webp";
import z8 from "../assets/art/home-illustration-z108.webp";
import z9 from "../assets/art/home-illustration-z109.webp";

import pixiv from "../assets/logo/pixiv.svg";

export default function HomeParaArt() {
  return (
    <>
      <div
        className="absolute bottom-10 right-10 z-10 cursor-pointer"
        style={{ filter: "brightness(0) invert(1)" }}
        onClick={() =>
          window
            .open("https://www.pixiv.net/artworks/137194516", "_blank")
            .focus()
        }
      >
        <img src={pixiv} className="mask h-6 w-6" />
      </div>

      <img
        className="absolute h-full w-full object-cover object-center"
        src={z1}
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
          src={z2}
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
          src={z3}
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
          src={z4}
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
          src={z5}
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
          src={z6}
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
          src={z7}
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
          src={z8}
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
          className="pointer-events-none absolute h-full w-full object-cover object-center"
          src={z9}
        />
      </MouseParallax>
    </>
  );
}
