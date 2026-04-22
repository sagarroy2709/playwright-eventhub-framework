import { test as credentialsTest } from './credentials.fixture';
import { expect, BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.po";
import { ENV } from '../config/env.config';

type AuthFixture = {
    userPage: Page;
    authenticatedPage: Page;
};

type AuthWorkerFixture = {
    userOneContext: BrowserContext;
};

export const test = credentialsTest.extend<AuthFixture, AuthWorkerFixture>({

    userOneContext: [async ({ browser }, use) => {
        const context = await browser.newContext();
        await use(context);
        await context.close();
    }, { scope: 'worker' }],

    userPage: async ({ userOneContext }, use) => {
        const page = await userOneContext.newPage();
        await use(page);
        await page.close();
    },

    authenticatedPage: async ({ userPage, credentials }, use) => {
        const loginPage = new LoginPage(userPage);
        await loginPage.goto(ENV.BASE_URL);
        await loginPage.loginAs(credentials.username, credentials.password);
        await use(userPage);
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