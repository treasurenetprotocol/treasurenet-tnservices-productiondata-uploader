/**
 * Create with productiondataprocess
 * Author: ChrisChiu
 * Date: 2023/9/21
 * Desc
 */
const schedule = require('node-schedule');
const uploader = require('./schedule');
const moment = require('moment');
require('./db/mongodb.connect');
const Console = require("console");

const automaticDataProcess = async () => {
    /*const rule = new schedule.RecurrenceRule();
    rule.hour = [0, 12];
    schedule.scheduleJob(rule, async () => {*/
        // const date = moment().subtract(2, "days").format('YYYY-MM-DD');
        // await uploader.oilProcess(date);
        // await uploader.gasProcess(date);

        const startDate = '2023-01-01'
        for (let i = 0; i < 90; i++) {
            const date = moment(startDate).add(i, "days").format('YYYY-MM-DD');
            console.log(date)
            await uploader.oilProcess(date);
            //await uploader.gasProcess(date);
        }
        console.log("END")
   /* })*/
}


automaticDataProcess();
