import { Router } from "express";
import Blog from "../Controller/Blogs.js";
const router = Router();

router.post("/:userId", Blog.BlogCreated);
router.get("/:userId", Blog.BlogReadAll);
router.put("/:blogId", Blog.BlogUpdate);
router.delete("/:blogId", Blog.BlogDelete);

export default router;
