import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
  }
  
  export default function Deposits() {
    return (
      <React.Fragment>
        <Title>Recent New Users</Title>
        <Typography component="p" variant="h4">
          34
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          on 12 November, 2022
        </Typography>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            View balance
          </Link>
        </div>
      </React.Fragment>
    );
  }