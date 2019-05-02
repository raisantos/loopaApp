import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ServicoModel } from "../../models/servico.model";

@Injectable()
export class ServicoService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<ServicoModel[]> {
        return this.http.get<ServicoModel[]>(`${API_CONFIG.baseUrl}/servicos`)
    }
}
