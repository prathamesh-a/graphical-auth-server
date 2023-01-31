import { usertModel as User } from '../models/user.js'
import { commons, validation_messages as msg } from '../static/message.js';

const checkExistingUsername = async (req, res, next) => {
    let user;
    const {username} = req.body

    if (typeof username === 'undefined') {
        res.status(500).json({
            message: commons.invalid_params,
            format: ["username"]
        })
        return next()
    }
    
    try { user = await User.findOne({username: username}) }
    catch (err) { res.status(400).json({message: msg.search_err}) }

    if (user) res.status(200).json({exist: true})
    else res.status(200).json({exist: false})
}

const checkExistingEmail = async (req, res, next) => {
    let user
    const {email} = req.body
    
    if (typeof email === 'undefined') {
        res.status(500).json({
            message: commons.invalid_params,
            format: ["email"]
        })
        return next()
    }
    
    try { user = await User.findOne({email: email}) }
    catch (err) { res.status(400).json({message: msg.search_err}) }

    if (user) res.status(200).json({exist: true})
    else res.status(200).json({exist: false})
}

export { checkExistingEmail, checkExistingUsername } 