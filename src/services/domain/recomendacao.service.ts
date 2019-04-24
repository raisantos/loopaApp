import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class RecomendacaoService {

    latitude: string;
    longitude: string;

    constructor(
        public http: HttpClient
        ) {
    }

    recomendacoes(){
        return this.http.get(`${API_CONFIG.baseUrl}/recomendacao/${this.latitude}/${this.longitude}`);
    }
}