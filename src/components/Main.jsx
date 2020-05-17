import React from "react";
import { ParkingTable } from "./ParkingTable";
import { ActionsPanel } from "./ActionsPanel";
import { Loader } from "./Loader";

export class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      cars: null,
      filteredCars: null
    }
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
    if (!this.state.cars) return <Loader/>;
    return (
      <main className="main">
        <ActionsPanel cars={this.state.cars}
        onTenantSelect={(tenant) => {
          this.setState({
            filteredCars: this.state.cars.filter(item => item.car_tenant.name === tenant)
          })
        }}/>
        <ParkingTable cars={this.state.filteredCars ? this.state.filteredCars : this.state.cars}/>
      </main>
    );
  }
 
};
