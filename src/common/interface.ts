export interface IAcronym {
  acronym: string;
  definition: string;
}

export interface IAcronymList {
  data: Array<Object>;
  totalCount: number;
}
