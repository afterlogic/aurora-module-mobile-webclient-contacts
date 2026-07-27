const path = require('path')
const { sharedHelper, moduleHelper, fixturePath } = require(path.join(
  process.env.AURORA_MOBILE_E2E_ROOT,
  'test/e2e/helpers/paths'
))
const { test, expect } = require('@playwright/test')
const { loginAsTestUser, step, attachScreenshot } = sharedHelper('login')
const { clickReady, waitForListReady } = sharedHelper('ready')
const {
  openContacts,
  listReadyOptions,
  createContactViaFab,
  openContactByName,
  deleteOpenedContact,
} = require('./helpers/contacts')

const hasCredentials = !!(process.env.E2E_LOGIN && process.env.E2E_PASSWORD)

test.describe('Mobile contacts team and send', () => {
  test.skip(!hasCredentials, 'Set E2E_LOGIN and E2E_PASSWORD in .env.e2e')

  test('opens Team storage when available (read-only browse)', async ({
    page,
  }) => {
    test.setTimeout(120000)
    await loginAsTestUser(page)
    await openContacts(page)

    await step('Open drawer and select Team storage', async () => {
      await clickReady(page.getByTestId('contacts-folder-menu'))
      await expect(page.getByTestId('mail-drawer')).toBeVisible({
        timeout: 15000,
      })
      const team = page
        .getByTestId('contacts-storage-item')
        .filter({ hasText: /team/i })
        .first()
      test.skip((await team.count()) === 0, 'No Team storage on this stand')
      await clickReady(team)
      await expect(page.getByTestId('contacts-list')).toBeVisible({
        timeout: 30000,
      })
      await waitForListReady(page, listReadyOptions)
      console.log('  → Team storage open')
      await attachScreenshot(page, 'contacts-team-01')
    })

    await step('Open first team contact if any', async () => {
      const items = page.getByTestId('contacts-item')
      if ((await items.count()) === 0) {
        console.log('  → Team storage empty')
        return
      }
      await clickReady(items.first())
      await expect(page.getByTestId('contacts-view')).toBeVisible({
        timeout: 30000,
      })
      // Team contacts typically cannot be deleted/edited.
      await clickReady(page.getByTestId('contacts-view-more'))
      await expect(page.getByTestId('contacts-menu-delete')).toHaveCount(0)
      console.log('  → Team contact view (no delete in menu)')
      await attachScreenshot(page, 'contacts-team-02-view')
      await page.keyboard.press('Escape').catch(() => undefined)
      await clickReady(page.getByTestId('contacts-view-back'))
    })
  })

  test('Send action from contact menu', async ({ page }) => {
    test.setTimeout(180000)
    await loginAsTestUser(page)
    await openContacts(page)

    const stamp = Date.now()
    const fullName = `E2E Send ${stamp}`
    const email = `e2e.send.${stamp}@example.com`

    await step('Create contact', async () => {
      await createContactViaFab(page, { fullName, email })
    })

    await step('Overflow → Send', async () => {
      await clickReady(page.getByTestId('contacts-view-more'))
      const send = page.getByTestId('contacts-menu-send')
      test.skip((await send.count()) === 0, 'Send action not in contact menu')
      await clickReady(send)
      const notification = page.locator('.q-notification').first()
      await expect
        .poll(
          async () => {
            if (await notification.isVisible().catch(() => false)) {
              return (await notification.innerText()).trim()
            }
            if (await page.getByTestId('mail-compose').isVisible().catch(() => false)) {
              return 'compose'
            }
            return 'pending'
          },
          { timeout: 15000 }
        )
        .not.toBe('pending')

      if (await page.getByTestId('mail-compose').isVisible().catch(() => false)) {
        console.log('  → Compose opened from Send')
        await attachScreenshot(page, 'contacts-send-compose')
        await clickReady(page.getByTestId('mail-compose-back'))
        const discard = page.getByTestId('mail-compose-discard-dialog')
        if (await discard.isVisible().catch(() => false)) {
          await clickReady(page.getByTestId('mail-compose-discard-ok'))
        }
      } else {
        const text = (await notification.innerText()).trim()
        console.log(`  → Notification: ${text}`)
        await attachScreenshot(page, 'contacts-send-unexpected')
        expect(text.toLowerCase()).not.toMatch(/comm?ing\s*soon/)
        throw new Error(`Expected compose after Send, got notification: ${text}`)
      }
    })

    await step('Cleanup', async () => {
      if (await page.getByTestId('contacts-view').isVisible().catch(() => false)) {
        await deleteOpenedContact(page, fullName)
        return
      }
      await openContacts(page)
      await openContactByName(page, fullName)
      await deleteOpenedContact(page, fullName)
    })
  })
})
