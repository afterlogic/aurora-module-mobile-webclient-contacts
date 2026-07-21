import { describe, expect, it } from 'vitest'
import { getContactEmailsString } from 'utils/find-in-mail.js'

describe('getContactEmailsString', () => {
  it('returns empty string for missing contact', () => {
    expect(getContactEmailsString(null)).toBe('')
    expect(getContactEmailsString(undefined)).toBe('')
  })

  it('joins unique emails from contact fields', () => {
    expect(
      getContactEmailsString({
        ViewEmail: 'a@ex.com',
        PersonalEmail: 'b@ex.com',
        BusinessEmail: 'a@ex.com',
        OtherEmail: '',
      })
    ).toBe('a@ex.com,b@ex.com')
  })
})
