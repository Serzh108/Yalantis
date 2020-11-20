import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircleLoader from 'react-spinners/CircleLoader';
import { css } from '@emotion/core';
import { getEmployees, setChecked } from '../../redux/employeesOperations';
import styles from './EmployeesPage.module.css';

const override = css`
  display: block;
  margin: 0 auto;
`;

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

const ABC = [];
for (let i = 'AZ'.charCodeAt(0); i <= 'AZ'.charCodeAt(1); i++) {
  ABC.push(String.fromCharCode(i));
}

export default function EmployeesPage() {
  const isLoading = useSelector(state => state.employees.isLoading);
  const items = useSelector(state => state.employees.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const handleChange = e => {
    dispatch(setChecked(e.target.id));
  };

  // const sortByLastName = (a, b) =>
  //   a.lastName.charCodeAt(0) - b.lastName.charCodeAt(0);
  // const itemsSorted = [...items];
  // itemsSorted.sort(sortByLastName);

  const sortedByChecked = items && items.filter(item => item.checked);

  const formatDate = item => {
    const dateFormated = new Date(item);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateFormated.toLocaleString('en-GB', options);
  };

  return (
    <div className={styles.container}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            zIndex: '990',
          }}
        >
          <CircleLoader
            size={320}
            color={'#00ff6c'}
            css={override}
            loading={isLoading}
          />
        </div>
      )}

      <div className={styles.seriesList}>
        <p className={styles.title}>Employees</p>
        <div className={styles.seriesList_1}>
          {ABC.map(charItem => {
            const sortedByChar =
              items && items.filter(item => item.lastName[0] === charItem);
            return (
              <div className={styles.charBlock}>
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
            <>
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
            </>
          );
        })}
      </div>
    </div>
  );
}
