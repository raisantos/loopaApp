import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ProfissionalModel } from "../../models/profissional.model";

@Injectable()
export class RecomendacaoService {

    constructor(
        public http: HttpClient
        ) {
    }

    recomendations(latitude: number, longitude: number) : Observable<ProfissionalModel[]> {
        return this.http.get<ProfissionalModel[]>(`${API_CONFIG.baseUrl}/recomendacao/${latitude}/${longitude}`);
    }
}