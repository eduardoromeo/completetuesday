import { setTimeout } from "timers";
import { driverInstance } from "../src/core/driver";
//import { mainHeader } from "../src/pages/components/header.page";
import { shoppingcart } from "../src/pages/components/shoppingcart.page";
import { LoginPage } from "../src/pages/login.page";
import { ProductsPage } from "../src/pages/products.page";


describe.skip('Inventory Feature', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;

    beforeAll( async () => {
        await driverInstance.start();        
        loginPage = new LoginPage();
        await loginPage.navigateTo('https://bstackdemo.com/signin');
        await loginPage.Login();
        productsPage =  new ProductsPage();
    },35000);

    afterAll(async () => {
       
        await driverInstance.closeDriver();
    });

    test('Validate login in Products Page', async () => {        
        // const headerLocator = invetoryPage.inventoryHeader;
        // const isLocatorDisplayed = await driverInstance.isElementDisplayed(headerLocator);
        await driverInstance.Page.waitForTimeout(5000);
        const isLocatorDisplayed = await productsPage.validatelogin();
        expect(isLocatorDisplayed).toBeTruthy();
        //expect(isLocatorDisplayed).not.toBeFalsy();
    }, 35000);

    test('Select Product Items from Inventory', async () => {
        const itemName = 'iPhone XR';
       
        await productsPage.addToCartItem(itemName);
        const isDisplayed = await productsPage.validateRemoveButton(itemName);        
        expect(isDisplayed).not.toBeFalsy();
        await shoppingcart.clickToCloseCart();

    }, 35000);

    test('Shopping Cart Icon updated amount', async () => {        
        await productsPage.addToCartItem('iPhone 11 Pro');
        await shoppingcart.clickToCloseCart();
        await productsPage.addToCartItem('Galaxy S9');
        await shoppingcart.clickToCloseCart();
        await productsPage.addToCartItem('Galaxy Note 20 Ultra');
        await shoppingcart.clickToCloseCart();
        //const badge = await productsPage.getShoppingCartBadge();
        const badge = await shoppingcart.getshoppingCartBadge();
        expect(badge).toBe("4");
    }, 35000);

});