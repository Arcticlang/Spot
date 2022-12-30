export enum OverwriteType {
    ROLE = 0,
    MEMBER = 1
}

export type Permission = | "allow" | "deny";

export interface OverwriteObject {
    id: string;
    type: OverwriteType;
    permission: Permission;
}