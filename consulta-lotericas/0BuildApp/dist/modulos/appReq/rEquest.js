"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.curl_Request = exports.curl_request = exports.curl_fetch = exports.curl_axios = void 0;
const zlib_1 = __importDefault(require("zlib"));
const request_1 = __importDefault(require("request"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const axios_1 = __importDefault(require("axios"));
async function curl_axios(options) {
    return new Promise(async (resolve) => {
        await axios_1.default.request(options)
            .then(async function (response) {
            let TTP = await response.headers;
            let RRR = await response.data;
            resolve({ result: true, Header: TTP, response: RRR });
        })
            .catch(function (error) {
            resolve({ result: false, Header: error.headers, response: 'ERROR#curl_axios-RESPONSE:' + error.code });
        });
    })
        .catch(function (error) {
        return { result: false, Header: '', response: 'ERROR#curl_axios:' + error };
    });
}
exports.curl_axios = curl_axios;
async function curl_fetch(URL, Options) {
    return new Promise(async (resolve) => {
        try {
            var response = await (0, node_fetch_1.default)(URL, Options);
            try {
                let TTP = await response.headers.raw();
                let RRR = await response.text();
                resolve({ result: true, Header: TTP, response: await RRR });
            }
            catch (e) {
                resolve({ result: false, Header: '', response: 'ERROR#CURL_FETCH-RESPONSE:' });
            }
        }
        catch (error) {
            resolve({ result: false, Header: '', response: 'ERROR#CURL_FETCH:' + error });
        }
    });
}
exports.curl_fetch = curl_fetch;
async function curl_request(options) {
    return new Promise(async (resolve) => (0, request_1.default)(options, (error, response, body) => resolve({ error, response, body })));
}
exports.curl_request = curl_request;
async function curl_Request(options) {
    try {
        return new Promise(async (resolve) => (0, request_1.default)(options, (error, response, body) => {
            let H;
            try {
                H = response.headers;
            }
            catch (error) {
                H = '';
            }
            resolve({ result: true, Header: H, response, body, error });
        }));
    }
    catch (e) {
        return { result: false, Header: '', response: 'ERROR#CURL_REQUEST:' + e, 'body': '' };
    }
}
exports.curl_Request = curl_Request;
async function curl_request2(options) {
    const req = (0, request_1.default)(options, res => {
        let buffers = [];
        let bufferLength = 0;
        let strings = [];
        const getData = chunk => {
            if (!Buffer.isBuffer(chunk)) {
                strings.push(chunk);
            }
            else if (chunk.length) {
                bufferLength += chunk.length;
                buffers.push(chunk);
            }
        };
        const endData = () => {
            let response = { code: 200, body: '' };
            if (bufferLength) {
                response.body = Buffer.concat(buffers, bufferLength);
                if (options.encoding !== null) {
                    response.body = response.body.toString(options.encoding);
                }
                buffers = [];
                bufferLength = 0;
            }
            else if (strings.length) {
                if (options.encoding === 'utf8' && strings[0].length > 0 && strings[0][0] === '\uFEFF') {
                    strings[0] = strings[0].substring(1);
                }
                response.body = strings.join('');
            }
            console.log('response', response);
        };
        switch (res.headers['content-encoding']) {
            case 'gzip':
                res.pipe(zlib_1.default.createGunzip())
                    .on('data', getData)
                    .on('end', endData);
                break;
            case 'deflate':
                res.pipe(zlib_1.default.createInflate())
                    .on('data', getData)
                    .on('end', endData);
                break;
            default:
                res.pipe(zlib_1.default.createInflate())
                    .on('data', getData)
                    .on('end', endData);
                break;
        }
    });
}
