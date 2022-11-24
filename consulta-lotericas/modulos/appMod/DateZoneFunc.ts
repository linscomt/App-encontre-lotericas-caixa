
//--DateZoneFunc.ts

const start = async function() {

}

async function get_datezone(dateBefor:number, setzone:any=false):Promise<Date>{
    const date = new Date();
    

    //console.log('*** UTC get_datezone-DATA_ATUAL=',date);
    if(setzone===false){
        date.setTime( date.getTime() - date.getTimezoneOffset()*60*1000 );
        //console.log('getTimezoneOffset=',date);
    }
    if(dateBefor > 0){
        date.setMinutes(date.getMinutes() - dateBefor);
    }
    //console.log('MOMENT=',moment("12-25-1995", "YYYY-DD-MM"));
    //console.log('MOMENT=',moment().format('YYYY-MM-DD HH:mm:ss'));
    //console.log('*** get_datezone-DATA_ATUAL=',date, 'Menos=',dateBefor);
    return date;
}

/*Number.prototype.padLeft = function(base,chr){
   var  len = (String(base || 10).length - String(this).length)+1;
   return len > 0? new Array(len).join(chr || '0')+this : this;
}*/
var padLeft = function(base){
    if(base > 9) return base;else;return '0'+base;
}
export async function dateFMT(){
    var d = new Date,
    dformat = [
            padLeft(d.getDate()),
            padLeft(d.getMonth()+1),
            d.getFullYear()].join('/') +' ' +
            [
                padLeft(d.getHours()),
                padLeft(d.getMinutes()),
                padLeft(d.getSeconds())
            ].join(':');
    //=> dformat => '05/17/2012 10:52:21'
    return dformat;
}


export { get_datezone };