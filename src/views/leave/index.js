import { Tabs } from "components/ui";
import TabList from "components/ui/Tabs/TabList";
import TabNav from "components/ui/Tabs/TabNav";
import labelManager from "configs/label.config/label-manager";
import { LeaveGrid } from "./leave-grid";

const Leave = () => {
  return (
    <>
      <h3 className="mb-2">{labelManager.leaves}</h3>
      <Tabs value={labelManager.allValue} variant="pill">
        <div className="flex lg:items-center justify-between flex-col lg:flex-row gap-4">
          <TabList>
            <TabNav value={labelManager.allValue}>{labelManager.all}</TabNav>
            <TabNav value={labelManager.holidayValue}>
              {labelManager.holidays}
            </TabNav>
            <TabNav value={labelManager.sickLeaveValue}>
              {labelManager.sickLeave}
            </TabNav>
            <TabNav value={labelManager.casualLeaveValue}>
              {labelManager.casualLeave}
            </TabNav>
          </TabList>
        </div>
        <LeaveGrid />
      </Tabs>
    </>
  );
};
export default Leave;
