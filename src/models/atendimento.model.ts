import { ProfissionalModel } from "./profissional.model";

export interface AtendimentoModel {
    id : string;
    codigo : string;
    data: Date;
    profissional: ProfissionalModel;
}