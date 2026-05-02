import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

const navItems = [
  {
    path: "/",
    fill: "material-symbols:home-rounded",
    outline: "material-symbols:home-outline-rounded",
    label: "主頁",
  },
  {
    path: "/Skills",
    fill: "material-symbols:graph-8",
    outline: "material-symbols:graph-8-outline",
    label: "技能樹",
  },
  {
    path: "/bookmarks",
    fill: "material-symbols:bookmark",
    outline: "material-symbols:bookmark-outline",
    label: "作品集",
  },
  {
    path: "/settings",
    fill: "material-symbols:settings-rounded",
    outline: "material-symbols:settings-outline-rounded",
    label: "設定",
  },
];

// 每個導航項目的高度 (h-10 = 40px) + space-y-4 (16px) = 56px
const ITEM_HEIGHT = 56;
// 4個項目的總高度 = 4 * 56 = 224px
// 從 nav 頂部到第一個項目的偏移量 (居中計算)
const FIRST_ITEM_OFFSET = -84; // = 84px from top

export default function NavSideBar() {
  const location = useLocation();
  const [buttonHovered, setButtonHovered] = useState(null);
  const [navHovered, setIsNavHovered] = useState(false);

  const activeIndex = navItems.findIndex(
    (item) => item.path === location.pathname,
  );

  return (
    <>
      <nav
        className={`fixed left-0 top-0 z-50 flex h-screen w-14 flex-col items-center justify-center border-r bg-gradient-to-b from-gray-900 to-gray-800 py-4 transition-all duration-300 ease-in-out hover:w-36`}
        onMouseEnter={() => {
          setIsNavHovered(true);
          setButtonHovered(activeIndex);
        }}
        onMouseLeave={() => {
          setIsNavHovered(false);
          setButtonHovered(null);
        }}
      >
        {/* 動畫背景方塊 */}
        {/* 動畫背景方塊 - 改用 absolute 定位，相對於 nav */}
        {navHovered && (
          <motion.div
            className="absolute w-full rounded-md bg-gray-700/50"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: FIRST_ITEM_OFFSET + buttonHovered * ITEM_HEIGHT,
            }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              height: "2.5rem",
              left: 0,
            }}
          />
        )}

        <div className="relative flex flex-col items-center w-full justify-center space-y-4">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="group relative ml-1 mt-0 flex h-10 w-full items-center justify-center rounded-md transition-all ease-in-out"
              onMouseEnter={() => setButtonHovered(index)}
              onMouseLeave={() => setButtonHovered(index)}
            >
              <Icon
                icon={isActive ? item.fill : item.outline}
                className={`absolute left-3 pl-1 transition-all duration-300 ${isActive ? "text-white" : "text-gray-500 group-hover:text-white"}`}
                width="24"
                height="24"
              />

              {/* 文字標籤 - hover 或 active 時顯示 */}
              <span
                className={`text-md absolute overflow-hidden whitespace-nowrap pl-4 transition-all ${navHovered ? "left-10 opacity-100" : "-left-1 opacity-0"} ${isActive ? "text-white" : "text-gray-500 group-hover:text-white"} `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
        </div>
      </nav>
    </>
  );
}
