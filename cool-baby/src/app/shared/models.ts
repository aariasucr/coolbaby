/*export interface PostData {
  key: string;
  creationDate: string;
  title: string;
  content: string;
  author: string;
  img: string;
  created: number;
}*/

export interface UserData {
  created: number;
  lastUpdate: number;
  email: string;
  userName: string;
  fullName: string;
  img: string;
  //Necesitamos el uid?
}

export interface RegisterData {
  created: number;
  lastUpdate: number;
  email: string;
  userName: string;
  fullName: string;
}

export interface ProductData {
  key: string;
  created: number;
  nombre: string;
  precio: number;
  talla: string;
  cantidad: number,
  cantidadVentas: number,
  precioTotal: number,
  totalVentas: number,
  img: string;
  owner: string;
}
