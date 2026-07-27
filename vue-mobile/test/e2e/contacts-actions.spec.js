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
  fillContactsField,
  listReadyOptions,
  createContactViaFab,
  openContactByName,
  deleteOpenedContact,
} = require('./helpers/contacts')

const hasCredentials = !!(process.env.E2E_LOGIN && process.env.E2E_PASSWORD)

test.describe('Mobile contacts actions', () => {
  test.skip(!hasCredentials, 'Set E2E_LOGIN and E2E_PASSWORD in .env.e2e')

  test('opens drawer, shows storages, and switches storage', async ({
    page,
  }) => {
    test.setTimeout(120000)
    await loginAsTestUser(page)
    await openContacts(page)

    await step('Open contacts drawer', async () => {
      await clickReady(page.getByTestId('contacts-folder-menu'))
      await expect(page.getByTestId('mail-drawer')).toBeVisible({
        timeout: 15000,
      })
      const storages = page.getByTestId('contacts-storage-item')
      await expect(storages.first()).toBeVisible({ timeout: 15000 })
      const count = await storages.count()
      console.log(`  → Storages: ${count}`)
      expect(count).toBeGreaterThan(0)
      await attachScreenshot(page, 'contacts-drawer-01')
    })

    await step('Select first storage', async () => {
      const first = page.getByTestId('contacts-storage-item').first()
      const firstName =
        (await first.getAttribute('data-storage-name')) ||
        (await first.innerText()).trim()
      await clickReady(first)
      await expect(page.getByTestId('contacts-list')).toBeVisible({
        timeout: 30000,
      })
      await waitForListReady(page, listReadyOptions)
      console.log(`  → Selected storage: ${firstName}`)
    })

    await step('Switch to another storage if available', async () => {
      await clickReady(page.getByTestId('contacts-folder-menu'))
      await expect(page.getByTestId('mail-drawer')).toBeVisible({
        timeout: 15000,
      })
      const storages = page.getByTestId('contacts-storage-item')
      const count = await storages.count()
      if (count < 2) {
        console.log('  → Only one storage — skip switch')
        await page.keyboard.press('Escape')
        return
      }
      const second = storages.nth(1)
      const secondName =
        (await second.getAttribute('data-storage-name')) ||
        (await second.innerText()).trim()
      await clickReady(second)
      await expect(page.getByTestId('contacts-list')).toBeVisible({
        timeout: 30000,
      })
      await waitForListReady(page, listReadyOptions)
      console.log(`  → Switched storage: ${secondName}`)
      await attachScreenshot(page, 'contacts-drawer-02-switched')
    })
  })

  test('search filters contacts list', async ({ page }) => {
    test.setTimeout(120000)
    await loginAsTestUser(page)
    await openContacts(page)

    const first = page.getByTestId('contacts-item').first()
    test.skip(
      (await page.getByTestId('contacts-item').count()) === 0,
      'Contacts list is empty'
    )

    const name = (
      await first.locator('.contact__name-text').innerText().catch(() => '')
    ).trim()
    const email = (
      await first.locator('.contact__email').innerText().catch(() => '')
    ).trim()
    const query = (name || email).split(/\s+/)[0]
    test.skip(!query, 'No searchable name/email on first contact')

    await step('Open search and type query', async () => {
      await clickReady(page.getByTestId('contacts-search'))
      await expect(page.getByTestId('contacts-search-input')).toBeVisible({
        timeout: 15000,
      })
      await page
        .getByTestId('contacts-search-input')
        .locator('input')
        .fill(query)
      console.log(`  → Search query: ${query}`)
      await waitForListReady(page, listReadyOptions)
      await attachScreenshot(page, 'contacts-search-01')
    })

    await step('Expect filtered list contains query', async () => {
      const items = page.getByTestId('contacts-item')
      await expect(items.first()).toBeVisible({ timeout: 30000 })
      const count = await items.count()
      console.log(`  → Results: ${count}`)
      expect(count).toBeGreaterThan(0)
      await expect(items.first()).toContainText(new RegExp(query, 'i'))
    })

    await step('Close search', async () => {
      await clickReady(page.getByTestId('contacts-search-close'))
      await expect(page.getByTestId('contacts-search-input')).toBeHidden({
        timeout: 15000,
      })
      await expect(page.getByTestId('contacts-search')).toBeVisible()
    })
  })

  test('creates a contact via FAB', async ({ page }) => {
    test.setTimeout(180000)
    await loginAsTestUser(page)
    await openContacts(page)

    const stamp = Date.now()
    const fullName = `E2E Contact ${stamp}`
    const email = `e2e.contact.${stamp}@example.com`

    await step('Create contact', async () => {
      await createContactViaFab(page, { fullName, email })
      console.log(`  → Created contact: ${fullName}`)
      await attachScreenshot(page, 'contacts-create-02-view')
    })

    await step('Back to list and find new contact', async () => {
      await clickReady(page.getByTestId('contacts-view-back'))
      await expect(page.getByTestId('contacts-list')).toBeVisible({
        timeout: 30000,
      })
      await waitForListReady(page, listReadyOptions)
      await expect(
        page.getByTestId('contacts-item').filter({ hasText: fullName }).first()
      ).toBeVisible({ timeout: 30000 })
      await attachScreenshot(page, 'contacts-create-03-list')
    })
  })

  test('edits a contact name', async ({ page }) => {
    test.setTimeout(180000)
    await loginAsTestUser(page)
    await openContacts(page)

    const stamp = Date.now()
    const fullName = `E2E Edit ${stamp}`
    const renamed = `E2E Edited ${stamp}`
    const email = `e2e.edit.${stamp}@example.com`

    await step('Create contact to edit', async () => {
      await createContactViaFab(page, { fullName, email })
    })

    await step('Open edit and rename', async () => {
      await clickReady(page.getByTestId('contacts-view-more'))
      await expect(page.getByTestId('contacts-menu-edit')).toBeVisible({
        timeout: 10000,
      })
      await clickReady(page.getByTestId('contacts-menu-edit'))
      await expect(page.getByTestId('contacts-edit')).toBeVisible({
        timeout: 30000,
      })
      await fillContactsField(page, 'contacts-edit-name', renamed)
      await clickReady(page.getByTestId('contacts-edit-save'))
      await expect(page.getByTestId('contacts-view')).toBeVisible({
        timeout: 45000,
      })
      await expect(page.getByTestId('contacts-view-name')).toContainText(
        renamed,
        { timeout: 15000 }
      )
      console.log(`  → Renamed: ${fullName} → ${renamed}`)
      await attachScreenshot(page, 'contacts-edit-01')
    })

    await step('Cleanup: delete edited contact', async () => {
      await deleteOpenedContact(page, renamed)
    })
  })

  test('deletes a contact', async ({ page }) => {
    test.setTimeout(180000)
    await loginAsTestUser(page)
    await openContacts(page)

    const stamp = Date.now()
    const fullName = `E2E Delete ${stamp}`
    const email = `e2e.delete.${stamp}@example.com`

    await step('Create contact to delete', async () => {
      await createContactViaFab(page, { fullName, email })
    })

    await step('Delete contact via overflow menu', async () => {
      await deleteOpenedContact(page, fullName)
      console.log(`  → Deleted: ${fullName}`)
      await attachScreenshot(page, 'contacts-delete-01')
    })
  })

  test('creates and deletes a group', async ({ page }) => {
    test.setTimeout(180000)
    await loginAsTestUser(page)
    await openContacts(page)

    const groupName = `E2E Group ${Date.now()}`

    await step('FAB → Create group', async () => {
      await clickReady(page.getByTestId('contacts-create-fab'))
      await expect(page.getByTestId('contacts-create-group')).toBeVisible({
        timeout: 15000,
      })
      await clickReady(page.getByTestId('contacts-create-group'))
      await expect(page.getByTestId('contacts-group-edit')).toBeVisible({
        timeout: 30000,
      })
      await fillContactsField(page, 'contacts-group-edit-name', groupName)
      await clickReady(page.getByTestId('contacts-group-edit-save'))
      await expect(page.getByTestId('contacts-group-view')).toBeVisible({
        timeout: 45000,
      })
      await expect(page.getByTestId('contacts-group-view')).toContainText(
        groupName,
        { timeout: 15000 }
      )
      console.log(`  → Group created: ${groupName}`)
      await attachScreenshot(page, 'contacts-group-01-created')
    })

    await step('Delete group', async () => {
      await clickReady(page.getByTestId('contacts-group-view-delete'))
      await expect(page.getByTestId('contacts-delete-group-dialog')).toBeVisible(
        { timeout: 15000 }
      )
      await clickReady(page.getByTestId('contacts-delete-group-confirm'))
      await expect(
        page.getByTestId('contacts-delete-group-dialog')
      ).toBeHidden({ timeout: 45000 })
      await expect(page.getByTestId('contacts-list')).toBeVisible({
        timeout: 30000,
      })
      await waitForListReady(page, listReadyOptions)
      console.log(`  → Group deleted: ${groupName}`)
      await attachScreenshot(page, 'contacts-group-02-deleted')
    })

    await step('Confirm group gone from drawer', async () => {
      await clickReady(page.getByTestId('contacts-folder-menu'))
      await expect(page.getByTestId('mail-drawer')).toBeVisible({
        timeout: 15000,
      })
      await expect(
        page.getByTestId('contacts-group-item').filter({ hasText: groupName })
      ).toHaveCount(0, { timeout: 15000 })
    })
  })

  test('opens compose from contact email action', async ({ page }) => {
    test.setTimeout(180000)
    await loginAsTestUser(page)
    await openContacts(page)

    const stamp = Date.now()
    const fullName = `E2E Compose ${stamp}`
    const email = `e2e.compose.${stamp}@example.com`

    await step('Create contact with email', async () => {
      await createContactViaFab(page, { fullName, email })
    })

    await step('Tap email compose action on contact card', async () => {
      const mailBtn = page.getByTestId('contacts-view-email-compose').first()
      await expect(mailBtn).toBeVisible({ timeout: 15000 })
      await clickReady(mailBtn)
      await expect(page.getByTestId('mail-compose')).toBeVisible({
        timeout: 30000,
      })
      await expect(
        page.getByTestId('mail-compose-to').locator('.recipients-input__chip')
      ).toBeVisible({ timeout: 15000 })
      const chipText = (
        await page
          .getByTestId('mail-compose-to')
          .locator('.recipients-input__chip')
          .first()
          .innerText()
          .catch(() => '')
      ).trim()
      console.log(`  → Compose To chip: ${chipText}`)
      expect(chipText.toLowerCase()).toContain(email.toLowerCase())
      await attachScreenshot(page, 'contacts-compose-01')
    })

    await step('Close compose without sending', async () => {
      await clickReady(page.getByTestId('mail-compose-back'))
      const discard = page.getByTestId('mail-compose-discard-dialog')
      if (await discard.isVisible().catch(() => false)) {
        await clickReady(page.getByTestId('mail-compose-discard-ok'))
      }
      await expect(page.getByTestId('mail-compose')).toBeHidden({
        timeout: 30000,
      })
    })

    await step('Cleanup: delete contact', async () => {
      // May land on contact view or contacts/mail — get back to contact.
      if (await page.getByTestId('contacts-view').isVisible().catch(() => false)) {
        await deleteOpenedContact(page, fullName)
        return
      }
      await openContacts(page)
      await openContactByName(page, fullName)
      await deleteOpenedContact(page, fullName)
    })
  })

  test('shares contact then unshares from Shared storage', async ({ page }) => {
    test.setTimeout(240000)
    await loginAsTestUser(page)
    await openContacts(page)

    const stamp = Date.now()
    const fullName = `E2E Share ${stamp}`
    const email = `e2e.share.${stamp}@example.com`

    await step('Create personal contact', async () => {
      await createContactViaFab(page, { fullName, email })
    })

    await step('Share contact', async () => {
      await clickReady(page.getByTestId('contacts-view-more'))
      const share = page.getByTestId('contacts-menu-share')
      test.skip(
        (await share.count()) === 0,
        'Share action not available (team/shared storage or permissions)'
      )
      await clickReady(share)
      // After share, app navigates to contacts list.
      await expect(page.getByTestId('contacts-list')).toBeVisible({
        timeout: 45000,
      })
      await waitForListReady(page, listReadyOptions)
      console.log(`  → Shared: ${fullName}`)
      await attachScreenshot(page, 'contacts-share-01')
    })

    await step('Open Shared storage and unshare', async () => {
      await clickReady(page.getByTestId('contacts-folder-menu'))
      await expect(page.getByTestId('mail-drawer')).toBeVisible({
        timeout: 15000,
      })
      const shared = page
        .getByTestId('contacts-storage-item')
        .filter({ hasText: /shared/i })
        .first()
      test.skip(
        (await shared.count()) === 0,
        'No Shared storage in drawer'
      )
      await clickReady(shared)
      await waitForListReady(page, listReadyOptions)
      await openContactByName(page, fullName)
      await clickReady(page.getByTestId('contacts-view-more'))
      await expect(page.getByTestId('contacts-menu-unshare')).toBeVisible({
        timeout: 10000,
      })
      await clickReady(page.getByTestId('contacts-menu-unshare'))
      await expect(page.getByTestId('contacts-list')).toBeVisible({
        timeout: 45000,
      })
      await waitForListReady(page, listReadyOptions)
      console.log(`  → Unshared: ${fullName}`)
      await attachScreenshot(page, 'contacts-share-02-unshared')
    })

    await step('Cleanup: delete from personal storage if still there', async () => {
      await clickReady(page.getByTestId('contacts-folder-menu'))
      const personal = page.getByTestId('contacts-storage-item').first()
      await clickReady(personal)
      await waitForListReady(page, listReadyOptions)
      const item = page
        .getByTestId('contacts-item')
        .filter({ hasText: fullName })
      if ((await item.count()) > 0) {
        await openContactByName(page, fullName)
        await deleteOpenedContact(page, fullName)
      } else {
        console.log('  → Contact already gone after unshare')
      }
    })
  })

  test('find in mail from contact menu', async ({ page }) => {
    test.setTimeout(180000)
    await loginAsTestUser(page)
    await openContacts(page)

    const stamp = Date.now()
    const fullName = `E2E FindMail ${stamp}`
    const email = `e2e.findmail.${stamp}@example.com`

    await step('Create contact', async () => {
      await createContactViaFab(page, { fullName, email })
    })

    await step('Overflow → Find in Mail', async () => {
      await clickReady(page.getByTestId('contacts-view-more'))
      const find = page.getByTestId('contacts-menu-find-in-mail')
      test.skip(
        (await find.count()) === 0,
        'Find in Mail not available'
      )
      await clickReady(find)
      await expect(page.getByTestId('mail-message-list')).toBeVisible({
        timeout: 60000,
      })
      console.log('  → Navigated to mail search/list')
      await attachScreenshot(page, 'contacts-find-mail-01')
    })

    await step('Cleanup: delete contact', async () => {
      await openContacts(page)
      await openContactByName(page, fullName)
      await deleteOpenedContact(page, fullName)
    })
  })
})
