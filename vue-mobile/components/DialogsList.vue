<template>
  <component
    :is="currentComponent"
    v-model="isShowDialog"
    @closeDialog="closeDialog"
  />
</template>

<script>
import { mapActions, mapGetters } from 'pinia'
import { useContactsStore } from '../store/index-pinia.js'

import CreateButtonsDialogs from './dialogs/CreateButtonsDialogs'
import DeleteContactDialog from './dialogs/DeleteContactDialog'

export default {
  name: "DialogsList",

  components: {
    CreateButtonsDialogs,
    DeleteContactDialog
  },

  data() {
    return {
      isShowDialog: false,
      currentComponent: null,
    }
  },
  computed: {
    ...mapGetters(useContactsStore, ['dialogComponent']),
  },
  watch: {
    dialogComponent(value) {
      if (value?.getComponent) {
        this.currentComponent = value.getComponent()
        this.isShowDialog = true
      } else if (value?.component) {
        this.currentComponent = value.component
        this.isShowDialog = true
      } else {
        this.isShowDialog = false
      }
    },
    isShowDialog(value) {
      if (!value && this.dialogComponent?.component === 'CreateButtonsDialogs')
        this.changeDialogComponent({ component: '' })
    },
  },
  methods: {
    ...mapActions(useContactsStore, ['changeDialogComponent']),
    closeDialog(hasChanges) {
      if (typeof hasChanges === 'function' && hasChanges()) {
        this.$root.unsavedChangesDialog(() => this.isShowDialog = false)
      } else {
        this.isShowDialog = false
      }
    },
  },
}
</script>
