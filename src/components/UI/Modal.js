import { useState, useEffect, useMemo } from 'react';
import Button from './Button';

import classes from './Modal.module.css';

function Modal(props) {
  const workingHours = [];
  let helpperIndex = [];
  let helpperHours;
  const daysNamesEnum = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday',
  };

  const [mon, setMon] = useState('CLOSED');
  const [tue, setTue] = useState('CLOSED');
  const [wed, setWed] = useState('CLOSED');
  const [thu, setThu] = useState('CLOSED');
  const [fri, setFri] = useState('CLOSED');
  const [sat, setSat] = useState('CLOSED');
  const [sun, setSun] = useState('CLOSED');

  const availableDays = useMemo(() => {
    return {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    };
  }, []);

  for (const [key, value] of Object.entries(props.times.days)) {
    availableDays[key] = value;
  }

  useEffect(() => {
    if (availableDays.monday) {
      setMon(
        `${availableDays.monday[0].start} - ${availableDays.monday[0].end} # ${availableDays.monday[1].start} - ${availableDays.monday[1].end}`
      );
    }
    if (availableDays.tuesday) {
      setTue(
        `${availableDays.tuesday[0].start} - ${availableDays.tuesday[0].end} # ${availableDays.tuesday[1].start} - ${availableDays.tuesday[1].end}`
      );
    }
    if (availableDays.wednesday) {
      setWed(
        `${availableDays.wednesday[0].start} - ${availableDays.wednesday[0].end} # ${availableDays.wednesday[1].start} - ${availableDays.wednesday[1].end}`
      );
    }
    if (availableDays.thursday) {
      setThu(
        `${availableDays.thursday[0].start} - ${availableDays.thursday[0].end} # ${availableDays.thursday[1].start} - ${availableDays.thursday[1].end}`
      );
    }
    if (availableDays.friday) {
      setFri(
        `${availableDays.friday[0].start} - ${availableDays.friday[0].end} # ${availableDays.friday[1].start} - ${availableDays.friday[1].end}`
      );
    }
    if (availableDays.saturday) {
      setSat(
        `${availableDays.saturday[0].start} - ${availableDays.saturday[0].end}`
      );
    }
    if (availableDays.sunday) {
      setSun(
        `${availableDays.sunday[0].start} - ${availableDays.sunday[0].end}`
      );
    }
  }, [availableDays]);

  const days = [mon, tue, wed, thu, fri, sat, sun];

  for (let i = 0; i < days.length; i++) {
    if (
      days[i] === days[i + 1 < days.length ? i + 1 : days.at(-1)] &&
      days[i] !== 'CLOSED'
    ) {
      helpperIndex.push(i, i + 1);
      helpperHours = days[i];
    } else if (days[i] === 'CLOSED')
      workingHours.push(`${daysNamesEnum[i]} ^ ${days[i]} % ${i}`);
    else workingHours.push(`${daysNamesEnum[i + 1]} ^ ${days[i + 1]} % ${i}`);
  }

  workingHours.splice(-1);
  workingHours.push(
    `${daysNamesEnum[helpperIndex[0]]} - ${
      daysNamesEnum[helpperIndex.at(-1)] || daysNamesEnum[4]
    } ^ ${helpperHours} % ${helpperIndex[0]}`
  );

  workingHours.sort((a, b) => {
    return a.split('%')[1] - b.split('%')[1];
  });

  return (
    <div className={classes.modal}>
      <h2>{props.name}</h2>
      <ul>
        {workingHours.map((el, id) => (
          <li key={id}>
            <div className={classes['day-time']}>
              <p>{el.split('^')[0]}</p>
              <p>{el.split('^')[1].split('%')[0].split('#')[0]}</p>
            </div>
            <p className={classes['paragraph-right']}>
              {el.split('%')[0].split('#')[1]}
            </p>
          </li>
        ))}
      </ul>
      <div className={classes.center}>
        <Button onClick={props.onClick}>Close</Button>
      </div>
    </div>
  );
}

export default Modal;
