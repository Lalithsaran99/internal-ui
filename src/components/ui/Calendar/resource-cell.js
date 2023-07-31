export const ResourceCell = (props) => {
  const {
    data: {
      color,
      data: {
        text,
        avatar,
        leaveBalance,
        rejectedLeave,
        totalLeave,
        totalHolidays,
      },
    },
  } = props;

  return (
    <div className="flex justify-between">
      <div className="p-2">
        <div className="w-32 h-32 avatar-circle">
          <img src={avatar} alt="avatar" />
        </div>
        <h2 className="text-xl font-bold">{text}</h2>
      </div>
      <div className="info p-4">
        Rejected Leaves: {rejectedLeave + "/" + totalLeave}
        <p>Total Holidays: {totalHolidays}</p>
        <p>Leave Balance: {leaveBalance + "/" + totalLeave}</p>
      </div>
    </div>
  );
};
