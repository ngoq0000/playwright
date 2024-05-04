import {test, expect} from '@playwright/test';

test('exercise1', async({page}) => {
    const userName = 'rahulshetty@gmail.com';
    const password = 'Iamking@000';
    const location = 'Vietnam';
    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder('email@example.com').fill(userName);
    await page.getByPlaceholder('enter your passsword').fill(password);
    await page.getByRole('button', {name: 'login'}).click();
    await page.locator('//b[text()="IPHONE 13 PRO"]/parent::h5/following-sibling::button[2]').click();
    await page.getByRole('button').filter({hasText: 'Cart'}).first().click();
    await page.getByRole('button', {name: 'Checkout'}).click();
    await page.getByPlaceholder('Select Country').fill(location);
    await page.keyboard.press('Backspace');
    await page.getByRole('button').filter({hasText: location}).click();
    await page.getByText('Place Order').click();
    let expectedOrderID = await page.locator('//label[contains(@class,"inserted")]').textContent();
    expectedOrderID = (expectedOrderID != null)? expectedOrderID.substring(3, expectedOrderID.length-3) : expectedOrderID;
    console.log(expectedOrderID);
    await page.getByRole('button', {name: 'Orders'}).click();
    let actualOrderID = await page.locator('//tbody/tr[1]/th').textContent();
    expect(actualOrderID).toBe(expectedOrderID);
});