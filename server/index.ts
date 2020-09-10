require("dotenv").config();
import express, { Request, Response, Application, NextFunction } from "express";
import mongoose, { Error } from "mongoose";
import EmployeeModel, { IEmployee } from "./models/employee.model";
import { resolveSoa } from "dns";
import { nextTick } from "process";

const PORT = 8000;

mongoose.connect(`${process.env.MONGODB_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app: Application = express();
app.use(express.json());

app.get(
  "/employees",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: { _id?: mongoose.Types.ObjectId } = req.query;
      console.log(query);

      if ("_id" in query) {
        console.log(query);
        query._id = mongoose.Types.ObjectId(`${query["_id"]}`);
      }

      if (query._id && mongoose.Types.ObjectId.isValid(query._id)) {
        console.log("valid!!!!");
      }

      const response = await EmployeeModel.find(query);

      console.log(response);
      res.send(response);

      // (error: Error, response) => {
      //   if (error) {
      //     throw error;
      //   } else {
      //     res.send(response);
      //   }
      // }
    } catch (e) {
      next(e);
    }
  }
);

app.get("/employees/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const ad = await EmployeeModel.findById(id, (error, response) => {
    if (error) {
      throw error;
    } else {
      res.send(response);
    }
  });
});

app.post("/employees", async (req: Request, res: Response) => {
  const employee: IEmployee = req.body;
  const newEmployee = new EmployeeModel({ ...employee });
  await newEmployee.save((error: Error, response) => {
    if (error) {
      throw error;
    } else {
      res.status(201).send(response);
    }
  });
});

app.patch("/:id", (req: Request, res: Response) => {});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error:", error.message);
  if (error.code) {
    res.status(error.code);
  }
  res.send(`There was na error: ${error.message}`);
});

app.get("/", (req, res) => res.send("Express + TypeScript Server"));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
