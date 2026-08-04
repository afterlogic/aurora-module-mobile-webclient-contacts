<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <AppHeaderButton
        data-test-id="contacts-folder-menu"
        icon="menu"
        @click="openDrawer"
      />
    </div>

    <div class="col app-header__title">
      <span class="app-header__title-main">
        {{ $t('CONTACTSWEBCLIENT.HEADING_BROWSER_TAB') }}
      </span>
      <span
        class="app-header__title-secondary"
        data-test-id="contacts-scope-name"
      >
        {{ scopeName }}
      </span>
    </div>

    <div class="col app-header__right">
      <AppHeaderButton
        v-if="isGroup"
        data-test-id="contacts-group-info"
        @click="onGroupInfoPage"
      >
        <ActionIcon color="black" icon="InfoIcon" />
      </AppHeaderButton>
      <AppHeaderButton
        data-test-id="contacts-search"
        icon="search"
        @click="showSearchHeader"
      />
    </div>
  </q-toolbar>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'pinia'
import { useContactsStore } from '../../store/index-pinia.js'

import eventBus from 'src/event-bus'

import ActionIcon from '../common/ActionIcon'
import AppHeaderButton from 'src/components/common/AppHeaderButton'

export default {
  name: 'ContactsHeader',

  components: {
    ActionIcon,
    AppHeaderButton,
  },

  computed: {
    ...mapState(useContactsStore, ['currentStorage', 'currentGroup']),

    isGroup() {
      return !!this.currentGroup
    },

    scopeName() {
      return this.currentStorage?.name || this.currentGroup?.name || ''
    },
  },

  methods: {
    ...mapActions(useContactsStore, ['changeCurrentHeader']),

    showSearchHeader() {
      this.changeCurrentHeader('SearchHeader')
    },

    onGroupInfoPage() {
      this.$router.push({ name: 'group-view' })
    },

    openDrawer() {
      eventBus.$emit('openDrawer')
    },
  },
}
</script>
