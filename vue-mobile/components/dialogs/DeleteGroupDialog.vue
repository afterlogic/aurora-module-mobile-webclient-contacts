<template>
  <AppDialog :close="closeDialog">
    <template v-slot:content>
      <div class="dialog__title-text q-ma-lg">
        <span>{{ $tc('CONTACTSWEBCLIENT.CONFIRM_DELETE_GROUP') }}</span>
      </div>
    </template>
    <template v-slot:actions>
      <ButtonDialog
        class="q-mr-sm q-mb-sm"
        :saving="isProcessing"
        :action="deleteGroup"
        :label="$t('COREWEBCLIENT.ACTION_DELETE')"
      />
    </template>
  </AppDialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppDialog from 'components/common/AppDialog'
import ButtonDialog from 'src/components/common/ButtonDialog'

export default {
  name: 'DeleteGroupDialog',

  components: {
    AppDialog,
    ButtonDialog
  },

  data: () => ({
    isProcessing: false
  }),

  computed: {
    ...mapGetters('contactsmobile', [
      'currentGroup',
      'getDefaultStorage',
    ]),
  },
  methods: {
    ...mapActions('contactsmobile', [
      'asyncDeleteGroup',
      'removeGroupFromList',
      'setCurrentGroup',
    ]),
    async deleteGroup() {
      this.isProcessing = true
      const params = {
        UUID: ''
      }
      
      if (this.currentGroup) {
        params.UUID = this.currentGroup.UUID    
        const result = await this.asyncDeleteGroup(params)

        if (result) {
          this.removeGroupFromList(this.currentGroup)
          this.setCurrentGroup(null)
          this.$router.push({ name: 'contact-list', params: { storageId: this.getDefaultStorage?.id } })
          this.closeDialog()
        }
      }
      
      this.isProcessing = false
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped></style>
