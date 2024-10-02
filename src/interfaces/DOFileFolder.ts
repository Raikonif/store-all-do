export interface IFolder {
  Prefix: string;
}

export interface IFile {
  Etag: string;
  Key: string;
  LastModified: string;
  Size: number;
  StorageClass: string;
}

export interface IFilesAndFolders {
  files: IFile[];
  folders: IFolder[];
}

export type TFile = Partial<IFile>;
export type TFolder = Partial<IFolder>;
export type TFilesAndFolders = Partial<IFilesAndFolders>;
