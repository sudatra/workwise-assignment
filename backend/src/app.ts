import express, { Application } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'
import trainRoutes from './routes/trainRoutes'
import cors from 'cors'

dotenv.config();

const app: Application = express();

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/trains', trainRoutes)

export default app;