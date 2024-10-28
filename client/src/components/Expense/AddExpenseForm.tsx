import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {v4 as uuidv4} from "uuid";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses} = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const currentExpense = {
      id: uuidv4(), 
      name: name, 
      cost: cost
    };
    

    // appCon.setExpenses(prev => [...prev, currentExpense]);
    setExpenses([...expenses, currentExpense]);
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            data-testid={"name-input"}
            // HINT: onChange={}
            onChange={(event) => {
              setName(event.target.value)
            }}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            data-testid={"cost-input"}
            // HINT: onChange={}
            onChange={(event) => {
              setCost(parseInt(event.target.value))
            }}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3" data-testid={"save-button"}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;