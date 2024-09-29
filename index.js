import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routers/index.js'

const app = express();

app.use(express.json());

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('', routes);

const PORT = 6001;

mongoose.connect('mongodb+srv://root-user:root-tester@cluster0.dm8nn.mongodb.net/'
).then(()=>{

        app.listen(PORT, ()=>{
            console.log(`Running @ ${PORT}`);
        });
    }
).catch((e)=> console.log(`Error in db connection ${e}`));