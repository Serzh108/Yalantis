import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircleLoader from 'react-spinners/CircleLoader';
import { css } from '@emotion/core';
import { getEmployees } from '../../redux/employeesOperations';
import Employees from '../../components/Employees/Employees';
import EmployeesBd from '../../components/EmployeesBd/EmployeesBd';
import styles from './EmployeesPage.module.css';

const override = css`
  display: block;
  margin: 0 auto;
`;

export default function EmployeesPage() {
  const isLoading = useSelector(state => state.employees.isLoading);
  const items = useSelector(state => state.employees.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

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

      <Employees items={items} />
      <EmployeesBd items={items} />
    </div>
  );
}
