import React from 'react';
import { useDispatch } from 'react-redux';
import { setChecked } from '../../redux/employeesOperations';
import styles from './Employees.module.css';

const ABC = [];
for (let i = 'AZ'.charCodeAt(0); i <= 'AZ'.charCodeAt(1); i++) {
  ABC.push(String.fromCharCode(i));
}

export default function Employees({ items }) {
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(setChecked(e.target.id));
  };

  return (
    <div className={styles.seriesList}>
      <p className={styles.title}>Employees</p>
      <div className={styles.seriesList_inner}>
        {ABC.map(charItem => {
          const sortedByChar =
            items && items.filter(item => item.lastName[0] === charItem);
          return (
            <div key={charItem} className={styles.charBlock}>
              <p className={styles.charItem}>{charItem}</p>
              {sortedByChar.length > 0 ? (
                sortedByChar.map(item => (
                  <label key={item.id} className={styles.label}>
                    <span>
                      {item.lastName} {item.firstName}
                    </span>
                    <input
                      id={item.id}
                      type="checkbox"
                      className={styles.checkbox}
                      checked={item.checked}
                      onChange={handleChange}
                    />
                  </label>
                ))
              ) : (
                <p>---</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
