export default interface Editable {
    edit(...args: any[]): void|Promise<void>;
}