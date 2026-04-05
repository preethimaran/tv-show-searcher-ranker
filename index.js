import express from "express"
import path from "node:path"
import { fileURLToPath } from 'url'
import { v4 as uuid} from 'uuid'
// import methodOverride from 'method-override'
// import mongoose from 'mongoose'
// import { Product } from './models/product.js'


// main()
//     .catch(err => console.log(err))

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
//     console.log('MONGO CONNECTION IS OPEN')
// }

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(methodOverride('_method'))

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

app.get('/home', (req, res) =>{
    res.render('index.ejs')
})