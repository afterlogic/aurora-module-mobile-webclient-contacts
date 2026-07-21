import { defineConfig } from 'vitest/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const mailSearchStub = path.resolve(root, 'test/unit/stubs/mail-search.js')

export default defineConfig({
  plugins: [
    {
      name: 'stub-mail-search-for-unit',
      enforce: 'pre',
      resolveId (id, importer) {
        const fromFindInMail =
          importer &&
          importer.includes(`${path.sep}find-in-mail.js`) &&
          id.includes('utils/search')
        if (fromFindInMail || id.includes('MailMobileWebclient/vue-mobile/utils/search')) {
          return mailSearchStub
        }
      },
    },
  ],
  resolve: {
    alias: {
      utils: path.resolve(root, 'utils'),
    },
  },
  test: {
    environment: 'node',
    globals: true,
    include: ['test/unit/**/*.{spec,test}.{js,mjs}'],
  },
})
