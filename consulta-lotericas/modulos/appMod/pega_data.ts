//
// pega_data.ts
//




function get_dataDayMonthYear(datstr, sep){

    let data = new Date(datstr);
    
    let ndia     = data.getDate();           // 1-31
    let dia_sem = data.getDay();            // 0-6 (zero=domingo)
    let nmes     = data.getMonth();          // 0-11 (zero=janeiro)
    //let ano2    = data.getYear();           // 2 dígitos
    let ano4    = data.getFullYear();       // 4 dígitos
    
    let mes='';let dia='';

    nmes=nmes+1;
    if(nmes < 10){ mes = '0'+String(mes); }else{  mes = String(mes); }
    if(ndia < 10){ dia = '0'+String(dia); }else{ dia = String(dia); }
    
    if(sep!==undefined){
        return String(dia) + sep + String(mes) + sep + String(ano4);
    }else{
        return String(dia) + String(mes) + String(ano4);
    }
    
    
}



function get_data( normal:any = false, strData:any) {
    let data:any;

    if (typeof strData === "string"){
        if(strData!=='')
        data = new Date(strData);
        else
        data = new Date();
        console.log('string');
    }
    else{
        console.log('DATE');
        data = strData; 
    }
    // Obtém a data/hora atual
    //let data = new Date((strData!=='')?strData:'');
    
    // Guarda cada pedaço get em uma variável
    let ndia = data.getDate(); // 1-31
    let dia_sem = data.getDay(); // 0-6 (zero=domingo)
    let nmes = data.getMonth(); // 0-11 (zero=janeiro)
    //let ano2 = data.getYear();// getYear(); // 2 dígitos
    let ano4 = data.getFullYear(); // 4 dígitos
    let nhora = data.getHours(); // 0-23
    let nmin = data.getMinutes(); // 0-59
    let nseg = data.getSeconds(); // 0-59
    let mseg = data.getMilliseconds(); // 0-999
    let tz = data.getTimezoneOffset(); // em minutos
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
    // Formata a data e a hora (note o mês + 1)
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
    //dt=2021/01/01


    //dt=2021/01/01
    // Mostra o resultado
    
    if (normal == 'T') {
        //2022-04-12T04:40:29
        return String(ano4) + '-' + String(mes) + '-' + String(dia) + 'T' + String(hora) + ':' + String(min) + ':' + String(seg);
    }
    else
    if (normal == 'TZ') {
        //2022-04-12T04:40:29.000Z
        return String(ano4) + '-' + String(mes) + '-' + String(dia) + 'T' + String(hora) + ':' + String(min) + ':' + String(seg)+'.'+tz+'Z';
    }
    else
    if (normal == 'NORMAL') {
        return String(str_data) + String(str_hora);
    }
    else
    if (normal == false) {
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

//'2014-03-14T23:54:00'
async function AdicionaSegundos(DataTZ1, Segundos){
    var DTTZ1 = new Date(DataTZ1);
    DTTZ1.setSeconds(DTTZ1.getSeconds() + Segundos);
    return get_data('T', DTTZ1);
}
async function AdicionaMinutos(DataTZ1, Minutes){
    var DTTZ1 = new Date(DataTZ1);
    DTTZ1.setMinutes(DTTZ1.getMinutes() + Minutes);
    return get_data('T', DTTZ1);
}
async function AdicionaHoras(DataTZ1, Horas){
    let DTTZ1 = new Date(DataTZ1);
    DTTZ1.setHours(DTTZ1.getHours() + Horas);
    return get_data('T', DTTZ1);
}
async function AdicionaDIAS(DataTZ1, Dias){
    var DTTZ1 = new Date(DataTZ1);
    DTTZ1.setDate(DTTZ1.getDate() + Dias);
    return get_data('T', DTTZ1);
}
    




export {
    get_data, AdicionaSegundos, AdicionaMinutos, AdicionaHoras, AdicionaDIAS
}

