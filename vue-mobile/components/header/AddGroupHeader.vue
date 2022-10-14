<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <q-btn icon="close" @click="onPreviousPage" color="black" flat round dense />
    </div>
    
    <div class="col app-header__title">
      {{ $t('CONTACTSMOBILEWEBCLIENT.HEADING_ADD_GROUP') }}
    </div>

    <div class="col app-header__right">
      <q-btn @click="onCreateGroup" color="primary" size="12px" no-caps flat dense>
        {{ $t('COREWEBCLIENT.ACTION_SAVE') }}
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddGroupHeader',
  methods: {
    ...mapActions('contactsmobile', ['asyncCreateGroup']),
    onPreviousPage() {
      this.$router.back()
    },
    onCreateGroup() {
      this.asyncCreateGroup()
      this.onPreviousPage()
    }
  },
};
</script>
