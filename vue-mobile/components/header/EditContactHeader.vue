<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <q-btn icon="close" @click="onPreviousPage" color="black" flat round dense />
    </div>

    <div class="col app-header__title">
      {{ $t('CONTACTSWEBCLIENT.HEADING_EDIT_CONTACT') }}
    </div>

    <div class="col app-header__right">
      <q-btn @click="onEditContact" size="12px" color="blue" flat dense no-caps >
        {{ $t('COREWEBCLIENT.ACTION_SAVE') }}
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script>
import eventBus from 'src/event-bus'

export default {
  name: 'EditContactHeader',

  methods: {
    onEditContact() {
      eventBus.$emit('ContactsMobileWebclient::editContact')
      this.onPreviousPage()
    },
    onPreviousPage() {
      this.$router.back()
    },
  }
}
</script>
