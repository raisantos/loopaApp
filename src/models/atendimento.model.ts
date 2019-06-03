import { ProfissionalModel } from "./profissional.model";
import { ClienteModel } from "./cliente.model";

export interface AtendimentoModel {
    id : string;
    codigo : string;
    data: Date;
    profissional: ProfissionalModel;
    cliente: ClienteModel;
    status: string;
}