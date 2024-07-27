import { Router } from "express";
import PolygonController from "./polygon-controller";

const polygonRouter = Router();

polygonRouter.post("/create-problem", PolygonController.createNewProblem);
polygonRouter.post("/save-file", PolygonController.saveFile);
polygonRouter.post("/build-package", PolygonController.buildPackage);
polygonRouter.post("/commit-changes", PolygonController.commitChanges);
polygonRouter.post("/update-tests", PolygonController.updateTests);
polygonRouter.post("/update-sample", PolygonController.updateSample);
polygonRouter.post("/update-constraints", PolygonController.updateConstraints);
polygonRouter.post("/update-statement", PolygonController.updateStatement);
polygonRouter.post("/update-checker", PolygonController.updateChecker);
polygonRouter.post("/update-solution", PolygonController.updateSolution);
polygonRouter.get("/get-problem-by-id", PolygonController.getProblemById);

export default polygonRouter;
