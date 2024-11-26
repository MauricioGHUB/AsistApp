export interface IEvent {
    id: string  ;
    nombre: string;
    fecha: string;
    lugar: string;
    descripcion: string;
    imagen: string; 
    puedeComentar?: boolean;
  }


export interface ICrearEvent {
    nombre: string;
    fecha: string;
    lugar: string;
    descripcion: string;
    imagen: string;  
  }
  