"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdicionaDIAS = exports.AdicionaHoras = exports.AdicionaMinutos = exports.AdicionaSegundos = exports.get_data = void 0;
function get_dataDayMonthYear(datstr, sep) {
    let data = new Date(datstr);
    let ndia = data.getDate();
    let dia_sem = data.getDay();
    let nmes = data.getMonth();
    let ano4 = data.getFullYear();
    let mes = '';
    let dia = '';
    nmes = nmes + 1;
    if (nmes < 10) {
        mes = '0' + String(mes);
    }
    else {
        mes = String(mes);
    }
    if (ndia < 10) {
        dia = '0' + String(dia);
    }
    else {
        dia = String(dia);
    }
    if (sep !== undefined) {
        return String(dia) + sep + String(mes) + sep + String(ano4);
    }
    else {
        return String(dia) + String(mes) + String(ano4);
    }
}
function get_data(normal = false, strData) {
    let data;
    if (typeof strData === "string") {
        if (strData !== '')
            data = new Date(strData);
        else
            data = new Date();
        console.log('string');
    }
    else {
        console.log('DATE');
        data = strData;
    }
    let ndia = data.getDate();
    let dia_sem = data.getDay();
    let nmes = data.getMonth();
    let ano4 = data.getFullYear();
    let nhora = data.getHours();
    let nmin = data.getMinutes();
    let nseg = data.getSeconds();
    let mseg = data.getMilliseconds();
    let tz = data.getTimezoneOffset();
    let seg = '';
    let min = '';
    let hora = '';
    let mes = '';
    let dia = '';
    if (nseg < 10) {
        seg = '0' + String(nseg);
    }
    else {
        seg = String(nseg);
    }
    if (nmin < 10) {
        min = '0' + String(nmin);
    }
    else {
        min = String(nmin);
    }
    if (nhora < 10) {
        hora = '0' + String(nhora);
    }
    else {
        hora = String(nhora);
    }
    nmes = nmes + 1;
    if (nmes < 10) {
        mes = '0' + String(nmes);
    }
    else {
        mes = String(nmes);
    }
    if (ndia < 10) {
        dia = '0' + String(ndia);
    }
    else {
        dia = String(ndia);
    }
    let str_data = String(ano4) + String(mes) + String(dia);
    let str_hora = String(hora) + String(min) + String(seg);
    if (normal == 'T') {
        return String(ano4) + '-' + String(mes) + '-' + String(dia) + 'T' + String(hora) + ':' + String(min) + ':' + String(seg);
    }
    else if (normal == 'TZ') {
        return String(ano4) + '-' + String(mes) + '-' + String(dia) + 'T' + String(hora) + ':' + String(min) + ':' + String(seg) + '.' + tz + 'Z';
    }
    else if (normal == 'NORMAL') {
        return String(str_data) + String(str_hora);
    }
    else if (normal == false) {
        return 'D' + String(str_data) + String(str_hora);
    }
    else if (normal == 'dt') {
        return String(str_data);
    }
    else if (normal == 'dth') {
        return String(str_data) + String(hora);
    }
    else {
        return String(ano4) + '/' + String(mes) + '/' + String(dia) + ' ' + String(hora) + ':' + String(min) + ':' + String(seg);
    }
}
exports.get_data = get_data;
async function AdicionaSegundos(DataTZ1, Segundos) {
    var DTTZ1 = new Date(DataTZ1);
    DTTZ1.setSeconds(DTTZ1.getSeconds() + Segundos);
    return get_data('T', DTTZ1);
}
exports.AdicionaSegundos = AdicionaSegundos;
async function AdicionaMinutos(DataTZ1, Minutes) {
    var DTTZ1 = new Date(DataTZ1);
    DTTZ1.setMinutes(DTTZ1.getMinutes() + Minutes);
    return get_data('T', DTTZ1);
}
exports.AdicionaMinutos = AdicionaMinutos;
async function AdicionaHoras(DataTZ1, Horas) {
    let DTTZ1 = new Date(DataTZ1);
    DTTZ1.setHours(DTTZ1.getHours() + Horas);
    return get_data('T', DTTZ1);
}
exports.AdicionaHoras = AdicionaHoras;
async function AdicionaDIAS(DataTZ1, Dias) {
    var DTTZ1 = new Date(DataTZ1);
    DTTZ1.setDate(DTTZ1.getDate() + Dias);
    return get_data('T', DTTZ1);
}
exports.AdicionaDIAS = AdicionaDIAS;
