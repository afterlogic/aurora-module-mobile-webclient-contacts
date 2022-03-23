<template>
  <app-dialog v-model="openDialog" :close="closeDialog">
    <template v-slot:head>
      <div class="dialog__title-text q-ma-lg">
        <span>{{ $t('CONTACTSWEBCLIENT.CONFIRM_DELETE_CONTACTS_PLURAL') }}</span>
      </div>
    </template>
    <template v-slot:actions>
      <button-dialog
          class="q-mr-sm q-mb-sm"
          :saving="saving"
          :action="deleteContact"
          :label="$t('COREWEBCLIENT.ACTION_DELETE')"
      />
    </template>
  </app-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppDialog from "components/common/AppDialog";
import ButtonDialog from 'src/components/common/ButtonDialog'

export default {
  name: "DeleteContactDialog",
  components: {
    AppDialog,
    ButtonDialog
  },
  props: {
    dialog: { type: Boolean, default: false },
  },
  data: () => ({
    openDialog: false,
    saving: false
  }),
  watch: {
    dialog(val) {
      this.openDialog = val
    },
  },
  computed: {
    ...mapGetters('contactsmobile', ['currentContact']),
  },
  methods: {
    ...mapActions('contactsmobile', ['asyncDeleteContact']),
    async deleteContact() {
      this.saving = true
      const params = {
        Storage: this.currentContact.Storage,
        UUIDs:[this.currentContact.UUID]
      }
      const result = await this.asyncDeleteContact(params)
      if (result) {
        this.$router.push('/contacts')
      }
      this.saving = false
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped>

</style>
