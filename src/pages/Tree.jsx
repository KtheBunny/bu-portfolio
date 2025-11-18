import NavSideBar from "../components/NavSideBar";
import SkillTreeCanvas from "../components/SkillTreeCanvas";
import SkillTreeTopBar from "../components/SkillTreeTopBar";
import "../index.css";

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
