import React from 'react';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

export default (props) =>
  <Paper zDepth={2} style={{width: '50%'}}>
    <List style={{textAlign: 'left'}}>
      <Subheader>Account details:</Subheader>
      <Divider />
      {props.fields.map((field) =>{

        if (!props.account[field.name] || typeof props.account[field.name] === 'object')
        return;

        return (<ListItem
          disabled={true}
          key={field.name}
          primaryText={field.label}
          secondaryText={
            <p>
              {props.account[field.name]}
            </p>
          }
          secondaryTextLines={1}
        />);

      })}
    </List>
  </Paper>
