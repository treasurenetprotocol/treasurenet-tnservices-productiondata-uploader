/**
 * Create with productiondataprocess
 * Author: ChrisChiu
 * Date: 2023/9/21
 * Desc
 */
require('dotenv').config();

module.exports = {
    mongodb: {
        replicaSet: process.env.MONGO_REPLICASET_NAME || false,
        host: process.env.MONGO_HOST,
        database: process.env.MONGO_NAME,
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PWD,
        DB_URL: process.env.MONGO_URL || ''
    },
    uploader: process.env.UPLOADER,
    sender: process.env.SENDER,
    evmEndpoint: process.env.EVM_ENDPOINT,
    tngateway: {
        access_token_url: process.env.TNGATEWAY_ACCESS_TOKEN_URL,
        clientId: process.env.TNGATEWAY_CLIENT_ID,
        clientSecret: process.env.TNGATEWAY_CLIENT_SECRET,
        scope: process.env.TNGATEWAY_SCOPE,
        url: process.env.TNGATEWAY_API_URL
    },
};
