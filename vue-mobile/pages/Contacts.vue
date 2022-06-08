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
            class="contact"
        />
        <div style="height: 70px" class="full-width" />
      </app-pull-refresh>
    </q-scroll-area>
    <empty-contacts v-if="isContactsEmpty" />
    <div class="q-mt-xl flex items-center justify-center" v-if="loadingStatus">
      <q-circular-progress
        indeterminate
        size="40px"
        color="primary"
        class="q-ma-md"
      />
    </div>

    <app-create-button :classes="classes" :show-dialog="showCreateButtonsDialog"/>
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
import AppCreateButton from "src/components/common/AppCreateButton";
import DialogsList from "../components/DialogsList";
import AppPullRefresh from "../../../CoreMobileWebclient/vue-mobile/src/components/common/AppPullRefresh";

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

  async mounted() {
    await this.init()
  },

  methods: {
    ...mapActions('contactsmobile', [
      'asyncGetStorages',
      'asyncGetGroups',
      'asyncGetContacts',
      'changeLoadingStatus',
      'changeDialogComponent'
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
    }
  },

  computed: {
    ...mapGetters('contactsmobile', [
      'contactsList',
      'storageList',
      'loadingStatus',
      'dialogComponent'
    ]),
    isContactsEmpty() {
      return !this.contactsList.length && !this.loadingStatus
    },
    classes() {
      if (this.dialogComponent?.component === 'CreateButtonsDialogs') {
        return 'z-index-max rotate'
      }
      return 'z-index-min'
    },
  },
}
</script>

<style>
.contacts__list {
  height: 100%;
}
</style>
