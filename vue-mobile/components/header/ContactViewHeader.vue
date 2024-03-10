<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <q-btn icon="chevron_left" @click="onPreviousPage" color="black" flat round dense />
    </div>

    <div class="col app-header__title">
      <span class="app-header__title-main">
        {{ $t('CONTACTSWEBCLIENT.HEADING_BROWSER_TAB') }}
      </span>
      <span class="app-header__title-secondary">
        {{ storageName }}
      </span>
    </div>

    <div class="col app-header__right">
      <div class="dropdown-more flex justify-center items-center">
        <q-btn-dropdown :menu-offset="[12, -41]" flat unelevated dense>
          <template v-slot:label>
            <ActionIcon class="q-mr-sm" icon="MoreIcon" />
          </template>
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="onPerformAction(actions.findInEmail)"
            >
              <ActionIcon class="q-mr-md" :icon="actions.findInEmail.icon" />
              <q-item-section>
                {{ actions.findInEmail.displayName }}
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              v-if="isShowAction(actions.share)"
              @click="onPerformAction(actions.share)"
            >
              <ActionIcon class="q-mr-md" :icon="actions.share.icon" />
              <q-item-section>
                {{actions.share.displayName }}
              </q-item-section>
            </q-item>
            <q-item
                clickable
                v-if="isShowAction(actions.unshare)"
                v-close-popup
                @click="onPerformAction(actions.unshare)"
            >
              <ActionIcon class="q-mr-md" :icon="actions.unshare.icon" />
              <q-item-section>
                {{actions.unshare.displayName }}
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="onPerformAction(actions.send)"
            >
              <ActionIcon class="q-mr-md" :icon="actions.send.icon" />
              <q-item-section>
                {{ actions.send.displayName }}
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              v-if="isShowAction(actions.edit)"
              @click="editContact"
            >
              <ActionIcon class="q-mr-md" :icon="actions.edit.icon" />
              <q-item-section>
                {{ actions.edit.displayName }}
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              v-if="isShowAction(actions.delete)"
              @click="onPerformAction(actions.delete)"
            >
              <ActionIcon class="q-mr-md" :icon="actions.delete.icon" />
                <q-item-section>
                  {{ actions.delete.displayName }}
                </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
  </q-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'pinia'
import { useContactsStore } from '../../store/index-pinia.js'

import ActionIcon from '../common/ActionIcon'
import { contactActions } from '../../utils/contact-actions'

export default {
  name: 'ContactHeader',

  components: {
    ActionIcon
  },

  data() {
    return {
      actions: contactActions,
    }
  },

  computed: {
    ...mapGetters(useContactsStore, ['contactsList', 'currentStorage', 'currentContact']),
    storageName() {
      return this.currentStorage?.name || ''
    },
  },

  methods: {
    ...mapActions(useContactsStore, ['changeDialogComponent']),
    onPreviousPage() {
      this.$router.back()
    },
    async onPerformAction(action) {
      if (action.method) {
        const result = await action.method(this.currentContact)
        if (result) {
          if (action.name === 'share' || action.name === 'unshare') {
            this.$router.push({ name: 'contacts' })
          }
        }
      }
      if (action.component) {
        this.changeDialogComponent({ component: action.component })
      }
    },
    editContact() {
      this.$router.push({ name: 'contact-edit', params: { storageId: this.currentContact.Storage, contactId: this.currentContact.UUID } })
    },
    isShowAction(action) {
      return action.isShowAction(action.name, this.currentContact)
    }
  },
}
</script>
