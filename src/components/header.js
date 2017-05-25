import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import reducer from '../reducer';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import {
  withRouter
} from 'react-router-dom';

const Header = withRouter((props) => {

  const clickIconEvent = (e) => {
    if (props.page === reducer.pages.SUB) {
      // REDIRECT TO MAIN PAGE
      props.history.replace('/');
    }
  };

  const icon = props.page === reducer.pages.MAIN ?  <IconButton><ActionHome /></IconButton> : <IconButton><NavigationClose /></IconButton>;

  return (
    <header>
      <AppBar
        onLeftIconButtonTouchTap={clickIconEvent}
        title="Universal Accounts Manager"
        iconElementLeft={icon}
      />
    </header>
  );
});

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.page
  }
};

export default connect(mapStateToProps, null)(Header);
