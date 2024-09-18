import express from "express";
import { createPassport, deletePassport, updatePassport, userPassports } from "../controller/passport.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router = express.Router();

router.post('/add',isAuthenticated,createPassport);
router.get('/user-passports',userPassports);
router.post('/delete/:passportId',isAuthenticated,deletePassport);
router.post('/update/:passportId',isAuthenticated,updatePassport);

export default router;