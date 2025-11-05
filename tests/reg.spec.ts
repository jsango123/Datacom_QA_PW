import {test ,expect} from '../basetest';
import {RegisterPg} from '../pages/registerpage'


test.describe('Registration page validations ',()=>{
  test.beforeEach(async({page}) => {
    const regpage = new RegisterPg(page);
    await regpage.navigatetopage();

  });

  test('no fields are entered ', async ({ page }) => {

    const regpage = new RegisterPg(page);
    await regpage.Register({})
    await expect (regpage.message).toContainText('password should contain');
  });
//only short password 
  test('short password only  ', async ({ page }) => {

    const regpage = new RegisterPg(page);
    await regpage.Register({password:"123"})
    await expect (regpage.message).toContainText('password should contain');
  });

  test('longer password only  ', async ({ page }) => {

    const regpage = new RegisterPg(page);
    await regpage.Register({password:"123456rereeeeeee7787878eeeeeee23232323232323"});
    await expect (regpage.message).toContainText('password should contain');
  });

  test('no phone validation  ', async ({ page }) => {

    const regpage = new RegisterPg(page);
    await regpage.Register({password:"strongpassword"});
    await expect (regpage.message).toContainText('phone number should contain');
  });
  test('valid email validation  ', async ({ page }) => {
    const em = "sara@test.com"
    const regpage = new RegisterPg(page);
    await regpage.Register({password:"strongpassword",phone:"1212122222",last:"Sara",email:em});
    await expect (regpage.message).toContainText('Success');
    await expect(page.locator('#resultEmail')).toHaveText(`Email: ${em}`);
  });
  test('valid  phone validation  ', async ({ page }) => {
    const phon = "1212122222"
    const regpage = new RegisterPg(page);
    await regpage.Register({password:"strongpassword",phone:"1212122222",last:"Sara",email:"sara@test.com"});
    await expect (regpage.message).toContainText('Success');
    await expect(page.locator('#resultPhone')).toHaveText(`Phone Number: ${phon}`);
  });
  test('valid  lastname validation  ', async ({ page }) => {
    const lst = "Doe"
    const regpage = new RegisterPg(page);
    await regpage.Register({password:"strongpassword",phone:"1212122222",last:lst,email:"sara@test.com"});
    await expect (regpage.message).toContainText('Success');
    await expect(page.locator('#resultLn')).toHaveText(`Last Name: ${lst}`);
  });
  test('country not selected ', async ({ page }) => {
    const regpage = new RegisterPg(page);
    await regpage.Register({password:"strongpassword",phone:"1212122222",last:"Jane",email:"sara@test.com"});
    await expect (regpage.message).toContainText('Success');
    await expect(page.locator('#country')).toHaveText(`Country: ""`);
  });
//Validation for invalid phone
//invalid email
const invalidephones = ['233','sdssd','34343^&^^^&'];
  for (const invalidphone of invalidephones)
  {
     test(`no valid phone :${invalidphone} `, async ({ page }) => {

        const regpage = new RegisterPg(page);
        await regpage.Register({password:"strongpassword",phone:invalidphone});
        await expect(page.locator('#resultPhone')).toHaveText("");
        await expect (regpage.message).toContainText('phone number should contain');
        
    });
 }

//invalid email
const invalidemails = ['qww','qwqw@','wewewe@wewew'];
  for (const invalidemail of invalidemails)
  {
    test(`Invalid email :${invalidemail} `, async ({ page }) => {

      const regpage = new RegisterPg(page);
      await regpage.Register({password:"strongpassword",phone:"1212122222",last:"tom",email:invalidemail,country:"Angola"});
      await expect (regpage.message).toContainText('Invalid email');
    });
    
  }

  //Validation for missing last name
  test('no lastname ', async ({ page }) => {

    const regpage = new RegisterPg(page);
    await regpage.Register({password:"strongpassword",phone:"1212122222",email:"john@test.com",country:"Angola",accept:false})
    expect (regpage.message).toContainText('last name');
  });
//Check for Accept terms
  test('no Accept', async ({ page }) => {

    const regpage = new RegisterPg(page);
    await regpage.Register({password:"strongpassword",phone:"1212122222",last:"Doe",email:"john@test.com",country:"Angola",accept:false})
    expect (regpage.message).toContainText('Please accept terms and conditions');
  });
//Success Validation
  test('All fields', async ({ page }) => {

    const regpage = new RegisterPg(page);
    //set  accept:False due to existing issue
    const fst ="John";
    const lst = "Doe";
    const em  = "john@test.com";
    const phon ="1212122222";
    const pswrd = "strongpassword";
    const cntry = "Angola";
    await regpage.Register({password:pswrd,phone:phon,first:fst,last:lst,email:em,country:cntry,accept:false})
    expect (regpage.message).toContainText('Successful');
            //validate data after submitting the form
            await expect(page.locator('#country')).toHaveText(`Country: ${cntry}`);
            await expect(page.locator('#resultEmail')).toHaveText(`Email: ${em}`);
            await expect(page.locator('#resultPhone')).toHaveText(`Phone Number: ${phon}`);
            await expect(page.locator('#resultFn')).toHaveText(`First Name: ${fst}`);
            await expect(page.locator('#resultLn')).toHaveText(`Last Name: ${lst}`);

  });
  
});