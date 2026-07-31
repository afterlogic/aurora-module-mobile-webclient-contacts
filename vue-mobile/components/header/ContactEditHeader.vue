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
        :disable="saveDisabled"
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

  data() {
    return {
      saveDisabled: true,
    }
  },

  computed: {
    isNewContact() {
      return this.$router.currentRoute.value.name === 'contact-create'
    }
  },

  mounted() {
    eventBus.$on('ContactsMobileWebclient::SetSaveDisabled', this.setSaveDisabled)
  },

  beforeUnmount() {
    eventBus.$off('ContactsMobileWebclient::SetSaveDisabled', this.setSaveDisabled)
  },

  methods: {
    setSaveDisabled(isDisabled) {
      this.saveDisabled = !!isDisabled
    },
    onPreviousPage() {
      this.$router.back()
    },
    onEditContact() {
      if (this.saveDisabled) {
        return
      }
      eventBus.$emit('ContactsMobileWebclient::saveContact')
    },
  }
}
</script>
