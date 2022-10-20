<template>
  <component
      v-if="isShowDialog"
      :is="component"
      v-model="isShowDialog"
      @closeDialog="closeDialog"
  />
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'

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
      component: '',
    }
  },
  computed: {
    ...mapGetters('contactsmobile', ['dialogComponent']),
  },
  watch: {
    dialogComponent(val) {
      if (!val.component) {
        this.isShowDialog = false
      } else {
        this.component = val.component
        this.isShowDialog = true
      }
    },
    isShowDialog(v) {
      if (!v && this.dialogComponent?.component === 'CreateButtonsDialogs')
        this.changeDialogComponent({ component: '' })
    },
  },
  methods: {
    ...mapActions('contactsmobile', ['changeDialogComponent']),
    closeDialog(hasChanges) {
      if (_.isFunction(hasChanges)) {
        if (hasChanges()) {
          this.$root.unsavedChangesDialog(() => this.isShowDialog = false)
        } else {
          this.isShowDialog = false
        }
      } else {
        this.isShowDialog = false
      }
    },
  },
}
</script>
