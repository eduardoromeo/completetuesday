import { Driver, driverInstance } from "../core/driver";
import { ElementActions } from "../core/element-actions";

export abstract class BasePage{
    protected driver:Driver;

    constructor(){
       this.driver = driverInstance;
    }
    async navigateTo(url: string){
        await ElementActions.goto(url);
    }
    async getElementText(locator: string) {
        return ElementActions.textContent(locator);
    }
    async clickElement(locator:string){
        return ElementActions.click(locator);
    }
  
}