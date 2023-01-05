import { useState } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../UI/Backdrop';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Modal from '../UI/Modal';

import classes from './Business.module.css';

function Business(props) {
  const [modal, setModal] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  const togleHoursHandler = (event) => {
    event.preventDefault();
    setModal((prevModal) => !prevModal);
    setBackdrop((prevBackdrop) => !prevBackdrop);
  };

  const modalPortal = ReactDOM.createPortal(
    <Modal
      name='Opening Hours'
      times={props.opening_hours}
      onClick={togleHoursHandler}
    />,
    document.getElementById('modal')
  );

  const backdropPortal = ReactDOM.createPortal(
    <Backdrop onClick={togleHoursHandler} />,
    document.getElementById('backdrop')
  );

  return (
    <Card>
      <li className={classes.meal}>
        <div>
          <p className={classes.address}>{props.name}</p>
          <p className={classes.name}>{props.address}</p>
        </div>
        <Button onClick={togleHoursHandler}>Opening Hours</Button>
      </li>
      {modal && modalPortal}
      {backdrop && backdropPortal}
    </Card>
  );
}

export default Business;
