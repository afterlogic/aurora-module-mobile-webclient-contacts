<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <q-btn icon="close" @click="onPreviousPage" color="black" flat round dense />
    </div>

    <div class="col app-header__title">
      {{ $t('CONTACTSMOBILEWEBCLIENT.HEADING_ADD_CONTACT') }}
    </div>

    <div class="col app-header__right">
      <q-btn @click="onCreateContact" color="blue" size="12px" no-caps flat dense>
        {{ $t('COREWEBCLIENT.ACTION_SAVE') }}
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddContactHeader',
  
  computed: {
    ...mapGetters('contactsmobile', ['contactsList']),
  },

  methods: {
    ...mapActions('contactsmobile', ['asyncCreateContact']),
    onPreviousPage() {
      this.$router.back()
    },
    onCreateContact() {
      this.asyncCreateContact()
      this.onPreviousPage()
    }
  },
};
</script>
