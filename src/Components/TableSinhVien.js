import React, { Component } from "react";
import { connect } from "react-redux";

class TableSinhVien extends Component {
  handleXoaSinhVien = (ma) => {
    const action = {
      type: "xoaSinhVien",
      payload: ma,
    };
    this.props.dispatch(action);
  };
  handleSuaSinhVien = (sinhVien) => {
    this.props.chucNang(sinhVien);
  };
  handleTimKiemSinhVien = (event) => {
    let duLieuTimKiem = { keyWords: event.target.value.toLowerCase() };
    const action = {
      type: "timKiemSinhVien",
      payload: duLieuTimKiem,
    };
    this.props.dispatch(action);
  };
  render() {
    console.log("table sinh viên");
    console.log(this.props.arrTimKiem);

    let myArrRender =
      this.props.arrTimKiem.length > 0
        ? this.props.arrTimKiem
        : this.props.arrSinhVien;

    return (
      <div style={{ textAlign: "center" }}>
        <h1>DANH SÁCH SINH VIÊN</h1>
        <div>
          <input
            type="text"
            placeholder="Tìm kiếm sinh viên"
            onChange={this.handleTimKiemSinhVien}
            style={{ width: "100%", height: "30px", padding: "0 10px" }}
          />
        </div>
        <table
          style={{
            width: "600px",
            marginTop: "10px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "black",
                color: "white",
                height: "30px",
              }}
            >
              <th>Mã</th>
              <th>Tên sinh Viên</th>
              <th>Lớp</th>
              <th>Email</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {myArrRender?.map((sinhVien, index) => {
              let { ma, ten, lop, email } = sinhVien;
              return (
                <tr
                  key={index}
                  style={{
                    height: "30px",
                    borderBottom: "1px solid silver",
                  }}
                >
                  <td>{ma}</td>
                  <td>{ten}</td>
                  <td>{lop}</td>
                  <td>{email}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => this.handleSuaSinhVien(sinhVien)}
                      style={{
                        margin: "0 5px",
                        backgroundColor: "green",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => this.handleXoaSinhVien(ma)}
                      style={{
                        margin: "0 5px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    arrSinhVien: state.duLieu.arrSinhVien,
    arrTimKiem: state.duLieu.arrTimKiem,
  };
};
const layDuLieuRedux = connect(mapStateToProps)(TableSinhVien);
export default layDuLieuRedux;
