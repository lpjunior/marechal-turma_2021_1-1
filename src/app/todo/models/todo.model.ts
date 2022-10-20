import { TodoStatus } from "../enums/status.enum";

export interface TodoModel{
  id?: string;
  nome:string;
  status:TodoStatus;
  dataCriacao:Date;
  dataFinalizacao:Date;
}
