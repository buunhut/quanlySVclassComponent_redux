import { configureStore } from "@reduxjs/toolkit";
const initialState = {
  arrSinhVien: [],
  sinhVien: {
    ma: "",
    ten: "",
    lop: "",
    email: "",
  },
};
export const store = configureStore({
  reducer: {
    duLieu: (state = initialState, action) => {
      //đường dispatch về
      switch (action.type) {
        case "themSinhVien":
          let arrSinhVien = [...state.arrSinhVien, action.payload];
          return {
            ...state,
            arrSinhVien,
          };
        case "xoaSinhVien":
          let index = state.arrSinhVien.findIndex((item) => {
            return item.ma === action.payload;
          });
          let xoaArrSinhVien = [...state.arrSinhVien];
          xoaArrSinhVien.splice(index, 1);
          return {
            ...state,
            arrSinhVien: xoaArrSinhVien,
          };

        case "capnhat":
          let viTri = state.arrSinhVien.findIndex((sinhVien) => {
            return sinhVien.ma === action.payload.ma;
          });
          let capNhatArrSinhVien = [...state.arrSinhVien];

          capNhatArrSinhVien[viTri] = action.payload;
          return {
            ...state,
            arrSinhVien: capNhatArrSinhVien,
          };
        default:
          return state;
      }
    },
  },
});
