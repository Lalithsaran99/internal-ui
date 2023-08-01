import labelManager from "configs/label.config/label-manager";
import { DataGrid, Form as DxForm } from "devextreme-react";

import {
  Column,
  Editing,
  Popup,
  SearchPanel,
} from "devextreme-react/data-grid";
import { LeaveForm } from "./leave-form";

export const LeaveGrid = (props) => {
  const { data } = props;
  return (
    <DataGrid
      dataSource={data}
      keyExpr={labelManager.id}
      allowColumnReordering={true}
      showBorders={true}
    >
      <SearchPanel visible={true} />
      <Editing
        mode="popup"
        allowUpdating={true}
        allowAdding={true}
        allowDeleting={true}
      >
        <Popup title="Employee Info" showTitle={true} width={700} height={525}>
          <LeaveForm />
        </Popup>
      </Editing>

      <Column dataField="leaveType" dataType="string" />
      <Column dataField="date" dataType="string" />
      <Column dataField="status" dataType="string" />
      <Column dataField="month" dataType="string" />
    </DataGrid>
  );
};
