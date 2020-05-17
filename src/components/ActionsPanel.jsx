import React from "react";
import { Button } from "./Button";
import { AddCarModal } from "./AddCarModal";

export class ActionsPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      carToAdd: false,
    };
  }

  render() {
    if (this.state.carToAdd) return <AddCarModal />;
    return (
      <div className="actions-panel">
        <Button
          value="Add new car"
          type="button"
          onClick={() => {
            this.setState({
              carToAdd: !this.state.carToAdd,
            })
          }}
        />
      </div>
    );
  }
}
