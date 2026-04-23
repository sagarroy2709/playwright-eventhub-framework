import { test as credentialsTest}  from './credentials.fixture';
import { expect, BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.po";
import { ENV } from '../config/env.config';
import { DashboardPage } from '../pages/DashboardPage.po';

type AuthWorkerFixture = {
    userOneContext: BrowserContext;
};

type AuthFixture = {
    authenticatedPage: Page;
};

export const test = credentialsTest.extend<AuthFixture, AuthWorkerFixture>({

    userOneContext: [async ({ browser, credentials }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goto(ENV.BASE_URL);
        await loginPage.loginAs(credentials.username, credentials.password);
        await dashboardPage.waitForLoad();
        await page.close();
        await use(context);
        await context.close();
    }, { scope: 'worker' }],

    authenticatedPage: async ({ userOneContext }, use) => {
        const page = await userOneContext.newPage();
        
        // 🚨 The core issue
        // After login, context is authenticated, but new page is blank
        // 🔑 Authentication happens at context level
        // 🔑 Navigation happens at page level
        // ✔ Login → stored in context
        // ❌ But never navigated new page
        // 🚨 Important rule
        // A new page does NOT inherit the previous page’s URL
        // It only inherits cookies/session
        // Tried below for the fix
        await page.goto(ENV.BASE_URL);

        await use(page);
        await page.close();
    },

});

export { expect };


















// import { test as base, expect, BrowserContext, Page } from "@playwright/test";
// import { ENV } from '../config/env.config'
// import { LoginPage } from "../pages/LoginPage.po";
// import { DashboardPage } from "../pages/DashboardPage.po";

// type AuthFixture = {

//     userOneContext: BrowserContext;
//     userPage: Page;
//     loginPage: LoginPage;
//     dashboardPage: DashboardPage;
//     authenticatedPage: Page;
//     //transfer the user to a separate file later
//     credentials: { username: string; password: string };
// };

// export const test = base.extend<AuthFixture>({

//     userOneContext: async ({ browser }, use) => {

//         const context = await browser.newContext();
//         await use(context);
//         await context.close();
//     },

//     userPage: async ({ userOneContext }, use) => {
//         const page = await userOneContext.newPage();
//         await use(page);
//         await page.close();
//     },

//     loginPage: async ({ userPage }, use) => {
//         const loginPage = new LoginPage(userPage); // ← just wrapping, not owning       
//         await loginPage.goto(ENV.BASE_URL);
//         await use(loginPage);
//         // no page.close() — loginPage didn't create page
//     },

//     authenticatedPage: async ({ loginPage, userPage }, use) => {
//         await loginPage.loginAs(ENV.USER_ONE.USERNAME, ENV.USER_ONE.PASSWORD);
//         await use(userPage);
//     },
// });
// export { expect };