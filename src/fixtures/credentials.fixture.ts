import { test as base } from "@playwright/test";
import { ENV } from '../config/env.config';

type CredentialsFixture = {
    credentials: { username: string; password: string };
};

export const test = base.extend<CredentialsFixture>({
    credentials: async ({}, use) => {
        await use({
            username: ENV.USER_ONE.USERNAME,
            password: ENV.USER_ONE.PASSWORD,
        });
    },
});