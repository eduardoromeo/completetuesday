import { ElementActions } from "../core/element-actions";
import { BasePage } from "./base.page";
import { shoppingcart } from "./components/shoppingcart.page";

export class CheckoutPage extends BasePage {
    //checkout information Shipping Address
    private firstName: string = '#firstNameInput';
    private lastName: string = '#lastNameInput';
    private addressStreet:string='#addressLine1Input';
    private stateProvince: string='#provinceInput';
    private postalCode: string = '#postCodeInput';
    private continueButton: string = '#checkout-shipping-continue';

    //Checkout receipt pdf
    private linkPdf: string = '#downloadpdf';
    private continueBtn: string = '.continueButtonContainer a button';
    
    private priceProduct: string= '//div[@class="product-price optimizedCheckout-contentPrimary"]';


    private priceUnitProd = (value: number) =>`(//div[@class='product-price optimizedCheckout-contentPrimary'])[${value}]`;
    

    private completeMessage: string ='legend#confirmation-message';

    private totalAmount: string ='span.cart-priceItem-value span';
  

    constructor() {
        super();
    }

    async checkoutInformation(firstName: string, lastName: string, addressStreet: string, stateProvince: string, postalCode: string) {
        await ElementActions.fill(this.firstName, firstName);
        await ElementActions.fill(this.lastName, lastName);
        await ElementActions.fill(this.addressStreet, addressStreet);
        await ElementActions.fill(this.stateProvince, stateProvince);
        await ElementActions.fill(this.postalCode, postalCode);
        await ElementActions.click(this.continueButton);
    }

    async clickFinishOrderButton() {
        await ElementActions.click(this.continueBtn);
    }

   
    async getCompleteOrderMessage() {
        return await ElementActions.innerText(this.completeMessage);
    }
    async checkoutTotal() {
        return await (await ElementActions.innerText(this.totalAmount)).replace('$','');
    }
    async donwloadPdfLink(){
       const [ download ] = await Promise.all([
        ElementActions.downloadFile(), 
       ElementActions.click(this.linkPdf)
    ]);
    
    download.saveAs('./receipts/download.pdf');
    
       await ElementActions.waitForTimeout(5000);
    }

    async calculateTotal() {
    let totalSum:number=0;
    let unitPrice:string=''
        const cantProd=await this.driver.Page.locator(this.priceProduct).count();
        for (let index = 1; index <= cantProd; index++) {
        //  console.log(index);

          unitPrice=await (await ElementActions.getElementText(this.priceUnitProd(index))).replace('$','');
            totalSum +=Number(unitPrice);
        }
        //console.log(totalSum);  
        return totalSum;
    }

}
