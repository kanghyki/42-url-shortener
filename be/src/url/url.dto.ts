export interface CreateURLDto {
  originURL: string;
  mappedURL: string;
}

export interface DeleteURLDto {
  urlID: number;
}

export interface UpdataURLDto {
  oldMappedURL: string;
  newMappedURL: string;
}
