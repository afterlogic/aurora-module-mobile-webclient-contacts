import { defineConfig } from 'vitest/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const mailSearchStub = path.resolve(root, 'test/unit/stubs/mail-search.js')
const mailComposeStub = path.resolve(root, 'test/unit/stubs/mail-compose.js')

export default defineConfig({
  plugins: [
    {
      name: 'stub-mail-deps-for-unit',
      enforce: 'pre',
      resolveId (id, importer) {
        if (id.includes('MailMobileWebclient/vue-mobile/utils/search')) {
          return mailSearchStub
        }
        if (id.includes('MailMobileWebclient/vue-mobile/utils/compose')) {
          return mailComposeStub
        }
        if (
          importer &&
          importer.includes(`${path.sep}find-in-mail.js`) &&
          id.includes('utils/search')
        ) {
          return mailSearchStub
        }
        if (
          importer &&
          importer.includes(`${path.sep}email-compose.js`) &&
          id.includes('utils/compose')
        ) {
          return mailComposeStub
        }
      },
    },
  ],
  resolve: {
    alias: {
      utils: path.resolve(root, 'utils'),
      'src/utils/address': path.resolve(root, 'test/unit/stubs/address.js'),
      'src/utils/types': path.resolve(root, 'test/unit/stubs/types.js'),
      'src/boot/i18n': path.resolve(root, 'test/unit/stubs/i18n.js'),
      'boot/i18n': path.resolve(root, 'test/unit/stubs/i18n.js'),
    },
  },
  test: {
    environment: 'node',
    globals: true,
    include: ['test/unit/**/*.{spec,test}.{js,mjs}'],
  },
})
