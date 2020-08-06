import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles, useTheme } from '@material-ui/core/styles';


import { connect } from 'react-redux';

function AdminHeader(props) {




    return (
    <AppBar>
        <ToolBar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"

          >
            <MenuIcon />
          </IconButton>

          <Typography>
            Hello {props.auth.user.email}
          </Typography>
    </ToolBar>
    </AppBar>
    );
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = dispatch => {

}
export default connect(
  mapStateToProps,
  mapDispatchToProps

)(AdminHeader);