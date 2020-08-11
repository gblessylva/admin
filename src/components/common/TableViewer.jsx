import React from 'react';
import MaterialTable from 'material-table';
import { withRouter } from 'react-router-dom';


function TableWithAction(props) {


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

          onClick: (event, rowData) => {
            //const isSingleRow = rowData.map((row, i) => { return row.id })
            props.history.push(`/admin/articles/edit/${rowData[0].id}`);

          },
        },

        rowData => ({
          icon: 'delete',
          tooltip: `Delete ${props.type}`,
          onClick: (event, rowData) => console.log("You want to delete " + rowData),
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

export default withRouter(TableWithAction)