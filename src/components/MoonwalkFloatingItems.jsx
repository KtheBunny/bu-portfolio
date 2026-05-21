import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import asteroidSheet from "../assets/Moonwalk/AsteroidSprite.png";
import carrotSheet from "../assets/Moonwalk/CarrotSprite.png";

const FRAME_SIZE = 100;

const SPRITES = [
  {
    type: "asteroid",

    sheet: asteroidSheet,

    frames: 11,

    weight: 80,
  },

  {
    type: "carrot",

    sheet: carrotSheet,

    frames: 10,

    weight: 20,
  },
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function weightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

  let random = Math.random() * totalWeight;

  for (const item of items) {
    random -= item.weight;

    if (random <= 0) {
      return item;
    }
  }

  return items[0];
}

export default function FloatingItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const selected = weightedRandom(SPRITES);

      const id = crypto.randomUUID();

      const duration = randomBetween(8, 18);

      const newItem = {
        id,

        ...selected,

        exploding: false,

        top: randomBetween(5, 85),

        duration,

        rotateDuration: randomBetween(3, 8),

        size: randomBetween(60, 140),

        opacity: randomBetween(0.5, 1),
      };

      setItems((prev) => [...prev, newItem]);

      // 漂浮結束自動移除
      setTimeout(
        () => {
          setItems((prev) => prev.filter((i) => i.id !== id));
        },
        duration * 1000 + 2000,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleExplode = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              exploding: true,
            }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((item) => (
        <FloatingSprite
          key={item.id}
          item={item}
          onExplode={handleExplode}
          onFinished={removeItem}
        />
      ))}
    </div>
  );
}

function FloatingSprite({ item, onExplode, onFinished }) {
  const [frame, setFrame] = useState(0);

  const animationRef = useRef(null);

  // 播放 spritesheet
  useEffect(() => {
    if (!item.exploding) return;

    let currentFrame = 0;

    animationRef.current = setInterval(() => {
      currentFrame++;

      setFrame(currentFrame);

      // 播放完
      if (currentFrame >= item.frames - 1) {
        clearInterval(animationRef.current);

        setTimeout(() => {
          onFinished(item.id);
        }, 50);
      }
    }, 60);

    return () => {
      clearInterval(animationRef.current);
    };
  }, [item.exploding]);

  return (
    <motion.div
      className="pointer-events-auto absolute cursor-pointer will-change-transform"
      style={{
        top: `${item.top}%`,
        width: item.size,
        height: item.size,
        opacity: item.opacity,
      }}
      initial={{
        x: window.innerWidth + 200,
        rotate: 0,
      }}
      animate={{
        x: -window.innerWidth - 400,
        rotate: -360,
        y: [0, -10, 10, 0],
      }}
      transition={{
        x: {
          duration: item.duration,
          ease: "linear",
        },

        rotate: {
          duration: item.rotateDuration,
          ease: "linear",
          repeat: Infinity,
        },

        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      onClick={() => {
        if (!item.exploding) {
          onExplode(item.id);
        }
      }}
    >
      <div
        className="h-full w-full bg-no-repeat"
        style={{
          backgroundImage: `url(${item.sheet})`,

          backgroundPosition: `-${frame * item.size}px 0px`,

          backgroundSize: `${item.frames * item.size}px ${item.size}px`,
        }}
      />
    </motion.div>
  );
}
