import React from 'react';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

export default (props) =>
  <Paper zDepth={2} style={{width: '50%'}}>
    <List style={{textAlign: 'left'}}>
      <Subheader>Contacts:</Subheader>
      <Divider />
      {props.contacts.map((contact) => {
        return (
        <ListItem
          disabled={true}
          key={contact.Id}
          primaryText={contact.FirstName + ' ' + contact.LastName}
          secondaryText={
            <p>
              {contact.Phone}, {contact.Title}
            </p>
          }
          secondaryTextLines={1}
        />);
      })}
    </List>
  </Paper>
