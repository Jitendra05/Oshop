import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        for (let productId in this.itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem({...item, $key: productId}));
        }
    }

    get totalPrice() {
        let price = 0;
        for (const item of this.items) {
            price += item.totalPrice;
        }
        return price;
    }

    getQuantity(product: Product) {
        const item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }
}
