import {Page, Locator, expect} from "@playwright/test"

export class MyBookingsDetailedPage{
    private readonly page: Page;
    private readonly checkForRefundEligibilityBtn: Locator;
    private readonly refundSpinner: Locator;
    private readonly refundResult: Locator;

    constructor(page: Page){
        this.page = page;
        this.checkForRefundEligibilityBtn = page.getByRole('button', { name: 'Check eligibility for refund?' });
        this.refundSpinner = page.getByTestId('refund-spinner');
        this.refundResult = page.getByTestId('refund-result');
    }

    async waitForPageToLoad(){
        await this.checkForRefundEligibilityBtn.waitFor();
    }
    
    async checkRefundEligibilityAndStatus(): Promise<string>{

        let refundResultMessage: string;
        await this.checkForRefundEligibilityBtn.click();
        await expect(this.refundSpinner).toBeHidden({ timeout: 6000 });
        await expect(this.refundResult).toBeVisible();
        refundResultMessage = await this.refundResult.innerText();
        return refundResultMessage;
    }
}