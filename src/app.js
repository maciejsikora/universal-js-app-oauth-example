import React from 'react';
// for material ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  Route,
  Link,
  withRouter
} from 'react-router-dom';

import AccountsPage from './components/accounts.page';
import AccountPage from './components/account.page';
import Header from './components/header';

const style = {
  width: '80%',
  margin: 'auto',
  textAlign: 'center',
  display: 'block',
};

export default withRouter(() => {
  return (
  <MuiThemeProvider>
    <div className="app" style={style}>
      <Header />
      <div className="app-content">
        <Route exact path="/" component={AccountsPage} />
        <Route exact path="/account/:id" component={AccountPage} />
      </div>
      <footer>
        <p>
          Universal React Application &copy; Maciej Sikora, DataArt Poland
        </p>
      </footer>
    </div>
    </MuiThemeProvider>
  );
});
