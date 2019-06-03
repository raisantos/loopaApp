import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { AtendimentoModel } from "../../models/atendimento.model";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class AtendimentoService {

    constructor(
        public http: HttpClient 
        ) {
    }

    findByCliente(): Observable<AtendimentoModel[]>{
        return this.http.get<AtendimentoModel[]>(`${API_CONFIG.baseUrl}/atendimentos`);
    }

    findByCodigo(codigo: string): Observable<AtendimentoModel>{
        return this.http.get<AtendimentoModel>(`${API_CONFIG.baseUrl}/atendimentos/${codigo}`);
    }

    insert(idProfissional: string){
        return this.http.post(
            `${API_CONFIG.baseUrl}/atendimentos/${idProfissional}`,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        );
    }

    update(codigo: string){
        return this.http.put(
            `${API_CONFIG.baseUrl}/atendimentos/${codigo}`,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        );
    }
}