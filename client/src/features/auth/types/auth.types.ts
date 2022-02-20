export interface User {
  email: string;
  password: string;
}

export interface UserItem extends User {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
