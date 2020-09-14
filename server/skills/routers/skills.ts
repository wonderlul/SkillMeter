import express, { Request, Response, NextFunction } from "express";
import SkillsModel, { ISkills } from "../models/skills.model";
import isSkillMiddleware from "../middlewares/isSkill";

const router = express.Router();

router.get(
  "/skills",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await SkillsModel.find();

      res.send(response);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/skills",
  isSkillMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skill: ISkills = req.body;
      const newSkill = new SkillsModel({ ...skill });
      const response = await newSkill.save();
      res.status(201).send(response);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  "/skills/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await SkillsModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/skills/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await SkillsModel.findByIdAndDelete(id);
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
