import { StatusCard } from "components/shared/StatusCard";
import { leaveData } from "./data";

export const LeaveGrid = () => {
  return (
    <div className="mt-2">
      {leaveData?.map((leave, index) => (
        <>
          <p className="m-2">{leave?.month}</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-2">
            {leave?.data?.map((data) => (
              <StatusCard
                leaveType={data?.leaveType}
                date={data?.date}
                status={data?.status}
              />
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
