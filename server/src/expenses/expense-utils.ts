import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    const { id, cost, description } = req.body as { id: string, cost: number, description: string };

 
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
    const { id } = req.params as { id: string };

    if ( !id ) {
        return res.status(404).send({ error: "Missing required fields" });
    }

    try {
        const exists = await db.get('SELECT id FROM expenses WHERE id = ?;', [id]);
        if (exists !== ''){
            await db.run('DELETE FROM expenses WHERE id = ?;', [id]);
        } else {
            return res.status(404).send({error: "no such item"});
        }
    } catch (error) {
        return res.status(404).send({error: "failed to delete"});
    }

    res.status(204).send();
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    const expenses = await db.all('SELECT * FROM expenses');

    res.status(200).send({ "data": expenses });
}