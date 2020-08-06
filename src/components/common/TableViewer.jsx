import React from 'react';
import MaterialTable from 'material-table';


export default function PositioningActionsColumn(props) {
  return (
    <MaterialTable

      title={props.title}
      type={props.type}
      columns={props.columns}
      data={props.data}
      actions={[
        {
          icon: 'edit',
          tooltip: `Edit ${props.type}`,
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        },
        
        rowData => ({
          icon: 'delete',
          tooltip: `Delete ${props.type}`,
          onClick: (event, rowData) => console.log("You want to delete " + rowData.name),
          disabled: rowData.birthYear < 2000
        })
      ]}
      options={{
        actionsColumnIndex: -1,
        exportButton: true,
        selection: true
      }}
    />
  )
}