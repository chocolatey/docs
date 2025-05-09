import { testBaseline } from '@choco-playwright/tests/baseline';
import { expectUrl } from '@choco-playwright/assertions/expect-url';
import { test } from '@playwright/test';

testBaseline();

test('non-interactive items', async ({ page }) => {
    await page.goto('./');

    await expectUrl(page, 'http://localhost:5086/en-us/');
});
