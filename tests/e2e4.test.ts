import { driverInstance } from "../src/core/driver";
import { CheckoutPage } from "../src/pages/checkout.page";
import { ProductsPage } from "../src/pages/products.page";
import { LoginPage } from "../src/pages/login.page";
import { userData } from "../user-data";
import { shoppingcart } from "../src/pages/components/shoppingcart.page";

describe('Feature add products to cart and removed all', () => {
    const loginPage: LoginPage = new LoginPage();
    const productsPage: ProductsPage =  new ProductsPage();
   // const checkoutPage: CheckoutPage = new CheckoutPage();

    beforeAll( async () => {
        await driverInstance.start(userData.browser);
        await loginPage.navigateTo(userData.url);
        await loginPage.Login();        
    });

    afterAll(async () => {
        await driverInstance.closeDriver();

    });
    
    test('Select 3 products, and removed all from cart', async () => {
        await productsPage.addToCartItem('One Plus 6T');
       // await productsPage.closeCartbtn();
       await shoppingcart.clickToCloseCart();
        await productsPage.addToCartItem('One Plus 7T');
        await shoppingcart.clickToCloseCart();
        await productsPage.addToCartItem('iPhone 12 Mini');
        await shoppingcart.removeAllProducts();

        const badge = await shoppingcart.getshoppingCartBadge();
        expect(badge).toBe("0");



    });
});