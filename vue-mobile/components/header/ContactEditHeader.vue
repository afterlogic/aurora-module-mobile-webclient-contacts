<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <AppHeaderButton
        data-test-id="contacts-edit-close"
        icon="close"
        @click="onPreviousPage"
      />
    </div>

    <div class="col app-header__title" v-if="isNewContact">
      {{ $t('CONTACTSMOBILEWEBCLIENT.HEADING_ADD_CONTACT') }}
    </div>
    <div class="col app-header__title" v-else>
      {{ $t('CONTACTSWEBCLIENT.HEADING_EDIT_CONTACT') }}
    </div>

    <div class="col app-header__right">
      <AppHeaderButton
        data-test-id="contacts-edit-save"
        variant="text"
        color="blue"
        @click="onEditContact"
      >
        {{ $t('COREWEBCLIENT.ACTION_SAVE') }}
      </AppHeaderButton>
    </div>
  </q-toolbar>
</template>

<script>
import eventBus from 'src/event-bus'
import AppHeaderButton from 'src/components/common/AppHeaderButton'

export default {
  name: 'ContactEditHeader',

  components: {
    AppHeaderButton,
  },

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
