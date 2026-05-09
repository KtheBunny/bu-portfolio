import SkillTreeCanvas from "../components/SkillTreeCanvas";
import SkillTreeTopBar from "../components/SkillTreeTopBar";
import "../index.css";

function Tree({}) {
  return (
    <>
      <SkillTreeTopBar />
      <SkillTreeCanvas />
    </>
  );
}

export default Tree;
