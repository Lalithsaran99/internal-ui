import classNames from "classnames";
import { Card, Tag } from "components/ui";
import { formatDate } from "utils/formatDate";
import leaveStatusColor from "utils/leaveStatusColor";

export const StatusCard = (props) => {
  const { leaveType, date, status } = props;
  return (
    <Card>
      <p className="font-semibold mb-4 text-sm">{leaveType}</p>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">{formatDate(date)}</h3>
        </div>
        <Tag
          className={classNames(
            "gap-1 font-bold border-0",
            leaveStatusColor(status, "text"),
            leaveStatusColor(status, "bg")
          )}
        >
          {status}
        </Tag>
      </div>
    </Card>
  );
};
