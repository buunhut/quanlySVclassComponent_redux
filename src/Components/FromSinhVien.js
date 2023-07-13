import React, { Component } from "react";
import { connect } from "react-redux";
import TableSinhVien from "./TableSinhVien";

class FromSinhVien extends Component {
  state = {
    sinhVien: {
      ma: "",
      ten: "",
      lop: "",
      email: "",
    },
    error: {
      ma: "",
      ten: "",
      lop: "",
      email: "",
    },
    nutThem: true,
    disabled: true,
    lockMa: false,
  };
  getInput = (event) => {
    let input = event.target;
    let { id, value } = input;
    let sinhVien = { ...this.state.sinhVien };
    sinhVien[id] = value;
    let error = { ...this.state.error };
    if (value === "") {
      error[id] = "Không được bỏ trống";
    } else {
      error[id] = "";
      // Kiểm tra định dạng email
      if (id === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error[id] = "Định dạng email không hợp lệ";
        }
      }
      // Kiểm tra định dạng tên không chứa ký tự đặc biệt và số
      if (id === "ten") {
        const nameRegex = /^[a-zA-Z\sÀ-ỹ]+$/;
        if (!nameRegex.test(value)) {
          error[id] = "Tên không được chứa ký tự đặc biệt và số";
        }
      }
    }
    this.setState(
      {
        ...this.state,
        sinhVien,
        error,
      },
      () => {
        let checkValid = Object.values(this.state.sinhVien).every(
          (value) => value !== ""
        );
        this.setState({
          disabled: !checkValid,
        });
      }
    );
  };
  chucNangSuaSinhVien = (sinhVien) => {
    this.setState({
      ...this.state,
      sinhVien,
      error: {
        ma: "",
        ten: "",
        lop: "",
        email: "",
      },

      nutThem: false,
      lockMa: true,
    });
  };
  handleThemCapNhat = () => {
    let { sinhVien, error } = this.state;
    for (let key in sinhVien) {
      if (sinhVien[key] === "") {
        error[key] = "Không được bỏ trống";

        this.setState({
          ...this.state,
          error,
        });
      }
    }

    let checkValid = true;
    for (let key in this.state.error) {
      if (this.state.error[key] !== "") {
        checkValid = false;
      }
    }

    if (checkValid) {
      const action = this.state.nutThem
        ? //code của chức năng thêm
          {
            type: "themSinhVien",
            payload: sinhVien,
          }
        : // code của chức năng cập nhật
          {
            type: "capnhat",
            payload: sinhVien,
          };
      this.props.dispatch(action);
      this.setState({
        ...this.state,
        sinhVien: {
          ma: "",
          ten: "",
          lop: "",
          email: "",
        },
        error: {
          ma: "",
          ten: "",
          lop: "",
          email: "",
        },
        nutThem: true,
        lockMa: false,
      });
    } else {
      return;
    }
  };
  render() {
    console.log("form sinh viên");
    return (
      <div id="sinhVien">
        <div style={{ textAlign: "center" }}>
          <h1>QUẢN LÝ SINH VIÊN</h1>
          <form action="" style={{ width: "400px", marginTop: "10px" }}>
            <div>
              <input
                id="ma"
                value={this.state.sinhVien.ma}
                type="text"
                placeholder="Mã SV"
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  height: "30px",
                  padding: "0 10px",
                }}
                disabled={this.state.lockMa}
                onChange={this.getInput}
                onBlur={this.getInput}
              />
              <p
                style={{ marginBottom: "5px", color: "red", textAlign: "left" }}
              >
                {this.state.error.ma}
              </p>
            </div>
            <div>
              <input
                id="ten"
                value={this.state.sinhVien.ten}
                type="text"
                placeholder="Tên SV"
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  height: "30px",
                  padding: "0 10px",
                }}
                onChange={this.getInput}
                onBlur={this.getInput}
              />
              <p
                style={{ marginBottom: "5px", color: "red", textAlign: "left" }}
              >
                {this.state.error.ten}
              </p>
            </div>
            <div>
              <input
                id="lop"
                value={this.state.sinhVien.lop}
                type="text"
                placeholder="Lớp"
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  height: "30px",
                  padding: "0 10px",
                }}
                onChange={this.getInput}
                onBlur={this.getInput}
              />
              <p
                style={{ marginBottom: "5px", color: "red", textAlign: "left" }}
              >
                {this.state.error.lop}
              </p>
            </div>
            <div>
              <input
                id="email"
                value={this.state.sinhVien.email}
                type="text"
                placeholder="email"
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  height: "30px",
                  padding: "0 10px",
                }}
                onChange={this.getInput}
                onBlur={this.getInput}
              />
              <p
                style={{ marginBottom: "5px", color: "red", textAlign: "left" }}
              >
                {this.state.error.email}
              </p>
            </div>
            <div>
              <button
                type="button"
                style={{
                  width: "100%",
                  height: "30px",
                  border: "none",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
                // disabled={this.state.disabled}
                onClick={this.handleThemCapNhat}
              >
                {this.state.nutThem ? "Thêm" : "Cập nhật"}
              </button>
            </div>
          </form>
        </div>
        <TableSinhVien chucNang={this.chucNangSuaSinhVien} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sinhVien: state.duLieu.sinhVien,
  };
};
const layDuLieuRedux = connect(mapStateToProps)(FromSinhVien);
export default layDuLieuRedux;
