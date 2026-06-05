// 製作一個個人資料頁，最外層container要ml-[3.5rem]，裡面有一個flex-col，所有東西置中，顯示我的頭像、名字、橫一行用iconify做可點擊的Facebook, Instagram, Pixiv 按鈕連結，下面是學歷，工作經驗
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

import icon from "../assets/icon.jpg";

export default function Info() {
    return (
        <div className="ml-[3.5rem] flex flex-col items-center">
            <img src={icon} alt="頭像" className="w-32 h-32 rounded-full mt-8" />
            <h1 className="text-2xl font-bold mt-4">你的名字</h1>
            <div className="flex gap-4 mt-4">
                <Icon icon="mdi:facebook" className="w-6 h-6" />
                <Icon icon="mdi:instagram" className="w-6 h-6" />
                <Icon icon="mdi:pixiv" className="w-6 h-6" />
            </div>
        </div>
    );
}