export interface PostData {
  key: string;
  creationDate: string;
  title: string;
  content: string;
  author: string;
  img: string;
  created: number;
}

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
  userName: string;
  fullName: string;
}
