import mysqldump from 'mysqldump';
import * as dotenv from 'dotenv';
import * as moment from 'moment';
import * as path from 'path';
import * as google from './google/index.js';
import * as schedule  from 'node-schedule';
import * as fs from 'fs';
dotenv.config();
const UploadDriver = async ():Promise<any>=>{
    let time:string = moment().format("YYYY-MM-DD-HH-mm-ss");
    let pathString:string = path.join(__dirname,`./upload/${time}-${process.env.PROJECT_NAME}.sql.gz`)
    const options = {
        connection:{
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME ,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        },
        dumpToFile: pathString,
        compressFile: true
    }
    await mysqldump(options);
    const optionsUpload = {
        resource: {
            'name':`${time}-${process.env.PROJECT_NAME}.sql.gz`,
             parents: [process.env.PARENTS_FOLDER_UPLOAD]
        },
        media :{
            mimeType:'application/x-gzip',
            body: fs.createReadStream(pathString)
        },
        fields: 'id'
    }
    google.files.create(optionsUpload,(err, file)=>{
        if(!err){
            fs.unlink(pathString,(errordelete)=>{
                console.log(errordelete);
            })
        }
    })
}
// UploadDriver();
let a = schedule.scheduleJob("* * */12 * * *",async function(){
    await UploadDriver();
})