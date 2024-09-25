import React from 'react';
import { Alert } from 'react-bootstrap';

export default function PersonalProtectiveEquipmentTransitionAlert(props) {

  return (
    <div> 

  <Alert className='bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3' variant={props.type} onClose={props.isAlert} dismissible>
    {props.message}
  </Alert>


     
</div> 
  );
}
