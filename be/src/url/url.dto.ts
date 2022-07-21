export interface CreateURLDto {
  originURL: string;
  shortURL: string;
}

export interface DeleteURLDto {
  shortURL: string;
}

export interface UpdateURLDto {
  shortURL: string;
  newURL: string;
}
