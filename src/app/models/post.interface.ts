export interface UserI {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  image?: string;
  description?: string;
}

export interface PostI {
  id?: string;
  text?: string;
  tag?: string;
  image?: string;
  userId?: string;
  user?: UserI; // Agregar el campo user que contiene los datos del usuario
}
