import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import reducer from '../reducer';
import CircularProgress from 'material-ui/CircularProgress';

import AccountContent from './account/content';

class AccountPage extends React.Component {

  componentDidMount(){
    // set page for sub
    this.props.setPage();
    // CALLED ONLY ON CLIENT SIDE
    if (!this.props.account || this.props.account.Id !== this.props.match.params.id) {
      this.props.getData();
    }
  }

  render() {
    const content = !this.props.account || this.props.isFetching ? <CircularProgress /> : <AccountContent contacts={this.props.account.Contacts.records} fields={this.props.fields} account={this.props.account} />;

    return (
      <div className="account">
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.account,
    fields: state.fields,
    isFetching: state.isFetching
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getData: () => {
      reducer.asyncActions.fetchAccountFields(dispatch).then(() => {
        reducer.asyncActions.fetchAccount(ownProps.match.params.id, dispatch);
      });
    },
    setPage: () => {
      dispatch(reducer.actions.SET_PAGE(reducer.pages.SUB));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AccountPage);
