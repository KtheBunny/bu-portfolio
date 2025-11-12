import '../index.css'
import NavSideBar from "../components/NavSideBar"
import SkillTreeTopBar from "../components/SkillTreeTopBar"
import SkillTreeCanvas from "../components/SkillTreeCanvas"

function Tree({}) {

  return (
    <>
      <NavSideBar />
      <SkillTreeTopBar />
      <SkillTreeCanvas />
    </>
  );
}

export default Tree;
