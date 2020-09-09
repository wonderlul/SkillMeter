require("dotenv").config();
import express, { Request, Response, Application } from "express";
import mongoose, { Error } from "mongoose";
import EmployeeModel, { IEmployee } from "./models/employee.model";

mongoose.connect(`${process.env.MONGODB_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app: Application = express();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  const employees = await EmployeeModel.find();
  res.send(employees);
});

app.post("/", async (req: Request, res: Response) => {
  const employee: IEmployee = req.body;
  // const newEmployee = new EmployeeModel({ ...employee });
  // await newEmployee.save((error: Error, response) => {
  //   if (error) {
  //     throw error;
  //   } else {
  //     res.status(201).send(response);
  //   }
  // });
  res.send(employee);
});

const PORT = 8000;
app.get("/", (req, res) => res.send("Express + TypeScript Server"));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
