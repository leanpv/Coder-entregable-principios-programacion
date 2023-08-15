export class Cart {
    constructor() {
        this.products = [];
        this.id = Cart.increId();
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