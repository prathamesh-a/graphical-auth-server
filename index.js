import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { router as imageRoutes } from './routes/image.js'
import { router as userRoutes } from './routes/users.js'
import mongoose from 'mongoose'
import { db_settings, server } from './static/config.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs/promises'

const app = express()
const swaggerDocument = JSON.parse(
    await fs.readFile(
        new URL('./swagger.json', import.meta.url)
    )
)

app.use(cors())
app.use(bodyParser.json())

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

// const result = unsplash.search.getPhotos({
//     query: 'cats',
//     perPage: 64,
//     orientation: 'squarish'
// }).then(result => console.log(result.response.results))