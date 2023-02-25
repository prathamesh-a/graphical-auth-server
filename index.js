import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { router as imageRoutes } from './routes/image.js'
import { router as userRoutes } from './routes/users.js'
import mongoose from 'mongoose'
import { db_settings, server } from './static/config.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs/promises'
import { userAttemptsModel } from './models/user_attempts.js'
import { usertModel } from './models/user.js'
import { VerifyRoute } from './routes/verify.js'

const app = express()
const swaggerDocument = JSON.parse(
    await fs.readFile(
        new URL('./swagger.json', import.meta.url)
    )
)

app.use(cors())
app.use(bodyParser.json())

app.use('/api/verify', VerifyRoute)
app.use('/api/user/', userRoutes)
app.use('/api/image/', imageRoutes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose
    .connect(`mongodb+srv://${db_settings.username}:${db_settings.password}@${db_settings.db_name}.ajnurbv.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Server running...")
        app.listen(server.port)
    })
    .catch(err => console.log(err))


// const currentAttempts = await userAttemptsModel.findOne({email: "test@gmail.com"})
// userAttemptsModel.findOneAndUpdate({email: "test@gmail.com", attempts: currentAttempts.attempts+1}).then(res => console.log(res)).catch(err => console.log(err))

// await usertModel.findOne({username: "test"})

// const testAttempts = new userAttemptsModel({
//     username: "test2",
//     email: "test2@gmail.com",
//     attempts: 0
// })

//testAttempts.save().then(res => console.log(res)).catch(err => console.log(err))

// transporter.sendMail(mailOptions, function(err, info) {
//     if (err) console.log(err)
//     else console.log("Email Sent: " + info.response)
// })

// const result = unsplash.search.getPhotos({
//     query: 'cats',
//     perPage: 64,
//     orientation: 'squarish'
// }).then(result => console.log(result.response.results))