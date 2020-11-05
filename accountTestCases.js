import page from './pageObject';
import { data } from './data';

fixture('E2E Testing for Account Section')
    .page ('http://automationpractice.com');

//TC_01 - Negative scenario
test('Validate that the email address is empty in order to click on Create an account.', async t =>
{
    await t
        //I Maximize the Screen
        .maximizeWindow()
        //Click on Sign In
        .click(page.signIn_link)

    await t
        //Click on 'Create an account' button
        .click(page.createAccountBtn)
    
    await t
        //Alert danger7error message is shown
        .expect(page.accountError_msg.innerText).eql("Invalid email address.")
        .expect(page.accountError_msg.exists).ok()
        .takeScreenshot("InvalidEmail_Alert")
});

//TC_02 - Negative scenario 
test('Validate that enter an invalid Email and click on Create an account button', async t =>
{
    await t
        //I maximize the Screen
        .maximizeWindow()
        //Click on Sign In
        .click(page.signIn_link)

    
    await t
        //Invalid email address, then click on 'Create an account'
        .typeText(page.emailAccount_input, data.wrong_email)
        //Assert that the data is correct
        .expect(page.emailAccount_input.exists).ok()

        //Click on 'Create an account' button
        .click(page.createAccountBtn)
    
    await t
        //Error
        .expect(page.accountError_msg.innerText).eql("Invalid email address.")
        .expect(page.accountError_msg.exists).ok()
        .takeScreenshot("InvalidEmailAddress")
});

//TC_03 - Negative scenarios
test('Validate that the user can create an account leaving empty required fields', async t =>
{
    await t
        //I maximize the Screen.
        .maximizeWindow()
        //Click on Sign In.
        .click(page.signIn_link)

    await t
        //Enter a valid email address and click on 'Create an account'.
        .typeText(page.emailAccount_input, data.email)
        //Assert that the data is correct
        .expect(page.emailAccount_input.exists).ok()
        .click(page.createAccountBtn)

    await t
        //Click on 'Register' with empty fields.
        .wait(2000)
        .click(page.registerAccountBtn)

    await t
        //Error Messages
        .expect(page.accountFormError.innerText).eql("There are 8 errors")
        .expect(page.accountFormError.exists).ok()
        .takeScreenshot("FillIn_theForm")
});

//TC_04
test('Validate that when an account is created it is successful', async t =>
{
    await t
        //I maximize the Screen.
        .maximizeWindow()
        //Click on Sign In.
        .click(page.signIn_link)
    
    await t
       //Enter a valid email address and click on 'Create an account'.
       .typeText(page.emailAccount_input, data.email)
       //Assert that the data is correct
       .expect(page.emailAccount_input.exists).ok()
       .click(page.createAccountBtn)
        
    await t 
        //Form Inputd
        .typeText(page.firstName_input, data.firstName)
        //Assert that the data is correct
        .expect(page.firstName_input.value).contains( data.firstName)

        .typeText(page.lastName_input, data.lastName)
        //Assert that the data is correct
        .expect(page.lastName_input.value).contains( data.lastName)

        .typeText(page.registeredPwd_input, data.pwd)
        //Assert that the data is correct
        .expect(page.registeredPwd_input.value).contains( data.pwd)

        .typeText(page.address_input, data.pbox)
        //Assert that the data is correct
        .expect(page.address_input.value).contains( data.pbox)
        .takeScreenshot("AddressScreenshot")

        .typeText(page.city_input, data.city)
        //Assert that the data is correct
        .expect(page.city_input.value).contains( data.city)

        .click(page.stateDropdown)
        .click(page.stateOption)

        .typeText(page.postalCode_input, data.postalCode)
        //Assert that the data is correct
        .expect(page.postalCode_input.value).eql(data.postalCode)

        .click(page.countryDropdown)
        .click(page.countryOption)

        .typeText(page.mobilePhone_input, data.mobilePhone)
        //Assert that the data is correct
        .expect(page.mobilePhone_input.value).eql(data.mobilePhone)

        //.typeText(page.alias_input, data.alias)
        //Assert that the data is correct
        //.expect(page.alias_input.value).contains(data.alias)
        //.takeScreenshot("Form")

        //click on 'Register'
        .click(page.registerAccountBtn)

    await t

        .expect(page.welcomeMessage.exists).ok()

    await t
        .takeScreenshot("WelcomePage")

        //Check user Name in Navigation Bar
        .expect(page.userName_link.innerText).eql(data.firstName + ' ' + data.lastName)
        .expect(page.userName_link.exists).ok()

        //Sign Out
        .click(page.signOut_Link)
});

//TC_05
test('Try to login into the account usign invalid values', async t =>
{
    await t
        //I maximize the Screen.
        .maximizeWindow()
        //Click on Sign In.
        .click(page.signIn_link)

    await t
        //Click Sing In with empty fields
        .click(page.signInAuthBtn)

    await t
        //Error
        .expect(page.authenticationError_msg.innerText).contains("An email address required.")
        .expect(page.authenticationError_msg.exists).ok()
        .takeScreenshot('AuthEmail_Required')

    await t 
        //Type an invalid Email Address
        .typeText(page.registeredEmail_input, data.wrong_email)
        //Assertion
        .expect(page.registeredEmail_input.value).eql(data.wrong_email)
        .click(page.signInAuthBtn)

    await t
        //Expecting an error message
        .expect(page.authenticationError_msg.innerText).contains("Invalid email address.")
        .expect(page.authenticationError_msg.exists).ok()
        .takeScreenshot("InvalidEmailAddress")

    await t 
        //I type the Email
        .typeText(page.registeredEmail_input, data.registeredEmail, {replace: true})
        .expect(page.registeredEmail_input.value).eql(data.registeredEmail)
        .click(page.signInAuthBtn)

    await t
        //Expecting an error message
        .expect(page.authenticationError_msg.innerText).contains("Password is required.")
        .expect(page.authenticationError_msg.exists).ok()
        .takeScreenshot("PwdRequired")

    await t
        //I remove the email and type the password
        .click(page.registeredEmail_input)
        .pressKey('ctrl+a delete')
        .typeText(page.registeredPwd_input, data.pwd)
        //Assertion
        .expect(page.registeredPwd_input.value).eql(data.pwd)
        .click(page.signInAuthBtn)

    await t
        //Error
        .expect(page.authenticationError_msg.innerText).contains("An email address required.")
        .expect(page.authenticationError_msg.exists).ok()
        .takeScreenshot("EmailRequired")

    await t
        //I type the Email
        .typeText(page.registeredEmail_input, data.email)
        .expect(page.registeredEmail_input.value).eql(data.email)
        .click(page.signInAuthBtn)
        .takeScreenshot("ScreenshotSignIn")

        //Sign Out
        .click(page.signOut_Link)
});

//TC_06
test('Trigger the errors on Sign In Page', async t =>
{
    await t
        //I maximize the Screen.
        .maximizeWindow()
        //Click on Sign In.
        .click(page.signIn_link)

    await t
        //Click Sing In wihout Email and Password
        .click(page.signInAuthBtn)

    await t
        //Error
        .expect(page.authenticationError_msg.innerText).contains("An email address required.")
        .expect(page.authenticationError_msg.exists).ok()
        .takeScreenshot("SignErrorMsg")

    await t
        //None in email and click on 'Create an account' 
        .click(page.createAccountBtn)
    
    await t
        //Expecting an error message
        .expect(page.accountError_msg.innerText).contains("Invalid email address.")
        .expect(page.accountError_msg.exists).ok()
        .expect(page.authenticationError_msg.innerText).contains("An email address required.")
        .expect(page.authenticationError_msg.exists).ok()
        .takeScreenshot("DoubleErrorMsg")

    await t 
        //I type an invalid Email
        .typeText(page.registeredEmail_input, data.wrong_email)
        //Assert
        .expect(page.registeredEmail_input.value).eql(data.wrong_email)
        .click(page.signInAuthBtn)

    await t
        //Error
        .expect(page.authenticationError_msg.innerText).contains("Invalid email address.")
        .expect(page.authenticationError_msg.exists).ok()
        .takeScreenshot("InvalidEmail")

    await t
        //None in Email and click on 'Create an account' 
        .click(page.createAccountBtn)
        
    await t
        //Error
        .expect(page.accountError_msg.innerText).contains("Invalid email address.")
        .expect(page.accountError_msg.exists).ok()
        .expect(page.authenticationError_msg.innerText).contains("Invalid email address.")
        .expect(page.authenticationError_msg.exists).ok()
        .takeScreenshot("NoneEmail")

    await t 
        //I type the Email
        .typeText(page.txt_RegisteredEmail, data.registeredEmail, {replace: true})
        //Assertion
        .expect(page.txt_RegisteredEmail.value).eql(data.registeredEmail)
        .click(page.signInAuthBtn)

    await t
        //Error
        .expect(page.authenticationError_msg.innerText).contains("Password is required.")
        .expect(page.authenticationError_msg.exists).ok()
        .expect(page.accountError_msg.exists).notOk()
        .takeScreenshot("PasswordRequired")


    await t
        //None in email and click on 'Create an account' 
        .click(page.createAccountBtn)
        
    await t
        //Error
        .expect(page.accountError_msg.innerText).contains("Invalid email address.")
        .expect(page.accountError_msg.exists).ok()
        .expect(page.authenticationError_msg.innerText).contains("Password is required.")
        .expect(page.authenticationError_msg.exists).ok()
        .takeScreenshot()
    
    await t
        //Remove email and type the pwd
        .click(page.registeredEmail_input)
        .pressKey('ctrl+a delete')
        .typeText(page.registeredPwd_input, data.pwd)
        .expect(page.registeredPwd_input.value).eql(data.pwd)
        .click(page.signInAuthBtn)

    await t
        //Error
        .expect(page.authenticationError_msg.innerText).contains("An email address required.")
        .expect(page.authenticationError_msg.exists).ok()
        .expect(page.accountError_msg.exists).notOk()
        .takeScreenshot("RemoveEmail")

    await t
        //None in email and click on 'Create an account' 
        .click(page.createAccountBtn)
        
    await t
        //Error
        .expect(page.accountError_msg.innerText).contains("Invalid email address.")
        .expect(page.accountError_msg.exists).ok()
        .expect(page.authenticationError_msg.innerText).contains("An email address required.")
        .expect(page.authenticationError_msg.exists).ok()
        .takeScreenshot("Errors")
});

//TC_07
test('Validate that a password can be recovered with a valid email', async t =>{
    await t 
        //I maximize the Screen.
        .maximizeWindow()
        //Click on Sign In.
        .click(page.signIn_link)

    await t 

        .click(page.signIn_link)
        .click(page.forgotPwd_link)
        .takeScreenshot("RecoveringPwd")

    await t

        .typeText(page.registeredEmail_input, data.email)
        //Assertion
        .expect(page.registeredEmail_input.value).contains(data.email)

        .click(page.retrievePwdBtn)
        .takeScreenshot("SuccessRecoveringPwd")

    await t

        .expect(page.alertSuccess.exists).ok()

        
});

test('Validate that a password can be recovered with a not valid email', async t =>{
    await t 
        //I maximize the Screen.
        .maximizeWindow()
        //Click on Sign In.
        .click(page.signIn_link)

    await t

        .click(page.forgotPwd_link)

    await t

        .typeText(page.registeredEmail_input, data.email)
        .expect(page.registeredEmail_input.value).contains(data.email)

        .click(page.retrievePwdBtn)
        .expect(page.alertDanger.exists).ok()
        .takeScreenshot("NotValidEmailPwdAlertImg")
        
});

test('Validate changing my account information', async t =>{
    await t 

        .click(page.signIn_link)

    await t
        .typeText(page.registeredEmail_input, data.registeredEmail)
        .expect(page.registeredEmail_input.value).contains(data.registeredEmail)

        .typeText(page.password_input, data.pwd)
        .expect(page.password_input.value).contains(data.pwd)

        .click(page.signInAuthBtn)
    
    await t

        .click(page.userName_link)

    await t

        .click(page.myInformation)

    await t

        .typeText(page.currentPwd, data.pwd)
        .expect(password_input.currentPwd).contains(data.pwd)
        .click(page.submitInfo)

    await t

        .expect(page.alertPersonalSuccess.exists).ok()

        
});
