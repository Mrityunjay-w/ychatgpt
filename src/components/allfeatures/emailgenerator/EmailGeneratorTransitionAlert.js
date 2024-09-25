import React from 'react';
import { Alert } from 'react-bootstrap';

export default function EmailGeneratorTransitionAlert(props) {

  return (
    <div>

      <Alert variant={props.type} onClose={props.isAlert} dismissible>
        {props.message}
      </Alert>



    </div>
  );
}
