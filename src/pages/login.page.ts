import { strict } from "assert";
import { ElementActions } from "../core/element-actions";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage{

    //Locators
    private usernamedropd: string ='#username';
    private username: string ='#react-select-2-option-0-0';
    private passworddropd: string ='#password';
    private password: string ='#react-select-3-option-0-0';
    private loginbutton: string ='#login-btn';


    private userType= (user: string) =>`//*[@id="username"]//div[text()="${user}"]`;

    constructor(){
        super();
    }


    async Login() {
        await ElementActions.click(this.usernamedropd);
        await ElementActions.click(this.username);
        await ElementActions.click(this.passworddropd);
        await ElementActions.click(this.password);
        await ElementActions.click(this.loginbutton);
        //await ElementActions.waitForTimeout(5000);
    }

    async setUsername(){

       await ElementActions.click(this.usernamedropd);
       await ElementActions.click(this.username);
        
    }
    async setPassword(){

        await ElementActions.click(this.passworddropd);
        await ElementActions.click(this.password);
        
    }
    async clickButton(){

        await ElementActions.click(this.loginbutton);
        
    }
    async clickButtonlogin(text:string){
 
        await ElementActions.click(text);
        
    }
    async close() {
        
        await ElementActions.close();
     
    }

}
