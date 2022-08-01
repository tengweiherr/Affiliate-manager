import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import downlineRoutes from './routes/downline.js';
import cycleRoutes from './routes/cycle.js';
import userRoutes from './routes/user.js';


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({ limit:"30mb", extended: true }));
app.use(cors({
    origin:'*'
}));

app.use('/downline',downlineRoutes);
app.use('/cycle',cycleRoutes);
app.use('/user',userRoutes);



const PORT = process.env.PORT || 5500;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, ()=> console.log('Server running on port: ${PORT}')))
.catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify', false);