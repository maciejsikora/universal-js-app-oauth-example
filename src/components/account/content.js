import React from 'react';
import AccountDetails from './details';
import AccountContacts from './contacts';

export default (props) =>
<div style={{display: 'flex'}}>
  <AccountDetails style={{float: 'left'}} fields={props.fields} account={props.account}/>
  <AccountContacts contacts={props.contacts}/>
</div>
