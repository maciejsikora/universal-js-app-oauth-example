import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import reducer from '../reducer';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

class AccountsPage extends React.Component {

  componentDidMount(){
    // CALLED ONLY ON CLIENT SIDE
    this.props.setPage();

    if (!this.props.accounts) {
      this.props.getData();
    }

  }

  render() {

    if (!this.props.accounts) {
      // it is not loaded yet
      return <CircularProgress />;
    }

    const listContent = this.props.accounts.map((account) =>
      <TableRow key={account.Id}>
        <TableRowColumn>{account.Id}</TableRowColumn>
        <TableRowColumn>
          <Link to={"/account/" + account.Id}>{account.Name}</Link>
        </TableRowColumn>
        <TableRowColumn>{account.Phone}</TableRowColumn>
      </TableRow>
    );

    return (
      <div className="accounts-list">
      <Paper zDepth={2} >
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow >
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Phone</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {listContent}
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    accounts: state.accounts
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getData: () => {
      reducer.asyncActions.fetchAccounts(dispatch);
    },
    setPage: () => {
      dispatch(reducer.actions.SET_PAGE(reducer.pages.MAIN));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AccountsPage);
