import  express  from "express";
import rateController from "../controller/rateController.js";

const rateRouter = express.Router();

rateRouter.get(
    "/api/get/total",
    rateController.total
);

rateRouter.get(
    "/api/get/correct",
    rateController.correct
);

rateRouter.post(
    "/api/post/answer",
    rateController.answer
)

export default rateRouter;