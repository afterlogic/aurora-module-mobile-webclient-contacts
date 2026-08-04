<template>
  <q-toolbar data-test-id="contacts-select-header" class="app-header">
    <div class="col app-header__left">
      <AppHeaderButton
        data-test-id="contacts-select-close"
        icon="close"
        @click="resetSelectedItems"
      />
    </div>

    <div class="col app-header__title" data-test-id="contacts-select-count">
      {{ `Selected: ${items.length}` }}
    </div>

    <div class="col app-header__right">
      <AppHeaderButton
        v-if="isShowAction(actions.emailTo)"
        data-test-id="contacts-select-email"
        :title="$t('CONTACTSWEBCLIENT.ACTION_NEW_MESSAGE')"
        @click="emailToItems"
      >
        <ActionIcon color="black" :icon="actions.emailTo.icon" />
      </AppHeaderButton>
      <AppHeaderButton
        v-if="isShowAction(actions.removeFromGroup)"
        data-test-id="contacts-select-remove-from-group"
        @click="removeFromGroup(actions.removeFromGroup)"
      >
        <ActionIcon color="black" :icon="actions.removeFromGroup.icon" />
      </AppHeaderButton>
      <AppHeaderButton
        v-if="isShowAction(actions.delete)"
        data-test-id="contacts-select-delete"
        @click="deleteItems"
      >
        <ActionIcon color="black" :icon="actions.delete.icon" />
      </AppHeaderButton>
    </div>
  </q-toolbar>
</template>

<script>
import ActionIcon from '../common/ActionIcon'
import AppHeaderButton from 'src/components/common/AppHeaderButton'

import { mapActions, mapGetters, mapState } from 'pinia'
import { useContactsStore } from '../../store/index-pinia.js'

import { contactActions } from '../../utils/contact-actions'
import { composeToSelectedContacts } from '../../utils/email-compose'

export default {
  name: 'SelectHeader',

  components: {
    ActionIcon,
    AppHeaderButton,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapState(useContactsStore, ['currentStorage', 'currentGroup']),
    ...mapGetters(useContactsStore, ['selectedContacts']),
    actions() {
      return contactActions
    },
  },

  methods: {
    ...mapActions(useContactsStore, [
      'resetSelectedItems',
      'changeDialogComponent',
      'asyncGetContacts',
    ]),
    emailToItems() {
      if (composeToSelectedContacts(this.selectedContacts, this.$router)) {
        this.resetSelectedItems()
      }
    },
    deleteItems() {
      if (contactActions.delete.component) {
        this.changeDialogComponent({ component: contactActions.delete.component })
      }
    },
    async removeFromGroup(action) {
      const result = await action.method(this.currentGroup, this.selectedContacts)
      if (result) {
        this.resetSelectedItems()
        await this.asyncGetContacts()
      }
    },
    isShowAction(action) {
      return action.isShowAction(
          action.name,
          this.items,
          this.currentStorage,
          this.currentGroup
      )
    },
    onPerformAction(action) {
      if (action.component) {
        this.changeDialogComponent({ component: action.component })
      }
    },
  },
}
</script>
