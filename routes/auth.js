

import { Router } from 'express';
import * as authController from '../controllers/authController.js';

const router = Router();

router.get('/signup', (req, res) => {
  res.render('signup');
});



router.get('/login', (req, res) => {
  res.render('login');
});


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;
