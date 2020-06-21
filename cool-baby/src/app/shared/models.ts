export interface UserData {
  created: number;
  lastUpdate: number;
  email: string;
  userName: string;
  fullName: string;
  img: string;
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
  talla: string;
  precio: number;
  categoria: number;
  img: string;
  owner: string;
}
