import { describe, expect, it } from 'vitest'
import {
  getFullEmailFromContactListItem,
  getFullEmailFromContactView,
  getPrimaryEmailFromContactView,
} from 'utils/email-compose.js'
import { parseContactListItem, parseGroup, getParsedGroups } from 'utils/common.js'

describe('email-compose helpers', () => {
  it('getFullEmailFromContactListItem', () => {
    expect(getFullEmailFromContactListItem(null)).toBe('')
    expect(getFullEmailFromContactListItem({ email: '' })).toBe('')
    expect(
      getFullEmailFromContactListItem({ fullName: 'Ann', email: 'a@ex.com' })
    ).toBe('Ann <a@ex.com>')
  })

  it('getFullEmailFromContactView', () => {
    expect(getFullEmailFromContactView({ FullName: 'Bob' }, '')).toBe('')
    expect(getFullEmailFromContactView({ FullName: 'Bob' }, 'b@ex.com')).toBe(
      'Bob <b@ex.com>'
    )
  })

  it('getPrimaryEmailFromContactView', () => {
    expect(getPrimaryEmailFromContactView(null)).toBe('')
    expect(
      getPrimaryEmailFromContactView({
        PrimaryEmail: 0,
        PersonalEmail: 'p@ex.com',
        BusinessEmail: 'b@ex.com',
      })
    ).toBe('p@ex.com')
    expect(
      getPrimaryEmailFromContactView({
        PrimaryEmail: 1,
        PersonalEmail: 'p@ex.com',
        BusinessEmail: 'b@ex.com',
      })
    ).toBe('b@ex.com')
    expect(
      getPrimaryEmailFromContactView({
        PrimaryEmail: 0,
        PersonalEmail: '',
        ViewEmail: 'v@ex.com',
      })
    ).toBe('v@ex.com')
  })
})

describe('contacts common parsers', () => {
  it('parseContactListItem maps PGP and team flags', () => {
    const item = parseContactListItem({
      UUID: 'u1',
      FullName: 'Team User',
      IdUser: 3,
      Storage: 'team',
      ViewEmail: 't@ex.com',
      HasPgpPublicKey: true,
    })
    expect(item.UUID).toBe('u1')
    expect(item.hasPgpPublicKey).toBe(true)
    expect(item.isTeam).toBe(true)
    expect(item.email).toBe('t@ex.com')
  })

  it('parseGroup / getParsedGroups map fields', () => {
    const group = parseGroup({
      UUID: 'g1',
      Name: 'Friends',
      IsOrganization: true,
      Email: 'g@ex.com',
    })
    expect(group).toMatchObject({
      UUID: 'g1',
      name: 'Friends',
      isOrganization: true,
      email: 'g@ex.com',
    })
    expect(getParsedGroups([{ UUID: 'g2', Name: 'X' }])).toHaveLength(1)
  })
})
