export interface FileDo {
  id: number;
  name: string;
  url: string;
  type: string;
  size: number;
  updatedAt: string;
}

export type FileDoOP = Partial<FileDo>;
