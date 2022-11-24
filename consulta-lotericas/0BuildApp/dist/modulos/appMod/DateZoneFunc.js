"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_datezone = exports.dateFMT = void 0;
const start = async function () {
};
async function get_datezone(dateBefor, setzone = false) {
    const date = new Date();
    if (setzone === false) {
        date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    }
    if (dateBefor > 0) {
        date.setMinutes(date.getMinutes() - dateBefor);
    }
    return date;
}
exports.get_datezone = get_datezone;
var padLeft = function (base) {
    if (base > 10)
        return base;
    else
        ;
    return '0' + base;
};
async function dateFMT() {
    var d = new Date, dformat = [
        padLeft(d.getDate()),
        padLeft(d.getMonth() + 1),
        d.getFullYear()
    ].join('/') + ' ' +
        [
            padLeft(d.getHours()),
            padLeft(d.getMinutes()),
            padLeft(d.getSeconds())
        ].join(':');
    return dformat;
}
exports.dateFMT = dateFMT;
