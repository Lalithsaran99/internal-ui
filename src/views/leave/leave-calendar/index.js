import labelManager from "configs/label.config/label-manager";
import { leaveData } from "./data";
import { Calendar } from "components/ui/Calendar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { people } from "views/employee/data";
import { BackButtonWithHeader } from "components/shared/BackButtonWithHeader";

const currentDate = new Date();
const groups = [labelManager.empId];
const views = ["month", "week", "day"];

const LeaveCalendar = () => {
  const [employee, setEmployee] = useState();

  const params = useParams();

  useEffect(() => {
    if (!params?.id) return;
    setEmployee(people.find((id) => id?.id === Number(params?.id)));
  }, [params?.id]);

  const employees = [
    {
      text: employee?.name,
      id: employee?.id,
      avatar: employee?.imageUrl,
      color: "#ff9747",
      age: employee?.age,
      leaveBalance: employee?.leaveBalance,
      rejectedLeave: employee?.rejectedLeave,
      totalHolidays: employee?.totalHolidays,
      totalLeave: employee?.totalLeave,
    },
  ];

  const editing = {
    allowDragging: false,
    allowResizing: false,
    allowAdding: false,
    allowUpdating: false,
  };

  return (
    <>
      <BackButtonWithHeader
        header={employee?.name + `'s ` + labelManager.calendar}
      />
      <Calendar
        data={leaveData}
        resourceData={employees}
        groups={groups}
        currentDate={currentDate}
        views={views}
        editing={editing}
        resourceLabel={labelManager.employee}
        resourceFieldExpr={labelManager.empId}
      />
    </>
  );
};
export default LeaveCalendar;
