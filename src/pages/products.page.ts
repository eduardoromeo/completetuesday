import { BasePage } from "./base.page";

export class ProductsPage extends BasePage {

    private logoutText: string = '//a[@id="logout"][text()="Logout"]';
   
    private addtoFavourites = (itemName: string) =>`//p[@class="shelf-item__title"][text()="${itemName}"]//ancestor::div[@class="shelf-item"]/div[@class="shelf-stopper"]/button`;
    

    constructor() {
        super();
    }

    private itemAddCartButton = (itemName: string) =>`//p[@class="shelf-item__title"][text()="${itemName}"]//ancestor::div[@class="shelf-item"]//div[@class="shelf-item__buy-btn"]`;
    private itemRemoveCartButton = (itemName: string) =>`//div[@class="float-cart float-cart--open"]//p[text()="${itemName}"]//ancestor::div[@class="shelf-item"]//div[@class="shelf-item__del"]`;


    async addItemToFavourites(itemName: string) {
        await this.driver.Page.click(this.addtoFavourites(itemName));
    }
    async addToCartItem(itemName: string) {
        await this.driver.Page.click(this.itemAddCartButton(itemName));
    }
    async validateRemoveButton(itemName: string) {
        //await this.driver.Page.waitForTimeout(5000);
        return this.driver.isElementDisplayed(this.itemRemoveCartButton(itemName));
    }
    

    async validatelogin() {
        return await this.driver.Page.isVisible(this.logoutText);
    }




}