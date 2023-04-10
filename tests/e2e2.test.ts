import { driverInstance } from "../src/core/driver";
import { CheckoutPage } from "../src/pages/checkout.page";
import { ProductsPage } from "../src/pages/products.page";
import { LoginPage } from "../src/pages/login.page";
import { userData } from "../user-data";
import { FavouritesPage } from "../src/pages/favourites.page";
import { shoppingcart } from "../src/pages/components/shoppingcart.page";
import { mainHeader } from "../src/pages/components/header.page";



describe('Add Favourites and place an order', () => {
    const loginPage: LoginPage = new LoginPage();
    const productsPage: ProductsPage =  new ProductsPage();
    const favourites: FavouritesPage =new FavouritesPage();
    const checkoutPage: CheckoutPage = new CheckoutPage();
    
   
    beforeAll( async () => {
        await driverInstance.start(userData.browser);
        await loginPage.navigateTo(userData.url);
        await loginPage.Login();        
    });

    afterAll(async () => {
        await driverInstance.closeDriver();

    });
    test('add 2 products to favourites', async () => {
        await productsPage.addItemToFavourites('One Plus 6T');
        await productsPage.addItemToFavourites('One Plus 7T');

    });


    test('Go to Favourites page', async () => {
        //await productsPage.clickfavouritesLink();
        await mainHeader.clickLink('favourites');
    });

    test('add products from Favourites page to the cart, remove 1 and Order checkout', async () => {  
        await favourites.addToCartItem('One Plus 6T');
        await shoppingcart.clickToCloseCart();
        await favourites.addToCartItem('One Plus 7T');
        await shoppingcart.clickRemoveProduct('One Plus 6T');
        const badge = await shoppingcart.getshoppingCartBadge();
        expect(badge).toBe("1");

       //await favourites.openCart();
        await shoppingcart.clickCheckoutButton();
        await checkoutPage.checkoutInformation('Bryan', 'Felipez','Street Test','State Test', '00000');
        const actualCompleteMessage = await checkoutPage.getCompleteOrderMessage();
        expect(actualCompleteMessage).toBe('Your Order has been successfully placed.');
        const  totalA = await checkoutPage.checkoutTotal();
        console.log(totalA);
        
        const  totalSumProducts = await checkoutPage.calculateTotal();
        // console.log(totalSumProducts);
       //  console.log(totalA);
        expect(Number(totalA)).toBe(Number(totalSumProducts));
        
        await checkoutPage.clickFinishOrderButton();

    });
});