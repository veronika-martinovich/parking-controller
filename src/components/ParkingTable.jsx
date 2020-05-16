import React from "react";
import { IconSort } from "./IconSort";
import { dynamicSort } from "../functions/dynamicSort";

export class ParkingTable extends React.Component {
  constructor() {
    super();
    this.state = {
      cars: null,
      tenantSorting: "ascending",
      numberSorting: "ascending"
    };
  }

  async componentDidMount() {
    const response = await fetch("http://80.249.84.47:11000/api/cars/");
    const cars = await response.json();
    console.log(cars);
    this.setState({
      cars,
    });
  }

  render() {
    if (!this.state.cars) return "Loading car data";
    return (
      <table className="parking-table">
        <thead>
          <tr>
            <th className="parking-table__cell">ID</th>
            <th className="parking-table__cell">
              Tenant
              <IconSort
                onClick={() => {
                  this.setState({
                    cars:
                      this.state.tenantSorting === "descending"
                        ? this.state.cars.sort(dynamicSort("car_tenant", "name"))
                        : this.state.cars.sort(dynamicSort("-car_tenant", "name")),
                      tenantSorting:
                      this.state.tenantSorting === "descending"
                        ? "ascending"
                        : "descending",
                  });
                }}
                sorting={this.state.tenantSorting}
              />
            </th>
            <th className="parking-table__cell">
              Number
              <IconSort
                onClick={() => {
                  this.setState({
                    cars:
                      this.state.numberSorting === "descending"
                        ? this.state.cars.sort(dynamicSort("car_number"))
                        : this.state.cars.sort(dynamicSort("-car_number")),
                    numberSorting:
                      this.state.numberSorting === "descending"
                        ? "ascending"
                        : "descending",
                  });
                }}
                sorting={this.state.numberSorting}
              />
            </th>
            <th className="parking-table__cell">Brand</th>
            <th className="parking-table__cell">Model</th>
          </tr>
        </thead>
        <tbody>
          {this.state.cars.map((car) => (
            <tr key={car.id} className="parking-table__row">
              <td className="parking-table__cell">{car.id}</td>
              <td className="parking-table__cell parking-table__cell_tenant">
                {car.car_tenant.name}
              </td>
              <td className="parking-table__cell">{car.car_number}</td>
              <td
                className={
                  car.car_brand
                    ? "parking-table__cell"
                    : "parking-table__cell parking-table__cell_empty"
                }
              >
                {car.car_brand ? car.car_brand.name : "Brand"}
              </td>
              <td
                className={
                  car.car_model
                    ? "parking-table__cell"
                    : "parking-table__cell parking-table__cell_empty"
                }
              >
                {car.car_model ? car.car_model.name : "Model"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
