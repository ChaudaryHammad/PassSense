import express from "express";
import { createPassport, deletePassport, updatePassport, userPassports } from "../controller/passport.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router = express.Router();

router.post('/add',isAuthenticated,createPassport);
router.get('/user-passports',isAuthenticated,userPassports);
router.delete('/delete/:passportId',isAuthenticated,deletePassport);
router.post('/update/:passportId',isAuthenticated,updatePassport);

export default router;