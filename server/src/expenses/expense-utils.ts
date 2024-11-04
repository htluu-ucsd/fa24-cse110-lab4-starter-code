import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    const { id, cost, description } = req.body;
 
    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }
 
    try {
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
    res.status(201).send({ id, description, cost });
 
 
 }
 

export async function deleteExpense(req: Request, res: Response, db: Database) {
    // TO DO: Implement deleteExpense function
    const { id } = req.params;

    if ( !id ) {
        return res.status(404).send({ error: "Missing required fields" });
    }

    try {
        const exists = await db.get('SELECT EXISTS(SELECT 1 FROM expenses WHERE id = (?));', [id]);
        if (exists === 1){
            await db.run('DELETE FROM expenses WHERE id = (?);', [id]);
        } else {
            return res.status(404).send({error: "no such item"});
        }
    } catch (error) {
        return res.status(404).send({error: "no such item"});
    }

    res.status(204).send();
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}