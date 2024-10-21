import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


describe("My Budget Tracker", () => {

  test("expense creation positive", () =>{
    render(<App />);
    const nameInput = screen.getByTestId("name-input");
    const costInput = screen.getByTestId("cost-input");
    const saveButton = screen.getByTestId("save-button");

    const oldBalance = screen.getByText("Remaining: $1000");
    const budget = screen.getByText("Budget: $1000")
    const spent = screen.getByText("Spent so far: $0")

    expect(oldBalance).toBeInTheDocument();
    expect(budget).toBeInTheDocument();
    expect(spent).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: "Groceries"} })
    fireEvent.change(costInput, { target: { value: "50"} })
    fireEvent.click(saveButton);
    
    const nameText = screen.getByText("Groceries");
    const costText = screen.getByText("$50");

    expect(nameText).toBeInTheDocument();
    expect(costText).toBeInTheDocument();

    const newBalance = screen.getByText("Remaining: $950");
    const newSpent = screen.getByText("Spent so far: $50");

    expect(newBalance).toBeInTheDocument();
    expect(newSpent).toBeInTheDocument();

  })
  
    test("expense creation negative", () =>{
      render(<App />);
      const nameInput = screen.getByTestId("name-input");
      const costInput = screen.getByTestId("cost-input");
      const saveButton = screen.getByTestId("save-button");

      const oldBalance = screen.getByText("Remaining: $1000");
      const budget = screen.getByText("Budget: $1000")
      const spent = screen.getByText("Spent so far: $0")

      expect(oldBalance).toBeInTheDocument();
      expect(budget).toBeInTheDocument();
      expect(spent).toBeInTheDocument();

      fireEvent.change(nameInput, { target: { value: "Luxury Car"} })
      fireEvent.change(costInput, { target: { value: "100000"} })
      fireEvent.click(saveButton);
      
      const nameText = screen.getByText("Luxury Car");
      const costText = screen.getByText("$100000");

      expect(nameText).toBeInTheDocument();
      expect(costText).toBeInTheDocument();

      const newBalance = screen.getByText("Remaining: $-99000");
      const newSpent = screen.getByText("Spent so far: $100000");

      expect(newBalance).toBeInTheDocument();
      expect(newSpent).toBeInTheDocument();

    })

    test("expense creation multiple", () =>{
      render(<App />);
      const nameInput = screen.getByTestId("name-input");
      const costInput = screen.getByTestId("cost-input");
      const saveButton = screen.getByTestId("save-button");
  
      fireEvent.change(nameInput, { target: { value: "Book"} })
      fireEvent.change(costInput, { target: { value: "15"} })
      fireEvent.click(saveButton);

      fireEvent.change(nameInput, { target: { value: "Cookies"} })
      fireEvent.change(costInput, { target: { value: "5"} })
      fireEvent.click(saveButton);

      fireEvent.change(nameInput, { target: { value: "Phone"} })
      fireEvent.change(costInput, { target: { value: "800"} })
      fireEvent.click(saveButton);
      
      const name1Text = screen.getByText("Book");
      const cost1Text = screen.getByText("$15");
      const name2Text = screen.getByText("Cookies");
      const cost2Text = screen.getByText("$5");
      const name3Text = screen.getByText("Phone");
      const cost3Text = screen.getByText("$800");
  
      expect(name1Text).toBeInTheDocument();
      expect(cost1Text).toBeInTheDocument();
      expect(name2Text).toBeInTheDocument();
      expect(cost2Text).toBeInTheDocument();
      expect(name3Text).toBeInTheDocument();
      expect(cost3Text).toBeInTheDocument();
  
      const newBalance = screen.getByText("Remaining: $180");
      const newSpent = screen.getByText("Spent so far: $820");
  
      expect(newBalance).toBeInTheDocument();
      expect(newSpent).toBeInTheDocument();
  
    })

    test("expense deletion", () =>{
      render(<App />);
      const nameInput = screen.getByTestId("name-input");
      const costInput = screen.getByTestId("cost-input");
      const saveButton = screen.getByTestId("save-button");
      
      fireEvent.change(nameInput, { target: { value: "Luxury Car"} })
      fireEvent.change(costInput, { target: { value: "100000"} })
      fireEvent.click(saveButton);

      const delButton = screen.getAllByText("x");
      const nameText = screen.getByText("Luxury Car");
      const costText = screen.getByText("$100000");
      
      fireEvent.click(delButton[0]);

      expect(nameText).not.toBeInTheDocument();
      expect(costText).not.toBeInTheDocument();

      const finalBalance = screen.getByText("Remaining: $1000");
      const finalSpent = screen.getByText("Spent so far: $0");
      
      expect(finalBalance).toBeInTheDocument();
      expect(finalSpent).toBeInTheDocument();
      
    })

    test("expense deletion multiple", () =>{
      render(<App />);
      const nameInput = screen.getByTestId("name-input");
      const costInput = screen.getByTestId("cost-input");
      const saveButton = screen.getByTestId("save-button");
  
      fireEvent.change(nameInput, { target: { value: "Book"} })
      fireEvent.change(costInput, { target: { value: "15"} })
      fireEvent.click(saveButton);

      fireEvent.change(nameInput, { target: { value: "Cookies"} })
      fireEvent.change(costInput, { target: { value: "5"} })
      fireEvent.click(saveButton);

      fireEvent.change(nameInput, { target: { value: "Phone"} })
      fireEvent.change(costInput, { target: { value: "800"} })
      fireEvent.click(saveButton);
      
      const name1Text = screen.getByText("Book");
      const cost1Text = screen.getByText("$15");
      const name2Text = screen.getByText("Cookies");
      const cost2Text = screen.getByText("$5");
      const name3Text = screen.getByText("Phone");
      const cost3Text = screen.getByText("$800");
      
      for (let i = 0; i < 3; i++) {
        const delButton = screen.getAllByText("x");
        fireEvent.click(delButton[0]);
      }
      
      expect(name1Text).not.toBeInTheDocument();
      expect(cost1Text).not.toBeInTheDocument();
      expect(name2Text).not.toBeInTheDocument();
      expect(cost2Text).not.toBeInTheDocument();
      expect(name3Text).not.toBeInTheDocument();
      expect(cost3Text).not.toBeInTheDocument();
  
      const newBalance = screen.getByText("Remaining: $1000");
      const newSpent = screen.getByText("Spent so far: $0");
  
      expect(newBalance).toBeInTheDocument();
      expect(newSpent).toBeInTheDocument();
  
    })

    test("budget balance verification", () =>{
      render(<App />);
      const nameInput = screen.getByTestId("name-input");
      const costInput = screen.getByTestId("cost-input");
      const saveButton = screen.getByTestId("save-button");

      const oldBalance = screen.getByText("Remaining: $1000");
      const budget = screen.getByText("Budget: $1000")
      const spent = screen.getByText("Spent so far: $0")

      expect(oldBalance).toBeInTheDocument();
      expect(budget).toBeInTheDocument();
      expect(spent).toBeInTheDocument();
      
      fireEvent.change(nameInput, { target: { value: "Luxury Car"} })
      fireEvent.change(costInput, { target: { value: "100000"} })
      fireEvent.click(saveButton);

      const delButton = screen.getAllByText("x");

      const newBalance = screen.getByText("Remaining: $-99000");
      const newSpent = screen.getByText("Spent so far: $100000");

      expect(newBalance).toBeInTheDocument();
      expect(newSpent).toBeInTheDocument();

      fireEvent.click(delButton[0]);
      
      const finalBalance = screen.getByText("Remaining: $1000");
      const finalSpent = screen.getByText("Spent so far: $0");

      expect(finalBalance).toBeInTheDocument();
      expect(finalSpent).toBeInTheDocument();
      
    })
  }
); 

