const path = require('path')
const { sharedHelper, fixturePath } = require(path.join(
  process.env.AURORA_MOBILE_E2E_ROOT,
  'e2e/helpers/paths'
))
const { expect } = require('@playwright/test')
const { step, attachScreenshot } = sharedHelper('login')
const { waitForListReady, clickReady } = sharedHelper('ready')

const listReadyOptions = {
  itemTestIds: 'contacts-item',
  emptyTestId: 'contacts-empty',
  spinnerSelectors: [
    '.contacts__loader_initial',
    '.contacts__loader_initial .q-spinner-dots',
  ],
  timeout: 60000,
}

async function openContacts(page) {
  await clickReady(page.getByTestId('nav-contacts'))
  await expect(page.getByTestId('contacts-list')).toBeVisible({
    timeout: 60000,
  })
  await waitForListReady(page, listReadyOptions)
}

async function fillContactsField(page, testId, value) {
  const root = page.getByTestId(testId)
  const input = root.locator('input').first()
  await expect(input).toBeVisible({ timeout: 15000 })
  await input.fill(value)
}

async function createContactViaFab(page, { fullName, email }) {
  await clickReady(page.getByTestId('contacts-create-fab'))
  await expect(page.getByTestId('contacts-create-contact')).toBeVisible({
    timeout: 15000,
  })
  await clickReady(page.getByTestId('contacts-create-contact'))
  await expect(page.getByTestId('contacts-edit')).toBeVisible({
    timeout: 30000,
  })
  await fillContactsField(page, 'contacts-edit-name', fullName)
  await fillContactsField(page, 'contacts-edit-email', email)
  await clickReady(page.getByTestId('contacts-edit-save'))
  await expect(page.getByTestId('contacts-view')).toBeVisible({
    timeout: 45000,
  })
  await expect(page.getByTestId('contacts-view-name')).toContainText(fullName, {
    timeout: 15000,
  })
}

async function openContactByName(page, fullName) {
  const item = page
    .getByTestId('contacts-item')
    .filter({ hasText: fullName })
    .first()
  await expect(item).toBeVisible({ timeout: 30000 })
  await clickReady(item)
  await expect(page.getByTestId('contacts-view')).toBeVisible({
    timeout: 30000,
  })
}

async function deleteOpenedContact(page, fullName) {
  await clickReady(page.getByTestId('contacts-view-more'))
  await expect(page.getByTestId('contacts-menu-delete')).toBeVisible({
    timeout: 10000,
  })
  await clickReady(page.getByTestId('contacts-menu-delete'))
  await expect(page.getByTestId('contacts-delete-dialog')).toBeVisible({
    timeout: 15000,
  })
  await clickReady(page.getByTestId('contacts-delete-confirm'))
  await expect(page.getByTestId('contacts-delete-dialog')).toBeHidden({
    timeout: 45000,
  })
  await expect(page.getByTestId('contacts-list')).toBeVisible({
    timeout: 30000,
  })
  await waitForListReady(page, listReadyOptions)
  await expect(
    page.getByTestId('contacts-item').filter({ hasText: fullName })
  ).toHaveCount(0, { timeout: 30000 })
}

async function longPressContactItem(page, item) {
  await item.scrollIntoViewIfNeeded()
  const box = await item.boundingBox()
  if (!box) {
    throw new Error('contacts item has no bounding box for long-press')
  }
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  await page.waitForTimeout(750)
  await page.mouse.up()
}

async function createGroupViaFab(page, groupName) {
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
}

async function openGroupFromDrawer(page, groupName) {
  await clickReady(page.getByTestId('contacts-folder-menu'))
  await expect(page.getByTestId('mail-drawer')).toBeVisible({ timeout: 15000 })
  const group = page
    .getByTestId('contacts-group-item')
    .filter({ hasText: groupName })
    .first()
  await expect(group).toBeVisible({ timeout: 15000 })
  await clickReady(group)
  await expect(page.getByTestId('contacts-list')).toBeVisible({
    timeout: 30000,
  })
  await waitForListReady(page, listReadyOptions)
}

module.exports = {
  listReadyOptions,
  openContacts,
  fillContactsField,
  createContactViaFab,
  openContactByName,
  deleteOpenedContact,
  longPressContactItem,
  createGroupViaFab,
  openGroupFromDrawer,
  waitForListReady,
  clickReady,
  step,
  attachScreenshot,
}
