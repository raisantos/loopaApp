import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ProfissionalModel } from "../../models/profissional.model";

@Injectable()
export class RecomendacaoService {

    latitude: number;
    longitude: number;

    constructor(
        public http: HttpClient
        ) {
    }

    recomendacoes() : Observable<ProfissionalModel[]> {
        this.latitude = -0.32015;
        this.longitude = 0.15460;
        return this.http.get<ProfissionalModel[]>(`${API_CONFIG.baseUrl}/recomendacao/${this.latitude}/${this.longitude}`);
    }
}