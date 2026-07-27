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

  computed: {
    isNewGroup() {
      return this.$router.currentRoute.value.name === 'group-create'
    }
  },

  methods: {
    onPreviousPage() {
      this.$router.back()
    },
    onCreateGroup() {
      eventBus.$emit('ContactsMobileWebclient::saveGroup')
    }
  },

}
</script>
