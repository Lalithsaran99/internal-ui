import labelManager from "configs/label.config/label-manager";
import { DataGrid, Form as DxForm } from "devextreme-react";

import {
  Column,
  Editing,
  Popup,
  SearchPanel,
} from "devextreme-react/data-grid";
import { LeaveForm } from "./leave-form";
import { Button } from "components/ui";
import { HiPaperClip } from "react-icons/hi";

export const LeaveGrid = (props) => {
  const { data } = props;

  const handleButtonClick = (e) => {
    const rowData = e.data;
    console.log("Edit button clicked for row:", rowData);
    // Implement your custom logic here when the button is clicked
  };

  const customButtonTemplate = (container, options) => {
    return (
      <button
        className="custom-button"
        onClick={() => handleButtonClick(options)}
      >
        Edit
      </button>
    );
  };
  return (
    <DataGrid
      dataSource={data}
      keyExpr={labelManager.id}
      allowColumnReordering={true}
      showBorders={true}
      rowAlternationEnabled={true}
      hoverStateEnabled={true}
    >
      <SearchPanel visible={true} />
      {/* <Editing
        mode="popup"
        allowUpdating={true}
        allowAdding={true}
        allowDeleting={true}
      >
        <Popup title="Employee Info" showTitle={true} width={700} height={525}>
          <LeaveForm />
        </Popup>
      </Editing> */}
      <Column type="buttons" cellTemplate={customButtonTemplate} allowFiltering={false} allowSorting={false}/>
      <Column dataField="leaveType" dataType="string" />
      <Column dataField="date" dataType="string" />
      <Column dataField="status" dataType="string" />
      <Column dataField="month" dataType="string" />
    </DataGrid>
  );
};
