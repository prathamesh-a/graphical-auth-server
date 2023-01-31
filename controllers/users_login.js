import { usertModel as User } from '../models/user.js'
import bcrypt from "bcryptjs"
import { login_messages as  msg, commons} from '../static/message.js'
import jwt from 'jsonwebtoken'

const login = async (req, res, next) => {

    let token
    let existingUser
    let isValidPassword = false
    let isValidPattern = false
    const { username, password, pattern } = req.body

    if (typeof username === 'undefined' || typeof password === 'undefined' || typeof pattern === 'undefined') {
        res.status(406).json({
            message: commons.invalid_params,
            format: msg.format
        })
        return next()
    }
    
    try { existingUser = await User.findOne({username: username}) }
    catch(err) {
        res.status(401).json({message: msg.db_user_failed})
        return next()
    }

    if (!existingUser) {
        res.status(401).json({message: msg.user_already_exist})
        return next()
    }
    
    try { isValidPassword = await bcrypt.compare(password, existingUser.password) }
    catch(err) {
        res.status(500).json({message: msg.db_pass_failed})
        return next()
    }

    pattern.map(reqItem => {
        var flag = false
        existingUser.pattern.map(savedItem => {
            if (reqItem === savedItem) flag = true
        })
        isValidPattern = flag;
    })

    if (!isValidPassword || !isValidPattern) {
        res.status(500).json({message: msg.invalid_credentials})
        return next()
    }

    try { token = jwt.sign({userId: existingUser.id, email: existingUser.email}, server.token_key) }
    catch (err) {
        res.status(500).json({message: commons.token_failed})
        return next()
    }

    res.status(200).json({userId: existingUser.id, email: existingUser.email, token: token})
}

export {login as loginController}