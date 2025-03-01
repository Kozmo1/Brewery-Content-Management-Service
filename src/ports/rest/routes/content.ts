import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { verifyToken } from "../../../middleware/auth";
import { ContentController } from "../../../controllers/contentController";

const router = express.Router();
const contentController = new ContentController();

router.post("/",
    verifyToken,
    body("title").notEmpty().withMessage("Title is required"),
    body("type").isIn(["blog", "banner", "faq"]).withMessage("Type must be 'blog', 'banner', or 'faq'"),
    body("body").notEmpty().withMessage("Body is required"),
    (req: Request, res: Response, next: NextFunction) => contentController.createContent(req, res, next)
);

router.get("/:id",
    (req: Request, res: Response, next: NextFunction) => contentController.getContentById(req, res, next)
);

router.get("/",
    (req: Request, res: Response, next: NextFunction) => contentController.getAllContent(req, res, next)
);

router.put("/:id",
    verifyToken,
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("type").optional().isIn(["blog", "banner", "faq"]).withMessage("Type must be 'blog', 'banner', or 'faq'"),
    body("body").optional().notEmpty().withMessage("Body cannot be empty"),
    (req: Request, res: Response, next: NextFunction) => contentController.updateContent(req, res, next)
);

export = router;