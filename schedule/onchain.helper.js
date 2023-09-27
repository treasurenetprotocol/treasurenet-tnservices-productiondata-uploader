/**
 * Create with productiondatauploader
 * Author: ChrisChiu
 * Date: 2023/9/22
 * Desc
 */
const tngateway = require('../utils/tngateway');
const dict = require('../dict');
const logsModel = require('../model/logs');
const web3 = require('../web3/connect');
const config = require('../config');

const sendTransaction = async (type = dict.ASSETTYPE.OIL, params) => {
    const contractName = type === dict.ASSETTYPE.OIL ? 'OilData' : 'GasData'

    let d = await tngateway.getData('get', `${config.tngateway.url}/contracts/abi`, {name:contractName});
    if (d.code === 0) d = d.result;
    else {
        console.dir('get abi failed. please check tngateway is running.')
        await logsModel.newLogs({message: 'get abi failed. please check tngateway is running.'});
    }
    const account = web3.eth.accounts.privateKeyToAccount(config.sender);   //sender Account's private key
    const contract = new web3.eth.Contract(d.abi, d.address);
    contract.handleRevert = true;
    console.log("params:",params)
    const tx_builder = await contract.methods.setProductionData(params[0], params);
    const encoded_tx = tx_builder.encodeABI();
    const transactionObject = {
        gas: 5000000,
        data: encoded_tx,
        from: account.address,
        to: d.address
    };

    const signTx = await web3.eth.accounts.signTransaction(transactionObject, account.privateKey);
    await web3.eth.sendSignedTransaction(signTx.rawTransaction);
}

module.exports = {sendTransaction};
