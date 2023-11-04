<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <q-btn @click="resetSelection" color="black" icon="close" flat round dense />
    </div>

    <div class="col app-header__title">
      {{ `Selected: ${items.length}` }}
    </div>

    <div class="col app-header__right">
      <div v-if="isShowAction(actions.emailTo)">
        <ActionIcon
          class="q-mr-md"
          color="black"
          :icon="actions.emailTo.icon"
          @click="emailToItems"
        />
      </div>
      <div v-if="isShowAction(actions.removeFromGroup)">
        <ActionIcon
          class="q-mr-md"
          color="black"
          :icon="actions.removeFromGroup.icon"
          @click="removeFromGroup(actions.removeFromGroup)"
        />
      </div>   
      <div v-if="isShowAction(actions.delete)">
        <ActionIcon
          class="q-mr-md"
          color="black"
          :icon="actions.delete.icon"
          @click="deleteItems"
        />
      </div>
    </div>
  </q-toolbar>
</template>

<script>
import ActionIcon from '../common/ActionIcon'
import notification from 'src/utils/notification'

import {mapActions, mapGetters} from 'pinia'
import { useContactsStore } from '../../store/index-pinia.js'

import { contactActions } from '../../utils/contact-actions'

export default {
  name: 'SelectHeader',

  components: {
    ActionIcon
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters(useContactsStore, [
      'currentStorage',
      'currentGroup',
      'selectedContacts'
    ]),
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
    resetSelection() {
      this.resetSelectedItems()
    },
    emailToItems() {
      notification.showReport('Comming soon')
    },
    deleteItems() {
      if (contactActions.delete.component) {
        this.changeDialogComponent({ component: contactActions.delete.component })
      }
    },
    async removeFromGroup(action) {
      const result = await action.method(this.currentGroup, this.selectedContacts)
      if (result) {
        consoel.log('removeFromGroup')
        // this.asyncGetContacts()
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
