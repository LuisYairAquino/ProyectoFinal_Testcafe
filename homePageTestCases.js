import page from './pageObject';
import { data } from './data';
import { ClientFunction } from 'testcafe';

fixture('Performing Tests for Home Module')
    .page ('http://automationpractice.com');

//VARIABLES
let getLocation

//TEST 01
test('Validate each link in Banner takes to a different page',async t =>
{
    await t
        //Maximizing the Screen
        .maximizeWindow()

        //Validating the url belongs to HOME Page
        getLocation = ClientFunction(() => document.location.href);
    await t
        .expect(getLocation()).notContains('id_category=')


    await t
        //Navigating to WOMENS page
        .click(page.bnr_Women)

        //Validating the url belongs to WOMENS Page
        getLocation = ClientFunction(() => document.location.href);
    await t
        .expect(getLocation()).contains('id_category=3')


    await t
        //Navigating to DRESSES page
        .click(page.bnr_Dresses)

        //Validating the url belongs to DRESSES Page
         getLocation = ClientFunction(() => document.location.href);
    await t
        .expect(getLocation()).contains('id_category=8')


    await t
        //Navigating to TSHIRTS page
        .click(page.bnr_Tshirts)

        //Validating the url belongs to TSHIRTS Page
        getLocation = ClientFunction(() => document.location.href);
    await t
        .expect(getLocation()).contains('id_category=5')

});

//TEST 02
test('Testing Banner links has same order in all pages', async t =>
{
    await t
        //Maximizing the Screen
        .maximizeWindow()

    await t
        //Validating arrangement of links in Banner at HOME Page
        .expect(page.bnr_Women.innerText).eql('WOMEN')
        .expect(page.bnr_Dresses.innerText).eql('DRESSES')
        .expect(page.bnr_Tshirts.innerText).eql('T-SHIRTS')
        .takeScreenshot()
    
    await t
        //Navigating to WOMENS page
        .click(page.bnr_Women)

    await t
        //Validating arrangement of links in Banner at WOMENS Page
        .expect(page.bnr_Women.innerText).eql('WOMEN')
        .expect(page.bnr_Dresses.innerText).eql('DRESSES')
        .expect(page.bnr_Tshirts.innerText).eql('T-SHIRTS')
        .takeScreenshot()

     await t
        //Navigating to DRESSES page
        .click(page.bnr_Dresses)

    await t
        //Validating arrangement of links in Banner at DRESSES Page
        .expect(page.bnr_Women.innerText).eql('WOMEN')
        .expect(page.bnr_Dresses.innerText).eql('DRESSES')
        .expect(page.bnr_Tshirts.innerText).eql('T-SHIRTS')
        .takeScreenshot()

    await t
        //Navigating to TSHIRTS page
        .click(page.bnr_Tshirts)

    await t
        //Validating arrangement of links in Banner at TSHIRTS Page
        .expect(page.bnr_Women.innerText).eql('WOMEN')
        .expect(page.bnr_Dresses.innerText).eql('DRESSES')
        .expect(page.bnr_Tshirts.innerText).eql('T-SHIRTS')
        .takeScreenshot()
});

//TEST 03
test('Test logo takes to home page', async t =>
{
    await t
        //Maximizing the Screen
        .maximizeWindow()

        //Validating the url belongs to HOME Page
        getLocation = ClientFunction(() => document.location.href);
    await t
        .expect(getLocation()).notContains('id_category=')


    //CHECKING FROM WOMENS PAGE
    await t
        //Navigating to WOMENS page
        .click(page.bnr_Women)

        //Validating the url belongs to WOMENS Page
        getLocation = ClientFunction(() => document.location.href);
    await t
        .expect(getLocation()).contains('id_category=3')

    await t
        //Clicking in the Logo
        .click(page.lnk_Logo)

        //Validating the url belongs to HOME Page
        getLocation = ClientFunction(() => document.location.href);
    await t
        .expect(getLocation()).notContains('id_category=')


    //CHECKING FROM DRESSES PAGE
    await t
        //Navigating to DRESSES page
        .click(page.bnr_Dresses)

        //Validating the url belongs to DRESSES Page
         getLocation = ClientFunction(() => document.location.href);
    await t
        .expect(getLocation()).contains('id_category=8')

    await t
        //Clicking in the Logo
        .click(page.lnk_Logo)

        //Validating the url belongs to HOME Page
        getLocation = ClientFunction(() => document.location.href);
    await t
        .expect(getLocation()).notContains('id_category=')


    //CHECKING FROM TSHIRTS PAGE
    await t
        //Navigating to TSHIRTS page
        .click(page.bnr_Tshirts)

        //Validating the url belongs to TSHIRTS Page
        getLocation = ClientFunction(() => document.location.href);
    await t
        .expect(getLocation()).contains('id_category=5')

    await t
        //Clicking in the Logo
        .click(page.lnk_Logo)

        //Validating the url belongs to HOME Page
        getLocation = ClientFunction(() => document.location.href);
    await t
        .expect(getLocation()).notContains('id_category=')
});

//TEST 04
test('Perform search Inexistent Item', async t =>
{
    await t
        //Maximizing the Screen
        .maximizeWindow()

    await t
        //Entering an Invalid Search Term and click Search Icon
        .typeText(page.txt_SearchBox,data.inExistentItem)
        .click(page.btn_SearchIcon)

    await t
        .expect(await page.msg_NoResults.exists).ok()
    
  //  await t
        //.expect(Selector('#center_column > h1').innerText).eql('you didn\'t tell me who you are.')
        //console.log ( page.msg_NoResults.innerText)
        //.eql('No results were found for your search \" ' + data.inExistentItem + '\"')
        //.expect(page.msg_NoResults.innerText).eql(data.firstName + ' ' + data.lastName)


});

//TEST 05
test('Perform search good Item', async t =>
{


});