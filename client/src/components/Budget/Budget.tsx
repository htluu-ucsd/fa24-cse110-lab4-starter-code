import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget } from "../../utils/budget-utils";

const Budget = () => {
  const {budget, setBudget} = useContext(AppContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBudget(event.currentTarget.value)
  
  };

  useEffect(() => {
    loadBudget();
    }, []);
  
    // Function to load expenses and handle errors
    const loadBudget = async () => {
    try {
      const budgetNum = await fetchBudget();
      setBudget(budgetNum);
    } catch (err: any) {
      console.log(err.message);
    }
    };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>
      <form onSubmit={(event) => onSubmit(event)}>
      <label>Budget: </label>
          <input
            required
            type="text"
            className="form-control"
            id="budget"
            value={budget}
            data-testid={"budget-input"}
            // HINT: onChange={}
            onChange={(event) => {
              setBudget(parseInt(event.target.value))
            }}
          ></input>
          </form>
          </div>
    </div>
  );
};

export default Budget;
