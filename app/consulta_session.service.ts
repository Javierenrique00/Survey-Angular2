import { Injectable } from '@angular/core';
import { Cookie } from "ng2-cookies/ng2-cookies";


@Injectable()
export class ConsultaSessionService{

    constructor(){
    }

    checkUserLogin():string{
        //--- Trae la cookies
        let cookieID=Cookie.get("appsession_id");
        let cookieDatetime=Cookie.get("appsession_datetime");
        //console.log('Cookie:', cookieID + " "+ cookieDatetime);          
        return cookieID;
    }

    deleteSession(){
        //--Borra las cookies
        Cookie.delete("appsession_id");
        Cookie.delete("appsession_datetime");
    }


    //-- Crea la cookie del lado del usuario para tener los datos de la session
    creaSession(id:string, datetime:number){
        Cookie.set("appsession_id",id);
        Cookie.set("appsession_datetime",datetime.toString());
    }




}