import { test as base } from "@playwright/test";
import { ENV } from '../config/env.config';

type CredentialsWorkerFixture = {
    credentials: { username: string; password: string };
};

export const test = base.extend<{}, CredentialsWorkerFixture>({
    credentials: [async ({}, use) => {
        await use({
            username: ENV.USER_ONE.USERNAME,
            password: ENV.USER_ONE.PASSWORD,
        });
    }, 
    { scope: 'worker' }],
});
//Above was worker fixture

// import { test as base } from "@playwright/test";
// import { ENV } from '../config/env.config';

// type CredentialsFixture = {
//     credentials: { username: string; password: string };
// };

// export const test = base.extend<CredentialsFixture>({
//     credentials: async ({}, use) => {
//         await use({
//             username: ENV.USER_ONE.USERNAME,
//             password: ENV.USER_ONE.PASSWORD,
//         });
//     },
// });