import { usertModel as User } from '../models/user.js'
import bcrypt from "bcryptjs"
import { commons, signup_messages as msg } from '../static/message.js'
import jwt from 'jsonwebtoken'
import { server } from '../static/config.js'

const signup = async (req, res, next) => {

    let token
    let existingUser
    let hashedPassword
    const { username, email, password, pattern} = req.body

    if (typeof username === 'undefined' || typeof email === 'undefined' || typeof password === 'undefined' || typeof pattern === 'undefined') {
        res.status(406).json({
            message: commons.invalid_params,
            format: msg.format
        })
        return
    }
    
    try { existingUser = await User.findOne({email: email}) }
    catch(err) {
        res.status(500).json({message: msg.db_user_failed})
        return next()
    }

    if (existingUser) {
        res.status(500).json({message: msg.user_already_exist})
        return next()
    }

    try { hashedPassword  = await bcrypt.hash(password, 12) }
    catch(err) {
        res.status(500).json({message: msg.pass_hash_err})
        return next()
    }

    const createdUser = new User({
        username, email, password: hashedPassword, pattern
    })

    try { await createdUser.save() }
    catch (err) {
        res.status(500).json({message: msg.db_save_err})
        return next()
    }

    try { token = jwt.sign({userId: createdUser.id, email: createdUser.email}, server.token_key) }
    catch (err) {
        res.status(500).json({message: commons.token_failed})
        return next()
    }

    res.status(200).json({ username: createdUser.username, userId: createdUser.id, email: createdUser.email, token: token })
}

export {signup as signupController}