export interface CreateUserDto {
  userID: string;
  password: string;
}

export interface Register42UserDto {
  intraUniqueID: number;
  userID: string;
  password: string;
  intraID: string;
  email: string;
}
