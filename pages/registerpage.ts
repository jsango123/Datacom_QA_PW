import {expect,Locator,Page} from '@playwright/test';
import { TIMEOUT } from 'dns';

export class RegisterPg {

    readonly Fname :Locator;
    readonly Lname:Locator;
    readonly Phone : Locator;
    readonly Country :Locator;
    readonly Email :Locator;
    readonly Password:Locator;
    readonly RegBtn : Locator;
    readonly AcceptTC : Locator;
    readonly message : Locator;


    constructor (private page:Page)
    {
        this.Fname = page.getByRole('textbox', { name: 'First Name' });
        this.Lname = page.getByPlaceholder('Enter last name');
        this.Phone = page.getByRole('textbox', { name: 'Enter phone number' });
        this.Email = page.getByRole('textbox', { name: 'Enter email' });
        this.Country = page.locator('#countries_dropdown_menu');
        this.Password = page.getByRole('textbox', { name: 'Password' });
        this.AcceptTC = page.getByRole('checkbox',{name:'I agree with the terms and'})
        this.RegBtn = page.getByRole('button', { name: 'Register' });
        this.message = page.locator('#message')

    }

    public async navigatetopage()
    {
        await this.page.goto('https://qa-practice.netlify.app/bugs-form');
        await this.page.waitForLoadState('domcontentloaded');
    }

    public async Register({ first, last, email, phone, password, country, accept }: {
  first?: string;
  last?: string;
  email?: string;
  phone?: string;
  password?: string;
  country?: string;
  accept?: boolean;
}) 
    {
        await expect (this.RegBtn).toBeVisible();
        //Enter  fields if given 
        if (first) await this.Fname.fill(first);
        if (last) await this.Lname.fill(last);
        if (phone) await this.Phone.fill(phone);
        if (email) await this.Email.fill(email);
        if (password) await this.Password.fill(password);
        if (country) await this.Country.selectOption(country);
        if (accept) {
                const isEnabled = await this.AcceptTC.isEnabled();
                if (isEnabled) {
                  await this.AcceptTC.check();
                } else {
                  console.log('Terms & Conditions cannot be checked ');
                }
        }
        //Register with no fields entered 
        await this.RegBtn.click()
        return await  (this.message).textContent()||" ";
    }





    
            
}




