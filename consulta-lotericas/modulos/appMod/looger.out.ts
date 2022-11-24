/*
looger.out.ts
*/


//import DateZone from "../func/DateZone";
import * as DateZone from "../appMod/DateZoneFunc";

const ANSI_RESET  = "\u001B[0m";
const ANSI_BLACK  = "\u001B[30m";
const ANSI_RED    = "\u001B[31m";
const ANSI_GREEN  = "\u001B[32m";//ID
const ANSI_YELLOW = "\u001B[33m";//TEXT
const ANSI_BLUE   = "\u001B[34m";
const ANSI_PURPLE = "\u001B[35m";//PAGE
const ANSI_CYAN   = "\u001B[36m"; //DATe
const ANSI_WHITE  = "\u001B[37m";
const ANSI_00038_ = "\u001B[38m"; // ?
const ANSI_00039_ = "\u001B[39m"; // ?
const ANSI_00040_ = "\u001B[40m"; //Fundo black




export default class Logger {
    //private datezone:DateZone;

    private luserid:string;

    constructor(
        private name: string,
        private ciduser:string
    ) {
        this.luserid=''+this.ciduser;
        //this.datezone = new DateZone();
    }

    public async logger_out(line: string) {
        //console.log('logger1');
        
            await DateZone.get_datezone(0,false).then(result =>{
                //date=result; 
                if(process.env.CONSOLESHOW=="true")console.log(result, `[${this.luserid}][${this.name}] ${line}`);
            });
        
    }

    public async consoleINFO(str:any, ...texto){
        await DateZone.dateFMT().then(result =>{
            console.log(
                ANSI_PURPLE,result,
                `${ANSI_GREEN}[${this.luserid}]`,
                `${ANSI_CYAN}[${this.name}]`,
                `${ANSI_YELLOW}`,str,
                ANSI_WHITE,texto,
                ANSI_WHITE
            )
        })
    }

    public async consoleINFO_OK(str:any, ...texto){
        await DateZone.dateFMT().then(result =>{
            console.log(
                ANSI_PURPLE,result,
                `${ANSI_GREEN}[${this.luserid}]`,
                `${ANSI_CYAN}[${this.name}]`,
                `${ANSI_BLUE}`,str,
                ANSI_WHITE,texto,
                ANSI_WHITE
            )
        })
    }
    public async consoleLog(str:any, ...texto){
        if(process.env.CONSOLESHOW==="true")
        await DateZone.dateFMT().then(result =>{
            console.log(
                ANSI_PURPLE,result,
                `${ANSI_GREEN}[${this.luserid}]`,
                `${ANSI_CYAN}[${this.name}]`,
                `${ANSI_YELLOW}`,str,
                ANSI_WHITE,texto,
                ANSI_WHITE
            )
        })
    }

    public async consoleEINFO(str:any, ...texto){
        //if(process.env.CONSOLESHOW==="true")
        await DateZone.dateFMT().then(result =>{
            console.error(
                ANSI_PURPLE,result,
                `${ANSI_GREEN}[${this.luserid}]`,
                `${ANSI_CYAN}[${this.name}]`,
                `${ANSI_RED}`,str,
                ANSI_WHITE,texto,
                ANSI_WHITE
            )
        })
    }

    public async console_log(str:any,str2:any='',str3:any='',str4:any='',str5:any='',str6:any='',str7:any='',str8:any='',str9:any='',str10:any='',str11:any='',str12:any='',str13:any='',str14:any='',str15:any='',str16:any='',str17:any='',str18:any='',str19:any='',str20:any='',str21:any=''){
        if(process.env.CONSOLESHOW=="true")
        await DateZone.get_datezone(0,false).then(result =>{
            try {
                console.log(
                    result,
                    ` ${ANSI_GREEN}${this.luserid}`,
                    ` ${ANSI_CYAN}[${this.name}]`,
                    ` ${ANSI_YELLOW}`,str,
                    (str2!='') ? ` ${ANSI_YELLOW}` : '',str2,
                    (str3!='') ? ` ${ANSI_PURPLE}` : '',str3,
                    (str4!='') ? ` ${ANSI_BLUE}` : '',str4,
                    (str5!='') ? ` ${ANSI_WHITE}` : '',str5,
                    (str6!='') ? ` ${ANSI_GREEN}` : '',str6,
                    (str7!='') ? ` ${ANSI_CYAN}` : '',str7,
                    (str8!='') ? ` ${ANSI_YELLOW}` : '',str8,
                    (str9!='') ? ` ${ANSI_YELLOW}` : '',str9,
                    (str10!='') ? ` ${ANSI_YELLOW}` : '',str10,
                    (str11!='') ? ` ${ANSI_YELLOW}` : '',str11,
                    (str12!='') ? ` ${ANSI_YELLOW}` : '',str12,
                    (str13!='') ? ` ${ANSI_YELLOW}` : '',str13,
                    (str14!='') ? ` ${ANSI_YELLOW}` : '',str14,
                    (str15!='') ? ` ${ANSI_YELLOW}` : '',str15,
                    (str16!='') ? ` ${ANSI_YELLOW}` : '',str16,
                    (str17!='') ? ` ${ANSI_YELLOW}` : '',str17,
                    (str18!='') ? ` ${ANSI_YELLOW}` : '',str18,
                    (str19!='') ? ` ${ANSI_YELLOW}` : '',str19,
                    (str20!='') ? ` ${ANSI_YELLOW}` : '',str20,
                    (str21!='') ? ` ${ANSI_YELLOW}` : '',str21,
                    ANSI_WHITE
                );
            } catch (error) {
                try {
                    console.log(`${ANSI_GREEN}${this.luserid}`,`${ANSI_BLUE}[${this.name}]`,ANSI_RED,'ERROR=',error.message );
                } catch (error) {
                    console.log(`${ANSI_GREEN}${this.luserid}`,`${ANSI_BLUE}[${this.name}]`,ANSI_RED,'ERROR=',error );
                }
            }   
            //console.log(`${ANSI_WHITE}`);
        });
    }

    
    

    public async error(line: string, exception: any = null) {
        //console.log('logger2');
        //let date = new Date();
        if(process.env.SHOW_ERRORS=="true"){
            await DateZone.get_datezone(0,false).then(async(result) =>{
                console.error(result, `[${this.name}]`,ANSI_RED,line); 
            });
            
            if (exception) {
                console.error(ANSI_RED,exception);
            }
            console.log(`${ANSI_WHITE}`);
        }

    }


}
