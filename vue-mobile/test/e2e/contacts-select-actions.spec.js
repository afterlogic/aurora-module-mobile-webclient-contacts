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
  longPressContactItem,
  createGroupViaFab,
  openGroupFromDrawer,
  fillContactsField,
  searchContacts,
} = require('./helpers/contacts')

const hasCredentials = !!(process.env.E2E_LOGIN && process.env.E2E_PASSWORD)

test.describe('Mobile contacts select and groups', () => {
  test.skip(!hasCredentials, 'Set E2E_LOGIN and E2E_PASSWORD in .env.e2e')

  test('multi-select bulk deletes contacts', async ({ page }) => {
    test.setTimeout(240000)
    await loginAsTestUser(page)
    await openContacts(page)

    const stamp = Date.now()
    const nameA = `E2E Sel A ${stamp}`
    const nameB = `E2E Sel B ${stamp}`
    const emailA = `e2e.sel.a.${stamp}@example.com`
    const emailB = `e2e.sel.b.${stamp}@example.com`

    await step('Create two contacts', async () => {
      await createContactViaFab(page, { fullName: nameA, email: emailA })
      await clickReady(page.getByTestId('contacts-view-back'))
      await waitForListReady(page, listReadyOptions)
      await createContactViaFab(page, { fullName: nameB, email: emailB })
      await clickReady(page.getByTestId('contacts-view-back'))
      await waitForListReady(page, listReadyOptions)
      // Both share stamp; search so they appear together past page 1 / virtual-scroll.
      await searchContacts(page, stamp.toString())
    })

    await step('Long-press first → select second', async () => {
      const itemA = page
        .getByTestId('contacts-item')
        .filter({ hasText: nameA })
        .first()
      await longPressContactItem(page, itemA)
      await expect(page.getByTestId('contacts-select-header')).toBeVisible({
        timeout: 15000,
      })
      await expect(page.getByTestId('contacts-select-count')).toContainText(
        'Selected: 1',
        { timeout: 10000 }
      )
      // Mobile hasTouch: mouse clickReady does not toggle selection; use tap.
      const itemB = page
        .getByTestId('contacts-item')
        .filter({ hasText: nameB })
        .first()
      await expect(itemB).toBeVisible({ timeout: 15000 })
      await itemB.tap()
      await expect(page.getByTestId('contacts-select-count')).toContainText(
        'Selected: 2',
        { timeout: 10000 }
      )
      await attachScreenshot(page, 'contacts-select-01')
    })

    await step('Bulk delete → confirm', async () => {
      await expect(page.getByTestId('contacts-select-delete')).toBeVisible({
        timeout: 10000,
      })
      await clickReady(page.getByTestId('contacts-select-delete'))
      await expect(page.getByTestId('contacts-delete-dialog')).toBeVisible({
        timeout: 15000,
      })
      await clickReady(page.getByTestId('contacts-delete-confirm'))
      await expect(page.getByTestId('contacts-delete-dialog')).toBeHidden({
        timeout: 60000,
      })
      await expect(page.getByTestId('contacts-select-header')).toBeHidden({
        timeout: 30000,
      })
      await waitForListReady(page, listReadyOptions)
      await expect(
        page.getByTestId('contacts-item').filter({ hasText: nameA })
      ).toHaveCount(0, { timeout: 30000 })
      await expect(
        page.getByTestId('contacts-item').filter({ hasText: nameB })
      ).toHaveCount(0, { timeout: 30000 })
      console.log('  → Both contacts deleted')
      await attachScreenshot(page, 'contacts-select-02-deleted')
    })
  })

  test('multi-select opens compose to selected contacts', async ({ page }) => {
    test.setTimeout(240000)
    await loginAsTestUser(page)
    await openContacts(page)

    const stamp = Date.now()
    const nameA = `E2E Mail A ${stamp}`
    const nameB = `E2E Mail B ${stamp}`
    const emailA = `e2e.mail.a.${stamp}@example.com`
    const emailB = `e2e.mail.b.${stamp}@example.com`

    await step('Create two contacts with email', async () => {
      await createContactViaFab(page, { fullName: nameA, email: emailA })
      await clickReady(page.getByTestId('contacts-view-back'))
      await waitForListReady(page, listReadyOptions)
      await createContactViaFab(page, { fullName: nameB, email: emailB })
      await clickReady(page.getByTestId('contacts-view-back'))
      await waitForListReady(page, listReadyOptions)
      await searchContacts(page, stamp.toString())
    })

    await step('Select both → Email', async () => {
      await longPressContactItem(
        page,
        page.getByTestId('contacts-item').filter({ hasText: nameA }).first()
      )
      await expect(page.getByTestId('contacts-select-header')).toBeVisible({
        timeout: 15000,
      })
      const itemB = page
        .getByTestId('contacts-item')
        .filter({ hasText: nameB })
        .first()
      await expect(itemB).toBeVisible({ timeout: 15000 })
      await itemB.tap()
      await expect(page.getByTestId('contacts-select-count')).toContainText(
        'Selected: 2',
        { timeout: 10000 }
      )
      await expect(page.getByTestId('contacts-select-email')).toBeVisible({
        timeout: 10000,
      })
      await clickReady(page.getByTestId('contacts-select-email'))
      await expect(page.getByTestId('mail-compose')).toBeVisible({
        timeout: 30000,
      })
      const chips = page
        .getByTestId('mail-compose-to')
        .locator('.recipients-input__chip')
      await expect(chips.first()).toBeVisible({ timeout: 15000 })
      const chipCount = await chips.count()
      console.log(`  → Compose To chips: ${chipCount}`)
      expect(chipCount).toBeGreaterThanOrEqual(2)
      const toText = (
        await page.getByTestId('mail-compose-to').innerText()
      ).toLowerCase()
      expect(toText).toContain(emailA.toLowerCase())
      expect(toText).toContain(emailB.toLowerCase())
      await attachScreenshot(page, 'contacts-select-compose-01')
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

    await step('Cleanup', async () => {
      await openContacts(page)
      for (const name of [nameA, nameB]) {
        const item = page.getByTestId('contacts-item').filter({ hasText: name })
        if ((await item.count()) > 0) {
          await openContactByName(page, name)
          await deleteOpenedContact(page, name)
        }
      }
    })
  })

  test('assigns contact to group and removes from group', async ({ page }) => {
    test.setTimeout(300000)
    await loginAsTestUser(page)
    await openContacts(page)

    const stamp = Date.now()
    const groupName = `E2E Grp ${stamp}`
    const fullName = `E2E InGrp ${stamp}`
    const email = `e2e.ingrp.${stamp}@example.com`

    await step('Create group', async () => {
      await createGroupViaFab(page, groupName)
      await clickReady(page.getByTestId('contacts-group-view-back'))
      await waitForListReady(page, listReadyOptions)
    })

    await step('Create contact and assign to group', async () => {
      await createContactViaFab(page, { fullName, email })
      await clickReady(page.getByTestId('contacts-view-more'))
      await clickReady(page.getByTestId('contacts-menu-edit'))
      await expect(page.getByTestId('contacts-edit')).toBeVisible({
        timeout: 30000,
      })
      const groupCb = page
        .locator(
          `[data-test-id="contacts-edit-group"][data-group-name="${groupName}"]`
        )
        .first()
      await expect(groupCb).toBeVisible({ timeout: 15000 })
      await clickReady(groupCb)
      await clickReady(page.getByTestId('contacts-edit-save'))
      await expect(page.getByTestId('contacts-view')).toBeVisible({
        timeout: 45000,
      })
      console.log(`  → Assigned ${fullName} → ${groupName}`)
      await attachScreenshot(page, 'contacts-group-assign-01')
      await clickReady(page.getByTestId('contacts-view-back'))
      await waitForListReady(page, listReadyOptions)
    })

    await step('Open group → contact is listed', async () => {
      await openGroupFromDrawer(page, groupName)
      await expect(
        page.getByTestId('contacts-item').filter({ hasText: fullName }).first()
      ).toBeVisible({ timeout: 30000 })
      await attachScreenshot(page, 'contacts-group-assign-02-list')
    })

    await step('Select contact → Remove from group', async () => {
      await longPressContactItem(
        page,
        page.getByTestId('contacts-item').filter({ hasText: fullName }).first()
      )
      await expect(page.getByTestId('contacts-select-header')).toBeVisible({
        timeout: 15000,
      })
      await expect(
        page.getByTestId('contacts-select-remove-from-group')
      ).toBeVisible({ timeout: 10000 })
      await clickReady(page.getByTestId('contacts-select-remove-from-group'))
      await expect(page.getByTestId('contacts-select-header')).toBeHidden({
        timeout: 45000,
      })
      await waitForListReady(page, listReadyOptions)
      await expect(
        page.getByTestId('contacts-item').filter({ hasText: fullName })
      ).toHaveCount(0, { timeout: 30000 })
      console.log('  → Removed from group')
      await attachScreenshot(page, 'contacts-group-assign-03-removed')
    })

    await step('Cleanup: delete group and contact', async () => {
      // Still on group list — open group view via info if available, else drawer recreate
      // Delete group from drawer flow: open group view from... we may only have list.
      // Navigate: open drawer group again? Already in group. Use FAB? Go to group view via clicking group info.
      // Open group view: from group list there's no direct header to group view delete.
      // Use drawer → we are in group. Click... GroupView is separate route.
      // From existing CRUD test: after create we're on group-view. Here open group from drawer lands on group-list.
      // Delete group: open from drawer? Or recreate path via contacts-group-view-edit from...
      // Simplest: open contact from personal, delete; then open group view.
      // How to get to group-view? GroupItem click goes to group-list. There's contacts-group-info?
      const info = page.getByTestId('contacts-group-info')
      if (await info.isVisible().catch(() => false)) {
        await clickReady(info)
        await expect(page.getByTestId('contacts-group-view')).toBeVisible({
          timeout: 15000,
        })
        await clickReady(page.getByTestId('contacts-group-view-delete'))
        await clickReady(page.getByTestId('contacts-delete-group-confirm'))
        await expect(page.getByTestId('contacts-list')).toBeVisible({
          timeout: 30000,
        })
      } else {
        console.log('  → No group-info button; leave group for manual cleanup')
      }
      await openContacts(page)
      const item = page
        .getByTestId('contacts-item')
        .filter({ hasText: fullName })
      if ((await item.count()) > 0) {
        await openContactByName(page, fullName)
        await deleteOpenedContact(page, fullName)
      }
    })
  })

  test('renames a group', async ({ page }) => {
    test.setTimeout(180000)
    await loginAsTestUser(page)
    await openContacts(page)

    const stamp = Date.now()
    const groupName = `E2E Ren ${stamp}`
    const renamed = `E2E Renamed ${stamp}`

    await step('Create group', async () => {
      await createGroupViaFab(page, groupName)
    })

    await step('Edit group name', async () => {
      await clickReady(page.getByTestId('contacts-group-view-edit'))
      await expect(page.getByTestId('contacts-group-edit')).toBeVisible({
        timeout: 30000,
      })
      await fillContactsField(page, 'contacts-group-edit-name', renamed)
      await clickReady(page.getByTestId('contacts-group-edit-save'))
      await expect(page.getByTestId('contacts-group-view')).toBeVisible({
        timeout: 45000,
      })
      await expect(page.getByTestId('contacts-group-view')).toContainText(
        renamed,
        { timeout: 15000 }
      )
      console.log(`  → Renamed group: ${groupName} → ${renamed}`)
      await attachScreenshot(page, 'contacts-group-rename-01')
    })

    await step('Cleanup: delete renamed group', async () => {
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
    })
  })
})
