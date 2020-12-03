import React from 'react';
import styles from './EmployeesBd.module.css';

const MONTH_LIST = [
  'January',
  'Fubruary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function EmployeesBd({ items }) {
  const sortedByChecked = items && items.filter(item => item.checked);

  const formatDate = item => {
    const dateFormated = new Date(item);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateFormated.toLocaleString('en-GB', options);
  };

  return (
    <div className={styles.listDob}>
      <p className={styles.title}>Employees birthday</p>

      {sortedByChecked.length > 0 ? null : (
        <p className={styles.noSelected}>No selected employees</p>
      )}

      {MONTH_LIST.map((monthItem, idx) => {
        const sortedByDob = sortedByChecked.filter(
          item => +item.dob.slice(5, 7) === idx + 1,
        );

        return (
          <div key={idx}>
            {sortedByDob.length > 0 ? (
              <p key={monthItem} className={styles.charItem}>
                {monthItem}
              </p>
            ) : null}
            {sortedByDob.length > 0 &&
              sortedByDob.map(item => (
                <p key={item.id}>
                  {item.lastName} {item.firstName} - {formatDate(item.dob)}
                </p>
              ))}
          </div>
        );
      })}
    </div>
  );
}
