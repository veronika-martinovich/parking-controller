import React from "react";
import { Button } from "./Button";
import { AddCarModal } from "./AddCarModal";

export class ActionsPanel extends React.Component {
  constructor(props) {
    super();
    this.state = {
      cars: props.cars,
      car_tenant: "",
      car_number: "",
      carToAdd: false,
    };
  }

  handleChange = async (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    if (this.state.carToAdd)
      return (
        <AddCarModal
          onCloseIconClick={() => {
            this.setState({
              carToAdd: false,
            });
          }}
        />
      );
    return (
      <div className="actions-panel">
        <Button
          value="Add new car"
          type="button"
          onClick={() => {
            this.setState({
              carToAdd: !this.state.carToAdd,
            });
          }}
        />
        <select
          name="car_tenant"
          id=""
          defaultValue="Select tenant"
          className="select actions-panel__select"
          onChange={async (e) => {
            await this.handleChange(e);
            this.props.onTenantSelect(this.state.car_tenant);
          }}
        >
          <option value="Select tenant" hidden>
            Select tenant
          </option>
          {this.state.cars.map((car) => (
            <option key={car.id} value={car.car_tenant.name}>
              {car.car_tenant.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="input actions-panel__input"
          name="car_number"
          placeholder="Enter car number"
          onChange={(e) => {
            this.handleChange(e);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.props.onNumberSearch(this.state.car_number);
            }
          }}
        />
      </div>
    );
  }
}
