import axios from 'axios';
import { employeesSlice } from './employeesReduser';

const url = 'https://yalantis-react-school-api.yalantis.com/api/task0/users';

const getEmployees = () => async (dispatch, getState) => {
  dispatch(employeesSlice.actions.setIsLoading());
  try {
    const employeesArray = await axios.get(url);
    const result = [...employeesArray.data];
    const { selectedId } = getState().employees;
    // let res = result.map(item => ({ ...item, checked: false }));
    const res = result.map(item =>
      selectedId.includes(item.id)
        ? { ...item, checked: true }
        : { ...item, checked: false },
    );
    // const fromLocalRes = res.map(item =>
    //   selectedId.includes(item.id) ? { ...item, checked: true } : item,
    // );
    // res = fromLocalRes;
    dispatch(employeesSlice.actions.getEmployees({ res }));
  } catch (err) {
    console.log('getEmployees error', err);
  }
  dispatch(employeesSlice.actions.resetIsLoading());
};

const setChecked = id => async (dispatch, getState) => {
  const { selectedId } = getState().employees;
  const includesId = selectedId.includes(id);
  dispatch(employeesSlice.actions.setChecked({ id, includesId }));
};

export { getEmployees, setChecked };
