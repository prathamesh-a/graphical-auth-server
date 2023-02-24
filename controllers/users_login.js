import { usertModel as User } from '../models/user.js'
import bcrypt from "bcryptjs"
import { login_messages as  msg, commons} from '../static/message.js'
import jwt from 'jsonwebtoken'
import { server } from '../static/config.js'
import { checkArray } from '../util/util.js'

const login = async (req, res, next) => {

    let token
    let existingUser
    let isValidPassword = false
    var isValidPattern = false
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
        res.status(401).json({message: msg.user_not_exist})
        return next()
    }
    
    try { isValidPassword = await bcrypt.compare(password, existingUser.password) }
    catch(err) {
        console.log(err)
        res.status(500).json({message: msg.db_pass_failed})
        return next()
    }

    isValidPattern = checkArray(existingUser.pattern, pattern, true)

    if (!isValidPassword || !isValidPattern) {
        res.status(500).json({message: msg.invalid_credentials})
        return next()
    }

    try { token = jwt.sign({userId: existingUser.id, email: existingUser.email}, server.token_key) }
    catch (err) {
        console.log(err)
        res.status(500).json({message: commons.token_failed})
        return next()
    }

    res.status(200).json({username: existingUser.username, userId: existingUser.id, email: existingUser.email, token: token})
}

export {login as loginController}