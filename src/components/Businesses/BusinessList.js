import { useEffect, useState } from 'react';
import Business from './Business';

import classes from './BusinessList.module.css';

function BusinessList() {
  const [business, setBusiness] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(
        'https://storage.googleapis.com/coding-session-rest-api/GXvPAor1ifNfpF0U5PTG0w'
      ),
      fetch(
        'https://storage.googleapis.com/coding-session-rest-api/ohGSnJtMIC5nPfYRi_HTAg'
      ),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        const combinedData = [data1, data2].map((el) => {
          return {
            id: el.local_entry_id,
            displayed_what: el.displayed_what,
            displayed_where: el.displayed_where,
            opening_hours: el.opening_hours,
          };
        });
        setBusiness(combinedData);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={classes.businesses}>
      <ul>
        {!isLoading &&
          business.map((business) => (
            <Business
              key={business.id}
              name={business.displayed_what}
              address={business.displayed_where}
              opening_hours={business.opening_hours}
            />
          ))}
        {isLoading && <p>Loading...</p>}
      </ul>
    </div>
  );
}

export default BusinessList;
