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
  render() {
    console.log("table sinh viên");

    return (
      <div style={{ textAlign: "center" }}>
        <h1>DANH SÁCH SINH VIÊN</h1>
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
            {this.props.arrSinhVien?.map((sinhVien, index) => {
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
  };
};
const layDuLieuRedux = connect(mapStateToProps)(TableSinhVien);
export default layDuLieuRedux;
