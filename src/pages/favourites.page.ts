import { ElementActions } from "../core/element-actions";
import { BasePage } from "./base.page";

export class FavouritesPage extends BasePage {

    
    private itemAddCartButton = (itemName: string) =>`//p[@class="shelf-item__title"][text()="${itemName}"]//ancestor::div[@class="shelf-item"]//div[@class="shelf-item__buy-btn"]`;

    private removeFavourites = (itemName:string) =>`//p[@class="shelf-item__title"][text()="${itemName}"]//ancestor::div[@class="shelf-item"]//button[@class="MuiButtonBase-root MuiIconButton-root Button clicked "]`;
   
    constructor() {
        super();
    }
     async addToCartItem(itemName: string) {
        await ElementActions.click(this.itemAddCartButton(itemName));
    }
    async itemremoveFavourites(itemName: string) {
        await ElementActions.click(this.removeFavourites(itemName));
    }
  

}