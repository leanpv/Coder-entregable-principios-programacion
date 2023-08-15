export class Cart {
    constructor() {
        this.products = [];
        this.id = Cart.increId();
    }

    static increId() {
        if (this.incrementId) {
            this.incrementId++
        } else if (!this.products) {
            this.incrementId = 1
        } else {
            this.incrementId = this.products.length + 1
        }
        return this.incrementId
    }
}