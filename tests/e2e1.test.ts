import { driverInstance } from "../src/core/driver";
import { CheckoutPage } from "../src/pages/checkout.page";
import { ProductsPage } from "../src/pages/products.page";
import { LoginPage } from "../src/pages/login.page";
import { userData } from "../user-data";
import { shoppingcart } from "../src/pages/components/shoppingcart.page";

describe('Feature Perform an Order, validate total', () => {
    const loginPage: LoginPage = new LoginPage();
    const productsPage: ProductsPage =  new ProductsPage();
    const checkoutPage: CheckoutPage = new CheckoutPage();

    beforeAll( async () => {
        await driverInstance.start(userData.browser);
        await loginPage.navigateTo(userData.url);
        await loginPage.Login();        
    });

    afterAll(async () => {
        await driverInstance.closeDriver();

    });
    
    test('Select products, Order checkout, donwload order receipt pdf and validate total amount', async () => {
        await productsPage.addToCartItem('One Plus 6T');

       await shoppingcart.clickToCloseCart();
        await productsPage.addToCartItem('One Plus 7T');
        await shoppingcart.clickToCloseCart();
        await productsPage.addToCartItem('iPhone 12 Mini')


        await shoppingcart.clickShoppingCartBadge();
        await shoppingcart.clickCheckoutButton();

        await checkoutPage.checkoutInformation('Bryan', 'Felipez','Street Test','State Test', '00000');
        const actualCompleteMessage = await checkoutPage.getCompleteOrderMessage();
        expect(actualCompleteMessage).toBe('Your Order has been successfully placed.');
        
        await checkoutPage.donwloadPdfLink();
        
        const  totalA = await checkoutPage.checkoutTotal();
        const  totalSumProducts = await checkoutPage.calculateTotal();
       // console.log(totalSumProducts);
      //  console.log(totalA);

        expect(Number(totalA)).toBe(Number(totalSumProducts));
        await checkoutPage.clickFinishOrderButton();

    });
});