import mysqldump from 'mysqldump';
import * as dotenv from 'dotenv';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
dotenv.config();
let time:string = moment().format("YYYY-MM-DD-HH-mm-ss");
let pathString:string = path.join(__dirname,`./upload/${time}-mysql.sql.gz`)
console.log(pathString);
mysqldump({
    connection:{
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME ,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    dumpToFile: pathString,
    compressFile: true
})