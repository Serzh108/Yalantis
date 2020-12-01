import { createSlice } from '@reduxjs/toolkit';

const state = {
  items: [],
  isLoading: false,
  selectedId: [],
  checkedId: [1, 2, 3],
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: state,
  reducers: {
    getEmployees: (state, { payload }) => ({
      ...state,
      items: [...payload.res],
    }),
    setChecked: (state, { payload }) => ({
      ...state,
      items: state.items.map(item =>
        item.id !== payload.id ? item : { ...item, checked: !item.checked },
      ),
      selectedId: state.selectedId.push(payload.id),
    }),
    setIsLoading: state => ({
      ...state,
      isLoading: true,
    }),
    resetIsLoading: state => ({
      ...state,
      isLoading: false,
    }),
  },
});
