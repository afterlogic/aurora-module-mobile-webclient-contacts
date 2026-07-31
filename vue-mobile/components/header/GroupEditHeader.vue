<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <AppHeaderButton
        data-test-id="contacts-group-edit-close"
        icon="close"
        @click="onPreviousPage"
      />
    </div>

    <div class="col app-header__title" v-if="isNewGroup">
      {{ $t('CONTACTSMOBILEWEBCLIENT.HEADING_ADD_GROUP') }}
    </div>
    <div class="col app-header__title" v-else>
      {{ $t('CONTACTSMOBILEWEBCLIENT.HEADING_EDIT_GROUP') }}
    </div>

    <div class="col app-header__right">
      <AppHeaderButton
        data-test-id="contacts-group-edit-save"
        variant="text"
        :disable="saveDisabled"
        @click="onCreateGroup"
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
  name: 'GroupEditHeader',

  components: {
    AppHeaderButton,
  },

  data() {
    return {
      saveDisabled: true,
    }
  },

  computed: {
    isNewGroup() {
      return this.$router.currentRoute.value.name === 'group-create'
    }
  },

  mounted() {
    eventBus.$on('ContactsMobileWebclient::SetGroupSaveDisabled', this.setSaveDisabled)
  },

  beforeUnmount() {
    eventBus.$off('ContactsMobileWebclient::SetGroupSaveDisabled', this.setSaveDisabled)
  },

  methods: {
    setSaveDisabled(isDisabled) {
      this.saveDisabled = !!isDisabled
    },
    onPreviousPage() {
      this.$router.back()
    },
    onCreateGroup() {
      if (this.saveDisabled) {
        return
      }
      eventBus.$emit('ContactsMobileWebclient::saveGroup')
    }
  },

}
</script>
