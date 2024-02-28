import { test, expect } from '@playwright/test';

//const baseUrl = 'https://harmonious-melomakarona-6891a2.netlify.app/'; //prod
const baseUrl = "http://localhost:3000"; //dev env

test('Renders the app', async ({ page }) => {
    await page.goto(baseUrl);
    // check that there is a valid title in the doc
    const title = await page.title();
    expect(title).not.toBe('');
});

test('Options can be selected', async ({ page }) => {
    await page.goto(baseUrl);

    // check that the select boxes have options
    const categorySelectBox = await page.waitForSelector('select#category');

    const categories = await categorySelectBox.$$eval('option', options =>
        options.map(option => option.textContent)
    );

    expect(categories.length).toBeGreaterThan(0);

    // check that the three boxes can be interacted with 
    await page.selectOption('select#category', 'General Knowledge');
    await page.selectOption('select#difficulty', 'Hard');
    await page.fill('input#amount', '1');
});

test('Start Quiz button creates a new quiz', async ({ page }) => {
    await page.goto(baseUrl);
    await page.click('button#btnStart');

    // check that the questions render in the app
    const questionBoxExists = await page.waitForSelector('.question-section');
    expect(questionBoxExists).not.toBeNull();
});


