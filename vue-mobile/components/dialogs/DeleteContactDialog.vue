<template>
  <app-dialog v-model="openDialog" :close="closeDialog">
    <template v-slot:content>
      <div class="dialog__title-text q-ma-lg">
        <span>{{ $tc('CONTACTSWEBCLIENT.CONFIRM_DELETE_CONTACTS_PLURAL', selectedContacts.length) }}</span>
      </div>
    </template>
    <template v-slot:actions>
      <button-dialog
          class="q-mr-sm q-mb-sm"
          :saving="saving"
          :action="deleteContacts"
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
    ...mapGetters('contactsmobile', ['currentStorage', 'currentContact', 'selectedContacts']),
  },
  methods: {
    ...mapActions('contactsmobile', ['asyncDeleteContacts', 'removeContactsFromList']),
    async deleteContacts() {
      this.saving = true
      const params = {
        Storage: '',
        UUIDs:[]
      }
      if (this.selectedContacts.length > 0) {
        params.Storage = this.currentStorage?.Id

        this.selectedContacts.forEach((item) => {
          params.UUIDs.push(item.UUID)
        })
      } else if (this.currentContact) {
        params.Storage = this.currentContact.Storage
        params.UUIDs.push(this.currentContact.UUID)
      }
      
      const result = await this.asyncDeleteContacts(params)
      if (result) {
        this.removeContactsFromList(this.selectedContacts.length ? this.selectedContacts : [this.currentContact])
        // await this.selectContact(null)
        // this.$router.push('/contacts')
        this.$emit('closeDialog')
      }
      this.saving = false
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped></style>
