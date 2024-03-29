import express from 'express';

import { createUser, loginUser , handleGoogleAuth} from '../controller/Auth.js';
const router = express.Router();

router.post('/signup', createUser)    // done
.post('/login', loginUser)            // done
.post('/google', handleGoogleAuth)   // done     
// .get('/check', checkAuth)
// .get('/logout', logout)
// .post('/reset-password-request', resetPasswordRequest)
// .post('/reset-password', resetPassword)

export default router;