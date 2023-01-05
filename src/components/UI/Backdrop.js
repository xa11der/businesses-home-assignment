import classes from './Backdrop.module.css';

function Backdrop(props) {
  return (
    <div className={classes.backdrop} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default Backdrop;
