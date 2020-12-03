import { createSlice } from '@reduxjs/toolkit';

const state = {
  items: [],
  selectedId: [],
  isLoading: false,
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
      selectedId: !payload.includesId
        ? [...state.selectedId, payload.id]
        : state.selectedId.filter(item => item !== payload.id),
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
