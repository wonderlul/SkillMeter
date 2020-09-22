import express, { Request, Response, NextFunction } from "express";
import EmployeeModel, { IEmployee } from "../models/employee.model";

import isEmployeeMiddleware from "../middlewares/isEmployee";

const router = express.Router();

router.get(
  "/employees",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1 } = req.query;
      const limit = 5;

      const employees = await EmployeeModel.find()
        .populate({
          path: "skills",
          populate: {
            path: "skill",
            select: "_id name category weight",
          },
        })
        .limit(limit)
        .skip((+page - 1) * limit)
        .sort({ startWorkDate: -1 });

      const count = await EmployeeModel.countDocuments();

      res.send({
        employees,
        count,
      });
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

router.patch(
  "/employees/:employeeId/skill/:skillId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { employeeId, skillId } = req.params;
    const { level } = req.body;

    try {
      const response = await EmployeeModel.updateOne(
        { _id: employeeId, "skills._id": skillId },
        { $set: { "skills.$.level": level } }
      );

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
