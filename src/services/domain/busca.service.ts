import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class BuscaService {

    latitude: string;
    longitude: string;

    constructor(
        public http: HttpClient
        ) {
    }

    search(tipoProfissional: string){
        return this.http.get(`${API_CONFIG.baseUrl}/busca/${tipoProfissional}/${this.latitude}/${this.longitude}`);
    }
}
