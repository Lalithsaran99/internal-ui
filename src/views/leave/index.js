import labelManager from "configs/label.config/label-manager";
import { leaveData } from "./data";
import { Calendar } from "components/ui/Calendar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { people } from "views/employee/data";

const currentDate = new Date();
const groups = [labelManager.empId];
const views = ["month", "week", "day",];

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
      age: employee?.age,
      leaveBalance: employee?.leaveBalance,
      rejectedLeave: employee?.rejectedLeave,
      totalHolidays: employee?.totalHolidays,
      totalLeave: employee?.totalLeave,
    },
  ];

  return (
    <>
      <h3 className="mb-4">Leave Calendar</h3>
      <Calendar
        data={leaveData}
        resourceData={employees}
        groups={groups}
        currentDate={currentDate}
        views={views}
        resourceLabel={labelManager.employee}
        resourceFieldExpr={labelManager.empId}
      />
    </>
  );
};
export default LeaveCalendar;
