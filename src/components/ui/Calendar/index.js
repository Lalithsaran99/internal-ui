import { Scheduler } from "devextreme-react";
import { Resource } from "devextreme-react/scheduler";
import { ResourceCell } from "./resource-cell";

export const Calendar = (props) => {
  const {
    data,
    groups,
    views,
    currentDate,
    resourceData,
    resourceLabel,
    resourceFieldExpr,
    editing,
  } = props;
  return (
    <Scheduler
      dataSource={data}
      resourceCellComponent={ResourceCell}
      groups={groups}
      views={views}
      defaultCurrentView="month"
      defaultCurrentDate={currentDate}
      height={600}
      showAllDayPanel={true}
      firstDayOfWeek={1}
      startDayHour={8}
      endDayHour={18}
      editing={editing}
    >
      <Resource
        label={resourceLabel}
        fieldExpr={resourceFieldExpr}
        dataSource={resourceData}
        allowMultiple={false}
      />
    </Scheduler>
  );
};
