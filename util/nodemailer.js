import { createTransport } from "nodemailer"
import { smtp_settings } from "../static/config.js"

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: smtp_settings.user,
        pass: smtp_settings.password
    }
})

// const mailOptions = {
//     from: "graphicalpassauth@gmail.com",
//     to: "autipratham1671@gmail.com",
//     subject: "Test Email",
//     text: "test"
// }

export { transporter }