import labelManager from "configs/label.config/label-manager";
import { LeaveGrid } from "./leave-grid";
import { leaveRecords } from "./data";

const Leave = () => {
  return (
    <>
      <h3 className="mb-2">{labelManager.leaves}</h3>
      <div className="mb-2">
        <LeaveGrid data={leaveRecords} />
      </div>
    </>
  );
};
export default Leave;
