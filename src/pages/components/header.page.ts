import { ElementActions } from "../../core/element-actions";
import { BasePage } from "../base.page";


export class headerPage extends BasePage{

    
    private homeLink:string='a.Navbar_logo__26S5Y';
    private OffersLink:string='a#offers';
    private OrdersLink:string='a#orders';
    private FavouritesLink:string='a#favourites';


    constructor(){
        super();
    }
    async clickLink(link:string) {
        switch (link) {
            case 'home':
            return ElementActions.click(this.homeLink);
            break;
            case 'offers':
            return ElementActions.click(this.OffersLink);
            break;
            case 'orders':
            return ElementActions.click(this.OrdersLink);
            break;
            case 'favourites':
            return ElementActions.click(this.FavouritesLink);
            break;
            default:
            return ElementActions.click(this.homeLink);
            break;

    }
    }





}
export const mainHeader= new headerPage();