import Color from "../Color";

export interface EmbedFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export interface EmbedField {
    name: string;
    value: string;
    inline?: boolean;
}

export interface EmbedImage {
    url: string;
    proxy_url?: string;
    width?: number;
    height?: number;
}

export interface EmbedAuthor {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export default class Embed {
    static builder() {
        return new Embed();
    }

    private title?: string;
    private description?: string;
    private url?: string;
    private timestamp?: string;
    private color?: Color;
    private footer?: EmbedFooter;
    private image?: EmbedImage;
    private author?: EmbedAuthor;
    private fields?: EmbedField[];

    private constructor() {}

    setTitle(title: string) {
        this.title = title;
        return this;
    }

    setDescription(description: string) {
        this.description = description;
        return this;
    }

    setUrl(url: string) {
        this.url = url;
        return this;
    }

    setTimestamp(timestamp: Date) {
        this.timestamp = timestamp.toISOString();
        return this;
    }

    setColor(color: Color) {
        this.color = color;
        return this;
    }

    setFooter(footer: EmbedFooter) {
        this.footer = footer;
        return this;
    }

    setImage(image: EmbedImage) {
        this.image = image;
        return this;
    }

    setAuthor(author: EmbedAuthor) {
        this.author = author;
        return this;
    }

    addField(field: EmbedField) {
        if(!this.fields) this.fields = [];
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
        }
    }

}