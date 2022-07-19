export interface CreateURLDto {
  userID: string;
  originURL: string;
  mappedURL: string;
}

export interface DeleteURLDto {
  userID: string;
  mappedURL: string;
}

export interface UpdateURLDto {
  userID: string;
  oldMappedURL: string;
  newMappedURL: string;
}
