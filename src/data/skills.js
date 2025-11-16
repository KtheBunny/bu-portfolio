const skills = [
  {
    id: 1,
    x: 400,
    y: 400,
    icon: "tools_power_drill",
    title: "Unity 實作能力",
    type: "被動技能",
    description: "擁有操作Unity的能力以及對遊戲的整體設計與規劃的能力和經驗，包含遊戲機制、關卡設計等。",
    works: ["[2021] Path of Ghost", "[2022] Eminence"], // 可 0 或多行
    workLink: "https://example.com", // 若無作品可設 null
    mastery: 70, // 0~100
    masteryDescriptions: ["＋熟悉 Unity 引擎的基本操作與功能，能夠獨立完成小型遊戲專案。"],
    prerequisites: []
  }

  // 你未來可以新增更多技能…
];

export default skills;