import express from 'express'
import { loginController } from '../controllers/users_login.js'
import { signupController } from '../controllers/users_signup.js'
import { checkExistingEmail, checkExistingUsername } from '../controllers/validation.js'

const router = express.Router()

router.post('/signup', signupController)
router.post('/login', loginController)

router.post('/check/email', checkExistingEmail)
router.post('/check/username', checkExistingUsername)

export { router }