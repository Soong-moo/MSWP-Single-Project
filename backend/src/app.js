import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import rateRouter from './route/rateRouter.js';
import cors from 'cors';

const app = express();
const __dirname = path.resolve();

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());

app.use("/", rateRouter);

app.listen(app.get('port'), () => {
    console.log("start server!");
})