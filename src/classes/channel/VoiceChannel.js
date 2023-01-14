"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceQualityMode = void 0;
const Channel_1 = __importDefault(require("./Channel"));
var VoiceQualityMode;
(function (VoiceQualityMode) {
    VoiceQualityMode[VoiceQualityMode["AUTO"] = 1] = "AUTO";
    VoiceQualityMode[VoiceQualityMode["FULL"] = 2] = "FULL";
})(VoiceQualityMode = exports.VoiceQualityMode || (exports.VoiceQualityMode = {}));
class VoiceChannel extends Channel_1.default {
}
exports.default = VoiceChannel;
