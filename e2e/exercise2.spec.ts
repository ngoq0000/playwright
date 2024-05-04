import {test, expect, Page} from '@playwright/test';
const userName = 'Admin';
const password = 'admin123';
const employeeName = 'Ravi M B';
const employeeUsername = 'diemquynh' + Math.floor(Math.random() * 1000);
const employeePassword = 'diemquynh' + Math.floor(Math.random() * 1000);

test.describe('Admin create new user and verify login function', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.getByPlaceholder('Username').fill(userName);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button').filter({hasText: 'Login'}).click();
        await page.locator('//span[text()="Admin"]').click();
        await page.getByRole('button').filter({hasText: 'Add'}).click();
        await page.locator('//label[text()="User Role"]//ancestor::div[2]//div[2]/div').click();
        await page.getByRole('option').filter({hasText: 'Admin'}).click();
        await page.locator('//label[text()="Employee Name"]//ancestor::div[2]//div[2]/div/div/input').fill(employeeName);
        await page.keyboard.press('Backspace');
        await page.getByRole('listbox').filter({hasText: employeeName}).click();
        await page.locator('//label[text()="Status"]//ancestor::div[2]//div[2]/div').click();
        await page.getByRole('option').filter({hasText: 'Enable'}).click();
        await page.locator('//label[text()="Username"]//ancestor::div[2]//div[2]/input').fill(employeeUsername);
        await page.locator('//label[text()="Password"]//ancestor::div[2]//div[2]/input').fill(employeePassword);
        await page.locator('//label[text()="Confirm Password"]//ancestor::div[2]//div[2]/input').fill(employeePassword);
        await page.getByRole('button').filter({hasText: 'Save'}).click();
        await page.waitForTimeout(8000);
        await page.locator('//i[contains(@class, "oxd-userdropdown")]').click();
        await page.locator('//a[text()="Logout"]').click();
    });

    test('User can login successfully', async({page}) => {
        await page.getByPlaceholder('Username').fill(employeeUsername);
        await page.getByPlaceholder('Password').fill(employeePassword);
        await page.getByRole('button').filter({hasText: 'Login'}).click();
        expect(await page.locator('//h6[text()="Dashboard"]').isVisible());
    });

    test('User can not log in successfully when providing username is empty', async({page}) => {
        await page.getByPlaceholder('Password').fill(employeePassword);
        await page.getByRole('button').filter({hasText: 'Login'}).click();
        expect(await page.locator(' //span[text()="Required"]').isVisible());
    });
});