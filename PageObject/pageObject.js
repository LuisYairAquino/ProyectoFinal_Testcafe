import { Selector } from 'testcafe';

class Page
{
    constructor()
    {
        //Home Page
        this.signIn_link = Selector('a').withText('Sign in');
        this.women_link = Selector('a').withText('WOMEN');
        this.sections_div = Selector('#center_column > div.content_scene_cat > div > div > span');
        this.dresses_link = Selector('a').withText('DRESSES');
        this.tshirts_link = Selector('a').withText('T-SHIRTS');
        this.logo_link = Selector('#header_logo > a > img');
        this.searchBox_input = Selector('#search_query_top');
        this.submitSearch_btn = Selector('#searchbox > button');
        this.resultsNotFound_msg = Selector('#center_column > p');
        
        //Authentication
        this.accountError_msg = Selector('#create_account_error');
        this.emailAccount_input = Selector('#email_create');
        this.createAccountBtn = Selector('#SubmitCreate');
        this.registeredEmail_input = Selector('#email');
        this.registeredPwd_input = Selector('#passwd');
        this.signInAuthBtn = Selector('#SubmitLogin');
        this.authenticationError_msg = Selector('#center_column > div:nth-child(2)');

        //Create an Account Form
        this.accountFormError = Selector('.alert > p:nth-child(1)'); 
        this.firstName_input = Selector('#customer_firstname')
        this.lastName_input = Selector('#customer_lastname')
        this.address_input = Selector('#address1');
        this.city_input = Selector('#city');
        this.stateDropdown = Selector('#id_state');
        this.stateOption = Selector('option').withText('Arizona');
        this.postalCode_input = Selector('#postcode');
        this.countryDropdown = Selector('#id_country');
        this.countryOption = Selector('option').withText('United States');
        this.mobilePhone_input = Selector('#phone_mobile');
        this.registerAccountBtn = Selector('#submitAccount');
        this.alias_input = Selector ('#alias'); // if we skip this filed you can continue -- bug
        this.welcomeMessage = Selector('#center_column > p');

        //My account
        this.userName_link = Selector('a').withText('Luis Aquino');
        this.signOut_Link = Selector('a').withText('Sign out');

        //Forgot password
        this.forgotPwd_link = Selector('a').withText('Forgot your password?')
        this.retrievePwdBtn = Selector('button').withText('Retrieve Password')
        this.alertSuccess = Selector('#center_column > div > p')
        this.alertDanger = Selector('#center_column > div > div > p')

        //Change account Information
        this.myInformation = Selector('#center_column > div > div:nth-child(1) > ul > li:nth-child(4) > a > span')
        this.currentPwd = Selector('#old_passwd')
        this.submitInfo = Selector('button').withText('Save')
        this.alertPersonalSuccess = Selector('#center_column > div > p')

        //Items
        this.items = Selector('#center_column > ul > li > div > div.left-block > div > a.product_img_link > img')
        this.addToCart_link = Selector('#center_column > ul > li:nth-child(1) > div > div.right-block > div.button-container > a.button.ajax_add_to_cart_button.btn.btn-default > span')
        this.item_Link = Selector('#center_column > ul > li:nth-child(1) > div > div.right-block > div.button-container > a.button.lnk_view.btn.btn-default > span')
        this.addToCartBtn = Selector('a').withText('Add to cart')
        this.itemInMyCar_div = Selector('#layer_cart > div.clearfix > div.layer_cart_cart.col-xs-12.col-md-6')
        this.proceedBtn = Selector('a').withText('Proceed to checkout')
        this.proceedSummaryBtn = Selector('#center_column > p.cart_navigation.clearfix > a.button.btn.btn-default.standard-checkout.button-medium')
        this.summaryPage = Selector('#cart_title')
        this.proccedAddressesBtn = Selector('#center_column > form > p > button')
        this.addAnotherItemBtn = Selector('#cart_quantity_up_3_13_0_403043')
        this.trashBtn = Selector('.icon-trash')
        this.addressesPage = Selector('#center_column > h1')
        this.numberItems_input = Selector('#product_3_13_0_403043 > td.cart_quantity.text-center > input.cart_quantity_input.form-control.grey')
        this.shippingPage = Selector('#carrier_area > h1')
        this.proceedShippingBtn = Selector('#form > p > button')
        this.radioBtn = Selector('#delivery_option_403043_0')
        this.terms_checkBox = Selector('#cgv')
        this.paymentPage = Selector('#center_column > h1')
        this.payByBankBtn = Selector('#HOOK_PAYMENT > div:nth-child(1) > div > p > a')
        this.confirmOrder = Selector('#cart_navigation > button')
        this.orderCompleted_div = Selector('#center_column > div > p')
    }
}

export default new Page();