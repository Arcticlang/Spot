import fs from "fs"
import { supportsAnsi } from './supports_ansi'

const supports_ansi = supportsAnsi();

export function appendLog(text: string, file_path: string = "log.txt") {
    fs.appendFile(file_path, text, function (err) {
        if (err) {
            if (supports_ansi) throw new Error(`\x1b[31m[ ERROR ]\x1b[0m Error writing to log file (\x1b[36m${file_path}\x1b[0m)`);
            if (!supports_ansi) throw new Error(`[ ERROR ] Error writing to log file (${file_path})`);
        }
    });
};
