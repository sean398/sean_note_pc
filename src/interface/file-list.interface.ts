export interface IFileListItem {
    name:string;
    id:string;
    category?:string;
    location:string;
}

export interface IFileListEditingItem extends IFileListItem{
    isNew:boolean;
}