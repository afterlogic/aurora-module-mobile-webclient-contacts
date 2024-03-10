<template>
  <AppDialog :close="closeDialog">
    <template v-slot:content>
      <div class="dialog__title-text q-ma-lg">
        <span>{{ $tc('CONTACTSWEBCLIENT.CONFIRM_DELETE_CONTACTS_PLURAL', selectedContacts.length) }}</span>
      </div>
    </template>
    <template v-slot:actions>
      <ButtonDialog
          class="q-mr-sm q-mb-sm"
          :saving="saving"
          :action="deleteContacts"
          :label="$t('COREWEBCLIENT.ACTION_DELETE')"
      />
    </template>
  </AppDialog>
</template>

<script>
import { mapActions, mapGetters } from 'pinia'
import { useContactsStore } from '../../store/index-pinia.js'

import AppDialog from 'components/common/AppDialog'
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
    // openDialog: false,
    saving: false
  }),
  // watch: {
  //   dialog(val) {
  //     this.openDialog = val
  //   },
  // },
  computed: {
    ...mapGetters(useContactsStore, ['currentStorage', 'currentContact', 'selectedContacts']),
  },
  methods: {
    ...mapActions(useContactsStore, ['asyncDeleteContacts', 'removeContactsFromList']),
    async deleteContacts() {
      this.saving = true
      const params = {
        Storage: '',
        UUIDs:[]
      }
      if (this.selectedContacts.length > 0) {
        params.Storage = this.currentStorage?.id

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
