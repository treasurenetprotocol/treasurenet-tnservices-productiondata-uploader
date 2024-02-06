/**
 * Create with productiondatauploader
 * Author: ChrisChiu
 * Date: 2023/9/22
 * Desc
 */
const RecordModel = require('../model/productionDataRecord');
const ASSET = require('../dict').ASSETTYPE.GAS;
const helper = require('./onchain.helper');
const moment = require('moment');
const LogsModel = require('../model/logs');
const config = require('../config');
const BigNumber = require('bignumber.js');

const _save = async (location_id, date) => await RecordModel.updateStatus({type: ASSET, location_id, date});

const Process = async (date) => {
    const zero = 0;
    const month = moment(date).format('YYMM');
    date = moment(date).format('YYMMDD');
    try {
        const list = await RecordModel.getAvailableRecords({type: ASSET, date});
        for (let i = 0; i < list.length; i++) {
            const v = list[i];
            console.log(v);
            if (v.amount * 10000 !== 0) {
                await helper.sendTransaction(ASSET, [v.uniqueId, zero, config.uploader, BigNumber(v.amount).times(BigNumber(10000)).toNumber(), zero, date, month, '', zero, zero, zero]);
                await _save(v.location_id, v.date);
                await LogsModel.newLogs(v);
            }
        }
    } catch (e) {
        console.dir(e);
        await LogsModel.newLogs(e);
    }
};

module.exports = Process;
