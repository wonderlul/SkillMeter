import express, { Request, Response, NextFunction } from "express";
import EmployeeModel, { IEmployee } from "../models/employee.model";
import mongoose from "mongoose";

import isEmployeeMiddleware from "../middlewares/isEmployee";

const router = express.Router();

router.get(
  "/employees",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: { _id?: mongoose.Types.ObjectId } = req.query;

      if (query._id && mongoose.Types.ObjectId.isValid(query._id)) {
        query._id = mongoose.Types.ObjectId(`${query["_id"]}`);
      }

      const response = await EmployeeModel.find(query);

      res.send(response);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/employees/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await EmployeeModel.findById(id);
      res.send(response);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/employees",
  isEmployeeMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee: IEmployee = req.body;
      const newEmployee = new EmployeeModel({ ...employee });
      const response = await newEmployee.save();
      res.status(201).send(response);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  "/employees/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await EmployeeModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/employees/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await EmployeeModel.findByIdAndDelete(id);
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
