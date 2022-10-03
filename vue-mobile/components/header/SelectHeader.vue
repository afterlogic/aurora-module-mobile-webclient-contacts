<template>
  <q-toolbar style="padding: 0">
    <q-card-actions align="left" class="col-4">
      <q-btn
        @click="reset"
        color="black"
        icon="close"
        flat
        round
        dense
      />
    </q-card-actions>
    <div class="text-center text-black text-bold col-4">
      <span>{{ `Selected: ${items.length}` }}</span>
    </div>
    <div class="col-4 flex no-wrap justify-end q-pr-sm">
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
            @click="removeFromGroup"
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
      <!-- <div v-if="isShowAction(actions.shareLeave) && sharedFiles.length" class="flex no-wrap">
        <icon-action
            class="q-mr-xs"
            @click="onPerformAction(actions.shareLeave)"
            :icon="actions.shareLeave.icon"
        />
        <span class="q-mr-md">{{sharedFiles.length}}</span>
      </div>
      <div v-if="isShowAction(actions.delete) && unsharedFiles.length" class="flex no-wrap">
        <icon-action
            class="q-mr-xs"
            @click="deleteItems"
            :icon="actions.delete.icon"
        />
        <span class="q-mr-md">{{unsharedFiles.length}}</span>
      </div> -->
    </div>
  </q-toolbar>
</template>

<script>
// import IconAction from '../common/IconAction'
import ActionIcon from '../common/ActionIcon'

import {mapActions, mapGetters} from 'vuex'

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
    ...mapGetters('contactsmobile', ['currentStorage', 'currentGroup']),
    actions() {
      return contactActions
    },
  },
  methods: {
    ...mapActions('contactsmobile', [
      'resetSelectedItems',
      'changeDialogComponent',
    //   'addCopyItems',
    ]),
    reset() {
      this.resetSelectedItems({ items: this.items })
    },
    emailToItems() {
      console.log('EmailTo');
      // const deleteAction = contactActions.delete
      // if (deleteAction.component) {
      //   this.changeDialogComponent({ component: deleteAction.component })
      // }
    },
    deleteItems() {
      const deleteAction = contactActions.delete
      if (deleteAction.component) {
        this.changeDialogComponent({ component: deleteAction.component })
      }
    },
    removeFromGroup() {

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
    }
  },
}
</script>

<style scoped></style>
