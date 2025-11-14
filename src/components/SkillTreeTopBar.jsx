export default function SkillTreeTopBar() {
  return (
    <>
      <header className="fixed top-0 left-0 z-40 w-screen flex items-center justify-between pl-20 p-4">
        <div>
          <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
            © Ian Keefe / Unsplash
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-fit p-4 h-12 rounded-[4px] border-[1px] border-[rgba(255,255,255,0.25)] flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark text-center backdrop-blur-[1.5px] shadow-lg">
            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark mr-1">star</span>
            <span className="font-semibold">學歷 - 研究生</span>
          </div>
          <div className="w-fit p-4 h-12 rounded-[4px] border-[1px] border-[rgba(255,255,255,0.25)] flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark text-center backdrop-blur-[1.5px] shadow-lg">
            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark mr-1">layers</span>
            <span className="font-semibold">工作分支選擇</span>
          </div>
          <img
            alt="User avatar"
            className="w-12 h-12 rounded-[4px] shadow-lg"
            src="https://scontent.ftpe8-3.fna.fbcdn.net/v/t39.30808-6/570274599_122154692420718555_5659794563334834264_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EBvDTnXsfBEQ7kNvwFjc5VP&_nc_oc=Admk4bqNP3T-t5B1sQKNvbil0RsBGoWrSDA-pU9hPYaEVNYzJQ_grZAl6xmOqxTm3KE&_nc_zt=23&_nc_ht=scontent.ftpe8-3.fna&_nc_gid=IHaAWkBDgGurrMWYA4HJmQ&oh=00_AfiPErQAbuoT5Chr6_t1_LXQQDplPKVp_MPnzJ4hetF-WQ&oe=691A3701"
          />
        </div>
      </header>
    </>
  );
}
