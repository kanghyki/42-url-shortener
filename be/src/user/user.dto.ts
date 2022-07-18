export interface UserDto {
  isLogin: boolean;
  userID: string;
  password: string;
}

export interface DeleteUserDto {
  userID: string;
  password: string;
}
