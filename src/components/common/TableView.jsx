import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class TableView extends React.Component {

  render() {
    const { rows, columns } = this.props
    return (
      <Paper>
        <table>
          <TableHead>
            <TableRow>
              {columns ?
                columns.map((col, i) => {
                  return (
                    <TableCell key={i}>{col.label} </TableCell>
                  )
                })
                : null}
            </TableRow>
          </TableHead>
          <TableBody>


            <TableRow>
              {rows ? rows.map((row, i) => {


                  return (
                    <TableCell>
                      {row.title}
                 </TableCell>


                  )
              })
                : null}
            </TableRow>
          </TableBody>

        </table>
      </Paper>
    )
  }
}
export default TableView;