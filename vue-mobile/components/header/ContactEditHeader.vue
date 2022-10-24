<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <q-btn icon="close" @click="onPreviousPage" color="black" flat round dense />
    </div>

    <div class="col app-header__title" v-if="isNewContact">
      {{ $t('CONTACTSMOBILEWEBCLIENT.HEADING_ADD_CONTACT') }}
    </div>
    <div class="col app-header__title" v-else>
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
  name: 'ContactEditHeader',

  computed: {
    isNewContact() {
      return this.$router.currentRoute.value.name === 'contact-create'
    }
  },

  methods: {
    onPreviousPage() {
      this.$router.back()
    },
    onEditContact() {
      eventBus.$emit('ContactsMobileWebclient::saveContact')
      // this.onPreviousPage()
    },
  }
}
</script>
