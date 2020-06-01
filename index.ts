import mysqldump from 'mysqldump';
import * as dotenv from 'dotenv';
dotenv.config();
mysqldump({
    connection:{
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME ,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    dumpToFile: './dump.sql.gz',
    compressFile: true
})