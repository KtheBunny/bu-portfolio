export default function SkillTreeTopBar() {
  return (
    <>
      <header className="fixed left-0 top-0 z-40 flex w-screen items-center justify-between p-4 pl-20">
        <div>
          <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
            © Ian Keefe / Unsplash
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-fit items-center justify-center rounded-[4px] border-[1px] border-[rgba(255,255,255,0.25)] p-4 text-center text-text-secondary-light shadow-lg backdrop-blur-[1.5px] dark:text-text-secondary-dark">
            <span className="material-symbols-outlined mr-1 text-text-secondary-light dark:text-text-secondary-dark">
              star
            </span>
            <span className="font-semibold">學歷 - 研究生</span>
          </div>
          <div className="flex h-12 w-fit items-center justify-center rounded-[4px] border-[1px] border-[rgba(255,255,255,0.25)] p-4 text-center text-text-secondary-light shadow-lg backdrop-blur-[1.5px] dark:text-text-secondary-dark">
            <span className="material-symbols-outlined mr-1 text-text-secondary-light dark:text-text-secondary-dark">
              layers
            </span>
            <span className="font-semibold">工作分支選擇</span>
          </div>
          <img
            alt="User avatar"
            className="h-12 w-12 rounded-[4px] shadow-lg"
            src="./images/icon.jpg"
          />
        </div>
      </header>
    </>
  );
}
