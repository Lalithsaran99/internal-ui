import { DataGrid } from "devextreme-react";
import { Column, SearchPanel } from "devextreme-react/data-grid";

export const Grid = (props) => {
  const { id, data, column } = props;
  console.log(props);
  return (
    <DataGrid
      keyExpr={id}
      dataSource={data}
      allowColumnReordering={true}
      showBorders={true}
      rowAlternationEnabled={true}
      hoverStateEnabled={true}
    >
      <SearchPanel visible={true} />
      {column.map((field) => (
        <Column cssClass="header-css" key={field.dataField} {...field}></Column>
      ))}
    </DataGrid>
  );
};
