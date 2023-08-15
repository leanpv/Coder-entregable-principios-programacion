import { promises as fs } from 'fs'
export class Product {
    constructor({ title, price, thumbnail, description, code, stock }) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail || '[]';
        this.description = description;
        this.code = code;
        this.stock = stock;
        this.status = 'true';
        this.id = Product.increId();
    }

    static increId() {
        if (this.incrementId) {
            this.incrementId++
        } else {
            this.incrementId = 1
        }
        return this.incrementId
    }
}