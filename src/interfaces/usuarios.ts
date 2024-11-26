export interface IUser {
    id: string;  
    nombre: string;
    email: string;
    password: string;
    rut: string;
    isactive: boolean; 
  }
  
  
export interface ICrearUser {
    nombre: string;
    email: string;
    password: string;
    rut: string;
    isactive: boolean;
  }
  