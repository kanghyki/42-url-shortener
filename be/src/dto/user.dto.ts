export interface CreateUserDto {
  userID: string;
  password: string;
}

export interface UpdateUserDto {
  oldPassword: string;
  newPassword: string;
}

export interface Register42UserDto {
  userID: string;
  password: string;
}
