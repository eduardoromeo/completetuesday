import { driverInstance } from "./driver";

export class ElementActions {

    static async click(locator: string) {
        await driverInstance.Page.waitForSelector(locator);
        await driverInstance.Page.click(locator);
    }

    static async setText(locator: string, text: string): Promise<void> {
        await driverInstance.Page.waitForSelector(locator);
        await driverInstance.Page.fill(locator, text);
    }
    static async isElementVisible(locator: string): Promise<boolean> {
        await driverInstance.Page.waitForSelector(locator);
        return await driverInstance.Page.isVisible(locator, {
            timeout: 10000
        });
    }
    static async getElementText(locator: string): Promise<string> {
        await driverInstance.Page.waitForSelector(locator);
        return await driverInstance.Page.innerText(locator);
    }
    static async ClickText(locator: string) {
        await driverInstance.Page.waitForSelector(locator);
        await driverInstance.Page.click(locator);
    }


    static async goto(url: string){
        await driverInstance.Page.goto(url,{waitUntil:'networkidle'});
    }
    static async textContent(locator: string){
        return driverInstance.Page.textContent(locator);
    }

    static async fill(locator: string, value:string){
        await driverInstance.Page.fill(locator, value);
    }

    static async innerText(locator: string){
        return driverInstance.Page.innerText(locator);
    }

    static async downloadFile(){
        return driverInstance.Page.waitForEvent('download');
    }

    static async waitForTimeout(time:any){
    await driverInstance.Page.waitForTimeout(time);
    }

    /*static async locator(locator: string){
        await driverInstance.Page.locator(locator);
    }*/
    static async close(){
    driverInstance.Page.close();
    }

}
