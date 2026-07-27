const path = require('path')
const { sharedHelper, moduleHelper, fixturePath } = require(path.join(
  process.env.AURORA_MOBILE_E2E_ROOT,
  'test/e2e/helpers/paths'
))
const { test, expect } = require('@playwright/test')
const { loginAsTestUser, step, attachScreenshot } = sharedHelper('login')
const { waitForListReady, clickReady } = sharedHelper('ready')

const hasCredentials = !!(process.env.E2E_LOGIN && process.env.E2E_PASSWORD)

test.describe('Mobile contacts', () => {
  test.skip(!hasCredentials, 'Set E2E_LOGIN and E2E_PASSWORD in .env.e2e')

  test('opens first contact from the list and goes back', async ({ page }) => {
    test.setTimeout(120000)

    await loginAsTestUser(page)

    await step('Open Contacts from footer nav', async () => {
      await clickReady(page.getByTestId('nav-contacts'))
      await expect(page.getByTestId('contacts-list')).toBeVisible({
        timeout: 60000,
      })
      console.log('  → Contacts screen is open')
      await attachScreenshot(page, 'contacts-01-list-loading')
    })

    await step('Wait until contacts finished loading', async () => {
      await waitForListReady(page, {
        itemTestIds: 'contacts-item',
        emptyTestId: 'contacts-empty',
        spinnerSelectors: [
          '.contacts__loader_initial',
          '.contacts__loader_initial .q-spinner-dots',
        ],
        timeout: 60000,
      })
    })

    const items = page.getByTestId('contacts-item')
    const count = await items.count()

    await step(`Inspect contacts list (found ${count})`, async () => {
      if (count === 0) {
        console.log('  → Contacts list is empty')
        await attachScreenshot(page, 'contacts-02-empty')
        return
      }

      const first = items.first()
      const name = (
        await first.locator('.contact__name-text').innerText().catch(() => '')
      ).trim()
      const email = (
        await first.locator('.contact__email').innerText().catch(() => '')
      ).trim()
      console.log(`  → First contact name: ${name || '(no name)'}`)
      console.log(`  → First contact email: ${email || '(no email)'}`)
      await attachScreenshot(page, 'contacts-02-list')
    })

    test.skip(
      count === 0,
      'Contacts list is empty — add at least one contact for this smoke'
    )

    await step('Open first contact', async () => {
      await clickReady(items.first())
      console.log('  → Clicked first contacts-item')
    })

    await step('Wait for contact card', async () => {
      await expect(page.getByTestId('contacts-view')).toBeVisible({
        timeout: 30000,
      })
      await expect(page.getByTestId('contacts-view-name')).toBeVisible({
        timeout: 15000,
      })
      const name = (
        await page.getByTestId('contacts-view-name').innerText()
      ).trim()
      console.log(`  → Opened contact card: ${name}`)
      await attachScreenshot(page, 'contacts-03-view')
    })

    await step('Go back to contacts list', async () => {
      await clickReady(page.getByTestId('contacts-view-back'))
      await expect(page.getByTestId('contacts-view')).not.toBeVisible({
        timeout: 15000,
      })
      await expect(page.getByTestId('contacts-list')).toBeVisible({
        timeout: 30000,
      })
      await waitForListReady(page, {
        itemTestIds: 'contacts-item',
        emptyTestId: 'contacts-empty',
        spinnerSelectors: ['.contacts__loader_initial'],
        timeout: 60000,
      })
      await expect(page.getByTestId('contacts-item').first()).toBeVisible({
        timeout: 15000,
      })
      console.log('  → Back on contacts list')
      await attachScreenshot(page, 'contacts-04-back')
    })
  })
})
