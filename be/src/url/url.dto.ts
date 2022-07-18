export interface CreateURLDto {
  intraID: string;
  originURL: string;
  mappedURL: string;
}

export interface DeleteURLDto {
  mappedURL: string;
}

export interface UpdateURLDto {
  oldMappedURL: string;
  newMappedURL: string;
}
