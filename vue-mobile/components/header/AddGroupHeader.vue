<template>
  <q-toolbar class="app-header">
    <div class="col">
      <q-btn icon="close" @click="onPreviousPage" color="black" flat round dense />
    </div>
    
    <div class="col">
      <span class="header-title text-black text-center">
        {{ $t('CONTACTSMOBILEWEBCLIENT.HEADING_ADD_GROUP') }}
      </span>
    </div>

    <div class="col">
      <q-btn @click="onCreateGroup" color="blue" size="12px" no-caps flat dense>
        {{ $t('COREWEBCLIENT.ACTION_SAVE') }}
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddGroupHeader',
  computed: {
    ...mapGetters('contactsmobile', ['contactsList']),
  },
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
