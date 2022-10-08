<template>
  <q-toolbar class="app-header">
    <div class="col">
      <q-btn @click="resetSelection" color="black" icon="close" flat round dense />
    </div>
    <div class="col text-center text-black">
      <span>{{ `Selected: ${items.length}` }}</span>
    </div>
    <div class="col flex no-wrap justify-end">
      <div v-if="isShowAction(actions.emailTo)">
        <action-icon
            class="q-mr-md"
            color="black"
            :icon="actions.emailTo.icon"
            @click="emailToItems"
        />
      </div>
      <div v-if="isShowAction(actions.removeFromGroup)">
        <action-icon
            class="q-mr-md"
            color="black"
            :icon="actions.removeFromGroup.icon"
            @click="removeFromGroup(actions.removeFromGroup)"
        />
      </div>   
      <div v-if="isShowAction(actions.delete)">
        <action-icon
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

import {mapActions, mapGetters} from 'vuex'
import store from "src/store";
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
    ...mapGetters('contactsmobile', [
      'currentStorage',
      'currentGroup',
      'selectedContacts'
    ]),
    actions() {
      return contactActions
    },
  },

  methods: {
    ...mapActions('contactsmobile', [
      'resetSelectedItems',
      'changeDialogComponent',
    ]),
    resetSelection() {
      this.resetSelectedItems({ items: this.items })
    },
    emailToItems() {
      notification.showReport('Comming soon')
    },
    deleteItems() {
      const deleteAction = contactActions.delete
      if (deleteAction.component) {
        this.changeDialogComponent({ component: deleteAction.component })
      }
    },
    async removeFromGroup(action) {
      const result = await action.method(this.currentGroup, this.selectedContacts)
      if (result) {
        await store.dispatch('contactsmobile/asyncGetContacts')
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
