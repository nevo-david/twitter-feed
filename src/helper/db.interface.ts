export interface DB {
    id: string;
    comment: string;
    username: string;
    children: DB[]
}