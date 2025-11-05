import { test as base,Browser,expect,Page,BrowserContext,PlaywrightTestArgs,chromium} from '@playwright/test';

interface Fixtures{
    browser:Browser;
    page:Page;
    context:BrowserContext;
}
export const test = base.extend<Fixtures>({

    browser:async({},use) => {
        const browser = await chromium.launch({headless:false});
        await(use(browser));
        await browser.close();
    },

    context:async({browser},use) => {
        const context = await browser.newContext();
        await(use(context));
        await context.close();
    },

    page:async({context},use)=>{
        const page = await context.newPage();
        await(use(page));
    }


    })

    export type FixtureArgs = PlaywrightTestArgs & Fixtures;

export { expect };

