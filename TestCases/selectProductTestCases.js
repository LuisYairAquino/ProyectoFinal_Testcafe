import page from '../PageObject/pageObject';
import { ClientFunction } from 'testcafe';
import { Selector } from 'testcafe';
import { data } from '../PageObject/data';

fixture('Performing Tests for Product List Module')
    .page ('http://automationpractice.com');

let getLocation;
let itemText;
let forCounter = 0;
let counter = 0;

//TC_01
test('Validate that select Dresses and check the list of elements', async t =>
{
    await t
        //I maximize the Screen
        .maximizeWindow()

         //URL Validation
         getLocation = ClientFunction(() => document.location.href)

    await t
        //URL Validation
        .expect(getLocation()).contains(data.url)

    await t
        //Goto women page
        .click(page.women_link)

        //Validating women's url
        getLocation = ClientFunction(() => document.location.href);
    await t
        .expect(getLocation()).contains(data.womenPage)

        //Do click in dresses link
        .click(page.dresses_link)

        //Total elements
        counter = Selector('#center_column > ul > li').count;

    await t
        .takeScreenshot('ItemsPage')
        //5 Items
        .expect(counter).eql(data.expectedItems);

    for(forCounter = 1; forCounter <= data.expectedItems; forCounter++)
    {
        itemText = Selector ('#center_column > ul > li:nth-child(' + forCounter + ') > div > div.right-block > h5 > a').getAttribute('title');
        
        //Validate Item Description contains the expected substring
        await t
            .expect(itemText).contains('Dress',' ' + itemText + ' contains the substring Dress')
    }
 });

//TC_02
test('Validate shopping cart and payment', async t =>
{
    await t
        //I maximize the Screen
        .maximizeWindow()

        //URL Validation
        getLocation = ClientFunction(() => document.location.href);
    
    await t
        //URL Validation
        .expect(getLocation()).contains(data.url)

    await t

        //Sign In with an account
        .click(page.signIn_link)
        .typeText(page.registeredEmail_input, data.existedAccount)
        .expect(page.registeredEmail_input.value).contains(data.pwdExisted)
        .typeText(page.registeredPwd_input, data.pwdExisted)
        .expect(page.registeredPwd_input.value).contains(data.pwdExisted)
        .click(page.signInAuthBtn)

    await t
        //Goto Dresses page
        .click(page.dresses_link)

    await t
        //Validate URL and DIV
        .expect(getLocation()).contains(data.dressesPage)
        .expect(page.sections_div.exists).ok()
    
    await t
        //Screenshot of Dresses
        .takeScreenshot('DressesPage')

        //Add to cart button is not shown
        .expect(page.addToCart_link.visible).notOk()

        //More button is not shown
        .expect(page.item_Link.visible).notOk()

        //Do hover on the first item
        .hover('#center_column > ul > li:nth-child(1)')

        //Screenshot of the item hovered
        .takeElementScreenshot('#center_column > ul > li:nth-child(1)')

        //Add cart button is shown
        .expect(page.addToCart_link.visible).ok()

        //More button is shown
        .expect(page.item_Link.visible).ok()

        //Click on Add To Cart button
        .click(page.addToCartBtn)

    await t
        //Click on Proceed to checkout button and expect next page
        .expect(page.itemInMyCar_div.exists).ok()
        .click(page.proceedBtn)

    await t
        //Add a new item from 1 to 2 items.
        .expect(page.summaryPage.exists).ok()
        .click(page.addAnotherItemBtn)
        .expect(page.numberItems_input.value).contains('2')
        .wait(2000)
        //Click on Proceed to checkout button
        .click(page.proceedSummaryBtn)
    
    await t
        //Click on Proceed to checkout button
        .expect(page.addressesPage.exists).ok()
        .click(page.proccedAddressesBtn)

    await t
        //Validate the radio button is checked, check the radio button and proceed
        .expect(page.shippingPage.exists).ok()
        .expect(page.radioBtn.checked).ok()
        .click(page.terms_checkBox)
        .click(page.proceedShippingBtn)

    await t
        //Do a payment process by Bank option
        .expect(page.paymentPage.exists).ok()
        .click(page.payByBankBtn)
        .click(page.confirmOrder)
    
    await t
        .expect(page.orderCompleted_div.exists).ok()

});