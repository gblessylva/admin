import React from 'react';
import {Link} from 'react-router-dom'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import FileCopy from '@material-ui/icons/FileCopy';
import ListItem from '@material-ui/core/ListItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard'
import ListItemText from '@material-ui/core/ListItemText';
import Edit from '@material-ui/icons/Edit';
import MailIcon from '@material-ui/icons/Mail';
import FaceIcon from '@material-ui/icons/Face';
import AddNew from '@material-ui/icons/PostAdd'
import Delete from '@material-ui/icons/Delete'


export default function MiniDrawer() {


  return (
    <div className='sidebar-content'>
      <Divider />
      <Link to='/dashboard'>
      <List>
          <ListItem button >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
        </List>
        </Link>
      <Divider />
      <List>
        <Link to='/admin/articles'>
        <ListItem>
          <ListItemIcon>
            <FileCopy />
          </ListItemIcon>
          <ListItemText primary={'Articles'} />
          </ListItem>
        </Link>
        <Link to='/admin/articles/add'>
          <ListItem>
            <ListItemIcon>
              <AddNew />
            </ListItemIcon>
            <ListItemText primary={'New'} />
          </ListItem>
        </Link>
        <Link to='/admin/articles/add'>
          <ListItem>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary={'Edit'} />
          </ListItem>
        </Link>
        <Link to='/admin/articles/add-new-article'>
          <ListItem>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText primary={'Delete'} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to='/admin/users'>
        <ListItem>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText primary={'Users'} />
          </ListItem>
          </Link>
        {['New', 'Edit', 'Delete'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <AddNew /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
