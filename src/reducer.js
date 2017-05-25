import axios from 'axios';

const apiServerUrl = 'http://localhost:3003/';

const pages = {
  MAIN: 'MAIN',
  SUB: 'SUB'
};

const actionTypes = {
  FETCH_START: 'FETCH_START',
  SET_ACCOUNTS_LIST: 'SET_ACCOUNTS_LIST',
  SET_ACCOUNT: 'SET_ACCOUNT',
  FETCH_STOP: 'FETCH_STOP',
  SET_ACCOUNT_FIELDS: 'SET_ACCOUNT_FIELDS',
  SET_PAGE: 'SET_PAGE'
};

const initialState = {
  isFetching: false,
  accounts: null,
  account: null,
  fields: [],
  page: pages.MAIN
};

const actions = {

  FETCH_START:() => {
    return { type: actionTypes.FETCH_START, text: 'Starts fetching' };
  },
  SET_ACCOUNT_FIELDS: (fields) => {
    return { type: actionTypes.SET_ACCOUNT_FIELDS, text: 'Set account fields.', fields };
  },
  SET_ACCOUNTS_LIST:(accounts) => {
    return { type: actionTypes.SET_ACCOUNTS_LIST, text: 'Set accounts list in app.', accounts };
  },
  SET_ACCOUNT:(account) => {
    return { type: actionTypes.SET_ACCOUNT, text:'Set Account Data into app.', account };
  },
  FETCH_STOP:() => {
    return { type: actionTypes.FETCH_STOP, text:'Get Single Account data.' };
  },
  SET_PAGE:(page) => {
    return { type: actionTypes.SET_PAGE, text:'Set page.', page };
  }
};

// ACTIONS WITH INVOLVING OF ASYNC REQUESTS
const asyncActions = {
  fetchAccountFields: (dispatch) => {
    dispatch(actions.FETCH_START());
    return axios.get(apiServerUrl + 'fields').then((results) => {
      dispatch(actions.SET_ACCOUNT_FIELDS(results.data));
      dispatch(actions.FETCH_STOP());
    });
  },
  fetchAccounts: (dispatch) => {
    dispatch(actions.FETCH_START());
    return axios.get(apiServerUrl + 'accounts').then((results) => {
      dispatch(actions.SET_ACCOUNTS_LIST(results.data));
      dispatch(actions.FETCH_STOP());
    });
  },
  fetchAccount: (id, dispatch) => {
    dispatch(actions.FETCH_START());
    return axios.get(apiServerUrl + 'accounts/' + id).then((results) => {
      dispatch(actions.SET_ACCOUNT(results.data[0]));
      dispatch(actions.FETCH_STOP());
    });
  }
};

function reducer(state = initialState, action) {

  const newState = Object.assign({}, state);

  if (action.type === actionTypes.FETCH_START ) {
    newState.isFetching = true;
  }

  if (action.type === actionTypes.SET_ACCOUNT_FIELDS) {
    newState.fields = action.fields;
  }

  if (action.type === actionTypes.SET_ACCOUNTS_LIST ) {
    newState.accounts = action.accounts;
  }

  if (action.type === actionTypes.SET_ACCOUNT ) {
    newState.account = action.account;
  }

  if (action.type === actionTypes.FETCH_STOP ) {
    newState.isFetching = false;
  }

  if (action.type === actionTypes.SET_PAGE ) {
    newState.page = action.page;
  }

  return newState;
}

export default { pages, asyncActions, actions, main: reducer };
