<template>
  <q-toolbar style="padding: 0">
    <q-card-actions align="left" class="col-2">
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
      <!-- <icon-action
          @click="copyItems"
          class="q-mr-md"
          :icon="actions.copy.icon"
      /> -->
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

import {mapActions, mapGetters} from 'vuex'

// import { fileActions } from '../../utils/file-actions'

export default {
  name: 'SelectHeader',
  components: {
    // IconAction
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },

  },
  computed: {
    // ...mapGetters('filesmobile', ['currentStorage', 'currentPath']),
    // unsharedFiles() {
    //   return this.items.filter( item => item.sharedWithMeAccess === 0 )
    // },
    // sharedFiles() {
    //   return this.items.filter( item => item.sharedWithMeAccess !== 0 )
    // },
    // actions() {
    //   return fileActions
    // },
  },
  methods: {
    ...mapActions('contactsmobile', [
      'resetSelectedItems',
    //   'changeDialogComponent',
    //   'addCopyItems',
    ]),
    reset() {
      console.log('resetSelectedItems')
      this.resetSelectedItems({ items: this.items })
    },
    // deleteItems() {
    //   const deleteAction = fileActions.delete
    //   if (deleteAction.component) {
    //     this.changeDialogComponent({ component: deleteAction.component })
    //   }
    // },
    // copyItems() {
    //   this.addCopyItems({ items: this.items })
    //   this.removeSelectedItems({ items: this.items })
    // },
    isShowAction(action) {
      return action.isShowAction(
          action.name,
          this.items,
          this.currentStorage.Type,
          this.currentPath
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
