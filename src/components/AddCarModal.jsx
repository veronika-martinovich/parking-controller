import React from "react";
//import ReactDOM from 'react-dom';
import { Button } from "./Button";
import { Loader } from "./Loader";
import { IconClose } from "./IconClose";

export class AddCarModal extends React.Component {
  constructor() {
    super();
    this.state = {
      tenants: null,
      brands: null,
      models: null,
      car_tenant: "",
      car_number: "",
      car_brand: "",
      car_model: "",
      selectedIDs: {
        car_tenant: null,
        car_brand: null,
        car_model: null,
      },
      newCarID: null
    };
  }

  async componentDidMount() {
    const responseTenants = await fetch(
      "http://80.249.84.47:11000/api/tenants/"
    );
    const tenants = await responseTenants.json();
    const responseBrands = await fetch(
      "http://80.249.84.47:11000/api/cars/brands/"
    );
    const brands = await responseBrands.json();
    console.log(tenants, brands);
    this.setState({
      tenants,
      brands,
    });
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSelectChange = (e, array) => {
    this.setState({
      [e.target.name]: e.target.value,
      selectedIDs: {
        ...this.state.selectedIDs,
        [e.target.name]: array.find((item) => item.name === e.target.value).id,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const bodyObject = {
      'car_brand': this.state.selectedIDs.car_brand,
      'car_model': this.state.selectedIDs.car_model,
      'car_number': this.state.car_number,
      'car_tenant': this.state.selectedIDs.car_tenant,
    };
    let response = await fetch("http://80.249.84.47:11000/api/cars/add/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(bodyObject),
    }); 
  };

  render() {
    if (!this.state.tenants || !this.state.brands)
      return (
        <div className="overlay">
          <Loader />
        </div>
      );

    return (
      <div className="overlay">
        <div className="modal">
          <div className="modal__header-wrapper">
            <h2 className="modal__heading">Add new car</h2>
            <IconClose onCloseIconClick={this.props.onCloseIconClick}/>
          </div>
          <form
            action=""
            className="modal__form"
            id="addCarForm"
            onSubmit={this.handleSubmit}
          >
            <select
              name="car_tenant"
              id=""
              defaultValue="Select tenant"
              className="select modal__select"
              required
              onChange={(e) => {
                this.handleSelectChange(e, this.state.tenants);
              }}
            >
              <option value="Select tenant" hidden>
                Select tenant *
              </option>
              {this.state.tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.name}>
                  {tenant.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="car_number"
              id=""
              value={this.state.car_number}
              className="input modal__input"
              placeholder="Enter car number *"
              required
              autoComplete="off"
              onChange={this.handleInputChange}
            />
            <select
              name="car_brand"
              id=""
              defaultValue="Select car brand"
              className="select modal__select"
              onChange={async (e) => {
                this.handleSelectChange(e, this.state.brands);
                const brandID = this.state.brands.find(
                  (brand) => brand.name === e.target.value
                ).id;
                const responseModels = await fetch(
                  `http://80.249.84.47:11000/api/cars/brands/${brandID}`
                );
                const models = await responseModels.json();
                this.setState({
                  models,
                });
              }}
            >
              <option value="Select car brand" hidden>
                Select car brand
              </option>
              {this.state.brands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
            <select
              name="car_model"
              id=""
              defaultValue="Select car model"
              className="select modal__select"
              onChange={(e) => {
                this.handleSelectChange(e, this.state.models);
              }}
            >
              <option value="Select car model" hidden>
                Select car model
              </option>
              {this.state.models &&
                this.state.models.map((model) => (
                  <option key={model.id} value={model.name}>
                    {model.name}
                  </option>
                ))}
            </select>
            <Button value="Add car" type="submit" />
          </form>
        </div>
      </div>
    );
  }
}
