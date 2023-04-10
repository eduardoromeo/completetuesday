import { driverInstance } from "../src/core/driver";
import { LoginPage } from "../src/pages/login.page";


describe.skip('Feature Login StackDemo', () => {
   let loginPage: LoginPage;

    beforeAll(async () => {              
        await driverInstance.start();
        loginPage = new LoginPage();  
        
       
    }, 35000);

    afterAll(async () => {
        await driverInstance.closeDriver();
    });

    it('Go To Page', async () => {
        await loginPage.navigateTo('https://bstackdemo.com/signin');
    });
    


    it('Sets Username', async () => {
        
        await loginPage.setUsername();
    });
      
 
    it('Sets Password', async () => {

        await loginPage.setPassword();
    });

    it('Clicks login Button', async () => {
       
        await loginPage.clickButton();
    });

    it('close browser', async () => {
       
        await loginPage.close();
    });
});