import { useState } from "react";
import SkillTreeCanvas from "../components/SkillTreeCanvas";
import SkillTreeTopBar from "../components/SkillTreeTopBar";
import "../index.css";

function Tree() {
  const [selectedIds, setSelectedIds] = useState(() => new Set());

  // 強制覆寫選取（由 TopBar 呼叫）
  const applySelection = (ids = []) => {
    setSelectedIds(() => new Set(ids));
  };

  return (
    <>
      <SkillTreeTopBar applySelection={applySelection} />
      <SkillTreeCanvas
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </>
  );
}

export default Tree;
