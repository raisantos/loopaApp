import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ProfissionalModel } from "../../models/profissional.model";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProfissionalService{

    constructor(public http: HttpClient){

    }

    findAll() : Observable<ProfissionalModel[]> {
        return this.http.get<ProfissionalModel[]>(`${API_CONFIG.baseUrl}/profissionais`);
    }

    findById(profissionalId: string){
        return this.http.get<ProfissionalModel>(`${API_CONFIG.baseUrl}/profissionais/${profissionalId}`);
    }

    findByEmail(email: string) : Observable<ProfissionalModel> {
        return this.http.get<ProfissionalModel>(`${API_CONFIG.baseUrl}/profissionais/email?value=${email}`);
    }

    checkIn(latitude: number, longitude: number){
        return this.http.put(
            `${API_CONFIG.baseUrl}/profissionais/checkin/${latitude}/${longitude}`,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        );
    }
}