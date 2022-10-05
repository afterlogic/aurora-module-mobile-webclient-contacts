<template>
  <main-layout>
    <template v-slot:drawer>
      <drawer-content />
    </template>

    <q-scroll-area :thumb-style="{ width: '5px' }" class="contacts__list" v-if="!loadingStatus && contactsList.length">
      <app-pull-refresh :refresh-action="asyncGetContacts">
        <contact-item
            v-for="contact in contactsList"
            :key="contact"
            :contact="contact"
            :isSelectMode="isSelectMode"
            :selectContact="selectItem"
            v-touch-hold.mouse="event => longPress(contact, event)"
            class="contact"
            />
        <div style="height: 70px" class="full-width" />
      </app-pull-refresh>
    </q-scroll-area>

    <empty-contacts v-if="isContactsEmpty" />
    
    <div class="full-width" v-if="loadingStatus">
      <q-linear-progress indeterminate track-color="grey-1" color="primary"/>
    </div>

    <app-create-button :classes="appButtonClasses" :show-dialog="showCreateButtonsDialog" v-if="isShowCreateButtons"/>

    <dialogs-list />
  </main-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import MainLayout from 'src/layouts/MainLayout'
import DrawerContent from '../components/DrawerContent'
import ContactItem from '../components/ContactItem'
import EmptyContacts from '../components/EmptyContacts'
import CreateButton from '../components/common/CreateButton'
import AppCreateButton from "src/components/common/AppCreateButton"
import DialogsList from "../components/DialogsList"
import AppPullRefresh from "../../../CoreMobileWebclient/vue-mobile/src/components/common/AppPullRefresh"

export default {
  name: 'Contacts',

  components: {
    MainLayout,
    DrawerContent,
    ContactItem,
    EmptyContacts,
    CreateButton,
    AppCreateButton,
    DialogsList,
    AppPullRefresh,
  },

  data() {
    return {
      isSelectMode: false,
    }
  },

  async mounted() {
    await this.init()
  },

  computed: {
    ...mapGetters('contactsmobile', [
      'contactsList',
      'storageList',
      'selectedContacts',
      'loadingStatus',
      'dialogComponent',
      'currentStorage',
      'currentHeader',
    ]),
    isContactsEmpty() {
      return !this.contactsList.length && !this.loadingStatus
    },
    appButtonClasses() {
      if (this.dialogComponent?.component === 'CreateButtonsDialogs') {
        return 'z-index-max rotate'
      }
      else {
        return 'z-index-min'
      }
    },
    isShowCreateButtons() {
      return this.currentHeader !== 'SearchHeader' && !this.isSelectMode
    },
  },

  watch: {
    selectedContacts(items) {
      if (!items.length) {
        this.isSelectMode = false
      }
    },
  },

  methods: {
    ...mapActions('contactsmobile', [
      'asyncGetStorages',
      'asyncGetGroups',
      'asyncGetContacts',
      'changeLoadingStatus',
      'changeDialogComponent',
      'changeSelectStatus',
    ]),
    async init() {
      this.changeLoadingStatus(true)
      await this.asyncGetStorages()
      await this.asyncGetGroups()
      await this.asyncGetContacts()
      this.changeLoadingStatus(false)
    },
    showCreateButtonsDialog() {
      if (this.dialogComponent.component === 'CreateButtonsDialogs') {
        this.changeDialogComponent({ component: '' })
      } else {
        this.changeDialogComponent({ component: 'CreateButtonsDialogs' })
      }
    },
    selectItem(contact) {
      this.changeSelectStatus(contact)
    },
    longPress(contact) {
      this.isSelectMode = true
      this.selectItem(contact)
    },
  },
}
</script>

<style lang="scss">
.contacts__list {
  height: 100%;

  .contact {
    height: 64px;
  }
}
</style>
