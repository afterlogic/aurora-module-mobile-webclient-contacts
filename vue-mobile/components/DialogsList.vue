<template>
  <component
      :is="component"
      v-model="dialog"
      @closeDialog="closeDialog"
  />
</template>

<script>
import _ from "lodash";
import { mapActions, mapGetters } from 'vuex'

import CreateButtonsDialogs from "./dialogs/CreateButtonsDialogs";

export default {
  name: "DialogsList",
  components: {
    CreateButtonsDialogs
  },
  data() {
    return {
      dialog: false,
      component: '',
    }
  },
  computed: {
    ...mapGetters('contactsmobile', ['dialogComponent']),
  },
  watch: {
    dialogComponent(val) {
      if (!val.component) {
        this.dialog = false
      } else {
        this.component = val.component
        this.dialog = true
      }
    },
    dialog(val) {
      if (!val && this.dialogComponent.component === 'CreateButtonsDialogs')
        this.changeDialogComponent({ component: '' })
    },
  },
  methods: {
    ...mapActions('contactsmobile', ['changeDialogComponent']),
    closeDialog(hasChanges) {
      if (_.isFunction(hasChanges)) {
        if (hasChanges()) {
          this.$root.unsavedChangesDialog(() => this.dialog = false)
        } else {
          this.dialog = false
        }
      } else {
        this.dialog = false
      }

    },
  },
}
</script>

<style scoped>

</style>
