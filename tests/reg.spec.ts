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
    await regpage.Register({password:"123456rereeeeeeeeeeeeee23232323232323"})
    await expect (regpage.message).toContainText('password should contain');
  });

  test('no phone validation  ', async ({ page }) => {

    const regpage = new RegisterPg(page);
    await regpage.Register({password:"strongpassword"})
    expect (regpage.message).toContainText('phone number should contain');
  });

  test('no valid phone  ', async ({ page }) => {

    const regpage = new RegisterPg(page);
    await regpage.Register({password:"strongpassword",phone:"121212"})
    expect (regpage.message).toContainText('phone number should contain');
  });

//invalid email
const invalidemails = ['qww','qwqw@','wewewe@wewew'];
  for (const invalidemail of invalidemails)
  {
    test(`Invalid email :${invalidemail} `, async ({ page }) => {

      const regpage = new RegisterPg(page);
      await regpage.Register({password:"strongpassword",phone:"1212122222",last:"tom",email:invalidemail,country:"Angola"})
      expect (regpage.message).toContainText('Invalid email');
    });
    
  }
  
  test('no lastname ', async ({ page }) => {

    const regpage = new RegisterPg(page);
    await regpage.Register({password:"strongpassword",phone:"1212122222",email:"john@test.com",country:"Angola",accept:true})
    expect (regpage.message).toContainText('last name');
  });

  test('no Accept', async ({ page }) => {

    const regpage = new RegisterPg(page);
    await regpage.Register({password:"strongpassword",phone:"1212122222",last:"Doe",email:"john@test.com",country:"Angola",accept:true})
    expect (regpage.message).toContainText('Please accept terms and conditions');
  });

  test('All fields', async ({ page }) => {

    const regpage = new RegisterPg(page);
    await regpage.Register({password:"strongpassword",phone:"1212122222",first:"John",last:"Doe",email:"john@test.com",country:"Angola",accept:false})
    expect (regpage.message).toContainText('Successful');
  });
  
  test('No country selected', async ({ page }) => {

    const regpage = new RegisterPg(page);
    await regpage.Register({password:"strongpassword",phone:"1212122222",first:"John",last:"Doe",email:"john@test.com",accept:false})
    expect (regpage.message).toContainText('Country: ');
  });
});