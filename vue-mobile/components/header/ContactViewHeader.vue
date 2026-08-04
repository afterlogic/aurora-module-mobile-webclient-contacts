<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <AppHeaderButton
        data-test-id="contacts-view-back"
        icon="chevron_left"
        @click="onPreviousPage"
      />
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
      <div class="dropdown-more">
        <q-btn-dropdown
          data-test-id="contacts-view-more"
          :menu-offset="[12, -41]"
          flat
          unelevated
          dense
        >
          <template v-slot:label>
            <ActionIcon color="black" icon="MoreIcon" />
          </template>
          <q-list>
            <q-item
              data-test-id="contacts-menu-find-in-mail"
              clickable
              v-close-popup
              v-if="isShowAction(actions.findInEmail)"
              @click="onPerformAction(actions.findInEmail)"
            >
              <ActionIcon class="q-mr-md" :icon="actions.findInEmail.icon" />
              <q-item-section>
                {{ actions.findInEmail.displayName }}
              </q-item-section>
            </q-item>

            <q-item
              data-test-id="contacts-menu-share"
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
                data-test-id="contacts-menu-unshare"
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
              data-test-id="contacts-menu-send"
              clickable
              v-close-popup
              v-if="isShowAction(actions.send)"
              @click="onPerformAction(actions.send)"
            >
              <ActionIcon class="q-mr-md" :icon="actions.send.icon" />
              <q-item-section>
                {{ actions.send.displayName }}
              </q-item-section>
            </q-item>

            <q-item
              data-test-id="contacts-menu-edit"
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
              data-test-id="contacts-menu-delete"
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
import { mapState, mapGetters, mapActions } from 'pinia'
import { useContactsStore } from '../../store/index-pinia.js'

import ActionIcon from '../common/ActionIcon'
import AppHeaderButton from 'src/components/common/AppHeaderButton'
import { contactActions } from '../../utils/contact-actions'

export default {
  name: 'ContactHeader',

  components: {
    ActionIcon,
    AppHeaderButton,
  },

  data() {
    return {
      actions: contactActions,
    }
  },

  computed: {
    ...mapState(useContactsStore, ['contactsList', 'currentStorage', 'currentContact']),
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
        const result = await action.method(this.currentContact, this.$router)
        if (result) {
          if (action.name === 'share' || action.name === 'unshare') {
            this.$router.push({ name: 'contacts' })
          }
          // Method handled the action (e.g. compose / navigate) — do not also open a dialog.
          if (!action.component) {
            return
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
