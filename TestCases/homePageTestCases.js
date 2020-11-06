import page from '../PageObject/pageObject';
import { ClientFunction } from 'testcafe';
import { data } from '../PageObject/data';

let getLocation
let counter = 0;

fixture('Home Page E2E Testing')
    .page (data.url);

//TC_01
test('Validate that each link in the menu redirects you to a different page',async t =>
{
    await t
        //I maximize the screen
        .maximizeWindow()
        
        //URL Validation
        getLocation = ClientFunction(() => document.location.href)

    await t
        //URL Validation
         .expect(getLocation()).contains(data.url);


    await t

        //Goto Women Page
        .click(page.women_link)

    await t
        //Validate URL and DIV
        .expect(getLocation()).contains(data.womenPage)
        .expect(page.sections_div.exists).ok()


    await t
        //Navigating to DRESSES page
        .click(page.dresses_link)

    await t

        //Validate URL and DIV
        .expect(getLocation()).contains(data.dressesPage)
        .expect(page.sections_div.exists).ok()

    await t
        //Goto T-shirts
        .click(page.tshirts_link)

    await t

        //Validate URL and DIV
        .expect(getLocation()).contains(data.tshirtsPage)
        .expect(page.sections_div.innerText).eql('T-shirts')

});

//TC_02
test('Validate that the menu has the same order when changing pages', async t =>
{
    await t
        //I maximize the screen
        .maximizeWindow()

    await t
        //The menu is present on the home page
        .expect(page.women_link.innerText).eql('WOMEN')
        .expect(page.dresses_link.innerText).eql('DRESSES')
        .expect(page.tshirts_link.innerText).eql('T-SHIRTS')
        .takeScreenshot("HomePage")
    
    await t
        //Goto Women section
        .click(page.women_link)

    await t
        //The menu is present on the Women Page
        .expect(page.women_link.innerText).eql('WOMEN')
        .expect(page.dresses_link.innerText).eql('DRESSES')
        .expect(page.tshirts_link.innerText).eql('T-SHIRTS')
        .takeScreenshot("WomenPage")

     await t
        //Goto Dresses Section
        .click(page.dresses_link)

    await t
        //The menu is present on the dresses Page
        .expect(page.women_link.innerText).eql('WOMEN')
        .expect(page.dresses_link.innerText).eql('DRESSES')
        .expect(page.tshirts_link.innerText).eql('T-SHIRTS')
        .takeScreenshot("DressesPage")

    await t
        //Go to T-shirt Section
        .click(page.tshirts_link)

    await t
        //The menu is present on the T-shirts Page
        .expect(page.women_link.innerText).eql('WOMEN')
        .expect(page.dresses_link.innerText).eql('DRESSES')
        .expect(page.tshirts_link.innerText).eql('T-SHIRTS')
        .takeScreenshot("TshirtsPage")
});

//TC_03
test('Validate that the logo returns you correctly to the home page', async t =>
{
    await t
        //I maximize the screen
        .maximizeWindow()
        
        //URL validation
        getLocation = ClientFunction(() => document.location.href)

    await t

        //URL validation
        .expect(getLocation()).contains(data.url);

    await t
        //Goto Women Section
        .click(page.women_link)

    await t

        //Validate the Women URL
        .expect(getLocation()).contains(data.womenPage)

    await t
        //Do click on the logo
        .click(page.logo_link)

    await t
        //URL validation
        .expect(getLocation()).contains(data.url)

    await t
        //Goto Dresses Section
        .click(page.dresses_link)

    await t
        //Validate the Dresses URL
        .expect(getLocation()).contains(data.dressesPage)

    await t

        //Do click on the logo
        .click(page.logo_link)

    await t
        //URL validation
        .expect(getLocation()).contains(data.url)

    await t
        //Goto T-shirts Page
        .click(page.tshirts_link)

    await t

        //Validate the T-shirts URL
        .wait(5000)
        .expect(getLocation()).contains(data.tshirtsPage)

    await t
        //Do click on the logo
        .click(page.logo_link)

    await t
        //URL validation
        .expect(getLocation()).contains(data.url)
});

//TC_04
test('Validate to search for an item that does not exist', async t =>
{
    await t
        //I maximize the screen
        .maximizeWindow()

    await t
        //I enter an invalid item
        .typeText(page.searchBox_input,data.notFoundItem)
        .expect(page.searchBox_input.value).contains(data.notFoundItem)

        .click(page.submitSearch_btn)

    await t

        //Error message validation
        .expect(page.resultsNotFound_msg.exists).ok()

});

//TC_05
test('Validate to search for an item that exists', async t =>
{
    await t
        //I maximize the screen
        .maximizeWindow()

    await t
        //I enter a valid item
        .typeText(page.searchBox_input,data.availableItem)
        .expect(page.searchBox_input.value).contains(data.availableItem)
        .click(page.submitSearch_btn)

    await t
        //Item is shown
        .expect(page.items.exists).ok()
        .takeScreenshot("AvailableItem")

});