import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteModel } from "../../models/cliente.model";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
//import { ImageUtilService } from "../image-util.service";

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        //public imageUtilService: ImageUtilService
        ) {
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }
    
    findByEmail(email: string) : Observable<ClienteModel> {

        //let token = this.storage.getLocalUser().token;
        //let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token})
        return this.http.get<ClienteModel>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    /*getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }*/

    insert(obj : ClienteModel) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(id: string, obj : ClienteModel){
        return this.http.put(
            `${API_CONFIG.baseUrl}/clientes/${id}`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        );
    }

    /*uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/picture`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }*/
}
