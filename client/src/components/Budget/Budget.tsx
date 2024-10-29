import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const {budget, setBudget} = useContext(AppContext);

  useEffect(() => {
    loadBudget();
    }, []);
  
    // Function to load budget and handle errors
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
      <label>Budget: ${budget}</label>
          <input
            required
            type="text"
            className="form-control"
            id="budget"
            value={budget}
            data-testid={"budget-input"}
            // HINT: onChange={}
            onChange={(event) => {
              updateBudget(parseInt(event.target.value))
              setBudget(parseInt(event.target.value))
            }}
          ></input>
          </div>
    </div>
  );
};

export default Budget;
