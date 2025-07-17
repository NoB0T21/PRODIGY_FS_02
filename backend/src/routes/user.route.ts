import { login, create, valid, users, remove, getuser, update } from "../Controller/user.controller";
import express from "express";
import multer from "multer";
import middleware from "../middleware/middleware";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post('/create',middleware,upload.single('file'),create)
router.post('/update/:id',middleware,upload.single('file'),update)
router.post('/signin',upload.none(),login)
router.get('/valid',middleware,valid)
router.get('/get',middleware,users)
router.get('/get/:id',middleware,getuser)
router.get('/delete/:id',middleware,remove)

export default router;