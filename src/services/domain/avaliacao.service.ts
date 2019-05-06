import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteModel } from "../../models/cliente.model";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { AvaliacaoModel } from "../../models/avaliacao.model";

@Injectable()
export class AvaliacaoService {

    constructor(
        public http: HttpClient 
        ) {
    }

    findByClienteAndProfissional(idProfissional: string): Observable<AvaliacaoModel>{
        return this.http.get<AvaliacaoModel>(`${API_CONFIG.baseUrl}/avaliacoes/${idProfissional}`);
    }

    insert(nota : string, idProfissional: string) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/avaliacoes/${idProfissional}/${nota}`,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}