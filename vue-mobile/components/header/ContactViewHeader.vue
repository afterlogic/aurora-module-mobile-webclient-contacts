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
      <AppHeaderMoreDropdown data-test-id="contacts-view-more">
        <template #label>
          <ActionIcon color="black" icon="MoreIcon" />
        </template>
        <q-list>
          <AppMoreActionContainer
            v-if="isShowAction(actions.findInEmail)"
            data-test-id="contacts-menu-find-in-mail"
            :action-label="actions.findInEmail.displayName"
            @click="onPerformAction(actions.findInEmail)"
          >
            <ActionIcon :icon="actions.findInEmail.icon" />
          </AppMoreActionContainer>

          <AppMoreActionContainer
            v-if="isShowAction(actions.share)"
            data-test-id="contacts-menu-share"
            :action-label="actions.share.displayName"
            @click="onPerformAction(actions.share)"
          >
            <ActionIcon :icon="actions.share.icon" />
          </AppMoreActionContainer>

          <AppMoreActionContainer
            v-if="isShowAction(actions.unshare)"
            data-test-id="contacts-menu-unshare"
            :action-label="actions.unshare.displayName"
            @click="onPerformAction(actions.unshare)"
          >
            <ActionIcon :icon="actions.unshare.icon" />
          </AppMoreActionContainer>

          <AppMoreActionContainer
            v-if="isShowAction(actions.send)"
            data-test-id="contacts-menu-send"
            :action-label="actions.send.displayName"
            @click="onPerformAction(actions.send)"
          >
            <ActionIcon :icon="actions.send.icon" />
          </AppMoreActionContainer>

          <AppMoreActionContainer
            v-if="isShowAction(actions.edit)"
            data-test-id="contacts-menu-edit"
            :action-label="actions.edit.displayName"
            @click="editContact"
          >
            <ActionIcon :icon="actions.edit.icon" />
          </AppMoreActionContainer>

          <AppMoreActionContainer
            v-if="isShowAction(actions.delete)"
            data-test-id="contacts-menu-delete"
            :action-label="actions.delete.displayName"
            @click="onPerformAction(actions.delete)"
          >
            <ActionIcon :icon="actions.delete.icon" />
          </AppMoreActionContainer>
        </q-list>
      </AppHeaderMoreDropdown>
    </div>
  </q-toolbar>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'pinia'
import { useContactsStore } from '../../store/index-pinia.js'

import ActionIcon from '../common/ActionIcon'
import AppHeaderButton from 'src/components/common/AppHeaderButton'
import AppHeaderMoreDropdown from 'src/components/common/AppHeaderMoreDropdown'
import AppMoreActionContainer from 'src/components/common/AppMoreActionContainer'
import { contactActions } from '../../utils/contact-actions'

export default {
  name: 'ContactHeader',

  components: {
    ActionIcon,
    AppHeaderButton,
    AppHeaderMoreDropdown,
    AppMoreActionContainer,
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
