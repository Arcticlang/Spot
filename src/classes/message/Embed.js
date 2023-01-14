"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Embed {
    static builder() {
        return new Embed();
    }
    constructor() { }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setUrl(url) {
        this.url = url;
        return this;
    }
    setTimestamp(timestamp) {
        this.timestamp = timestamp.toISOString();
        return this;
    }
    setColor(color) {
        this.color = color;
        return this;
    }
    setFooter(footer) {
        this.footer = footer;
        return this;
    }
    setImage(image) {
        this.image = image;
        return this;
    }
    setAuthor(author) {
        this.author = author;
        return this;
    }
    addField(field) {
        if (!this.fields)
            this.fields = [];
        this.fields.push(field);
        return this;
    }
    toEmbed() {
        return {
            title: this.title,
            type: "rich",
            description: this.description,
            url: this.url,
            timestamp: this.timestamp,
            color: this.color?.getColor(),
            footer: this.footer,
            image: this.image,
            author: this.author,
            fields: this.fields
        };
    }
}
exports.default = Embed;
