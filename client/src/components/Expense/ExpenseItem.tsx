import { useContext } from "react";
import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext";
import { deleteExpense } from "../../utils/expense-utils";
import exp from "constants";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses} = useContext(AppContext);

  const handleDeleteExpense = (currentExpense: Expense) => {
    // Exercise: Remove expense from expenses context array
    deleteExpense(currentExpense.id); //POTENIALLY PART OF BUG, DELETES LAST ITEM INSTEAD OF BY ID
    // console.log(currentExpense.description);

    setExpenses(prev => prev.filter(expense => expense.id !== currentExpense.id));

  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
