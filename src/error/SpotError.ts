export default class SpotError extends Error {

    constructor(message: string) {
        super(message);
        this.name = "SpotError";
    }

}