import axios from 'axios';
import { employeesSlice } from './employeesReduser';

const url = 'https://yalantis-react-school-api.yalantis.com/api/task0/users';

const getEmployees = () => async (dispatch, getState) => {
  dispatch(employeesSlice.actions.setIsLoading());
  try {
    const employeesArray = await axios.get(url);
    const result = [...employeesArray.data];
    const res = result.map(item => ({ ...item, checked: false }));
    dispatch(employeesSlice.actions.getEmployees({ res }));
  } catch (err) {
    console.log('getEmployees error', err);
  }
  dispatch(employeesSlice.actions.resetIsLoading());
};

const setChecked = id => async (dispatch, getState) => {
  dispatch(employeesSlice.actions.setChecked({ id }));
};

export { getEmployees, setChecked };
