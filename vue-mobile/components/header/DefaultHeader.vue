<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <q-btn icon="menu" @click="$emit('openDrawer')" color="black" flat round dense />
    </div>

    <div class="col app-header__title">
      <span class="app-header__title-main">
        {{ $t('CONTACTSWEBCLIENT.HEADING_BROWSER_TAB') }}
      </span>
      <span class="app-header__title-secondary">
        {{ scopeName }}
      </span>
    </div>

    <div class="col app-header__right">
      <ActionIcon
        class="q-mr-xs"
        @click="onGroupInfoPage"
        icon="InfoIcon"
        v-if="isGroup"
      />
      <q-btn icon="search" @click="showSearchHeader" color="black" flat round dense />
    </div>
  </q-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ActionIcon from '../common/ActionIcon'
import InfoIcon from '../icons/contact-actions/InfoIcon'

export default {
  name: 'ContactsHeader',

  components: {
    InfoIcon,
    ActionIcon,
  },

  computed: {
    ...mapGetters('contactsmobile', ['currentStorage', 'currentGroup']),
    isGroup() {
      return !!this.currentGroup
    },
    scopeName() {
      return this.currentStorage?.name || this.currentGroup?.name || ''
    },
  },
  
  methods: {
    ...mapActions('contactsmobile', ['changeCurrentHeader']),
    showSearchHeader() {
      this.changeCurrentHeader('SearchHeader')
    },
    onGroupInfoPage() {
      this.$router.push({ name: 'group-view' })
    },
  },
}
</script>
