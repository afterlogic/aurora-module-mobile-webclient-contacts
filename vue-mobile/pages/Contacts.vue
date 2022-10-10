<template>
  <main-layout>
    <template v-slot:drawer>
      <drawer-content />
    </template>

    <q-scroll-area ref="contactsScrollArea" :thumb-style="{ width: '5px' }" class="contacts__list">
      <q-infinite-scroll ref="contactsInfiniteScroll" @load="loadNextPage" :offset="250">
        <contact-item
          class="contact"
          v-for="contact in contactsList"
          :key="contact.UUID"
          v-touch-hold.mouse="event => longPress(contact, event)"

          :contact="contact"
          :isSelectMode="isSelectMode"
          :selectContact="selectItem"
        />
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
<!--      <q-infinite-scroll @load="loadNextPage" :offset="250">-->
<!--  &lt;!&ndash;      <app-pull-refresh :refresh-action="asyncGetContacts">&ndash;&gt;-->
<!--          <contact-item-->
<!--              v-for="contact in contactsList"-->
<!--              :key="contact"-->
<!--              :contact="contact"-->
<!--              :isSelectMode="isSelectMode"-->
<!--              :selectContact="selectItem"-->
<!--              v-touch-hold.mouse="event => longPress(contact, event)"-->
<!--              class="contact"-->
<!--              />-->
<!--  &lt;!&ndash;        <div style="height: 70px" class="full-width" />&ndash;&gt;-->
<!--  &lt;!&ndash;      </app-pull-refresh>&ndash;&gt;-->
<!--        <template v-slot:loading>-->
<!--          <div class="row justify-center q-my-md">-->
<!--            <q-spinner-dots color="primary" size="40px"></q-spinner-dots>-->
<!--          </div>-->
<!--        </template>-->
<!--      </q-infinite-scroll>-->
    </q-scroll-area>

    <empty-contacts v-if="isListEmpty" />
    
<!--    <div class="full-width" v-if="loadingStatus">-->
<!--      <q-linear-progress indeterminate track-color="grey-1" color="primary"/>-->
<!--    </div>-->

    <app-create-button :rotate="appButtonRotate" @click="showCreateButtonsDialog" v-if="isShowCreateButtons"/>

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
import AppCreateButton from 'src/components/common/AppCreateButton'
import DialogsList from '../components/DialogsList'
import AppPullRefresh from 'src/components/common/AppPullRefresh'

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
      'contactsPage',
      'contactsPagesCount',
      'storageList',
      'selectedContacts',
      'loadingStatus',
      'dialogComponent',
      'currentStorage',
      'currentHeader',
    ]),
    isListEmpty() {
      return !this.contactsList.length && !this.loadingStatus
    },
    appButtonRotate() {
      return this.dialogComponent?.component === 'CreateButtonsDialogs'
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
    contactsPage () {
      if (this.contactsPage === 1) {
        this.$refs.contactsScrollArea.setScrollPosition('vertical', 0)
        this.$refs.contactsInfiniteScroll.setIndex(0)
        this.$refs.contactsInfiniteScroll.resume(0)
      }
    }
  },

  methods: {
    ...mapActions('contactsmobile', [
      'asyncGetStorages',
      'asyncGetGroups',
      'asyncGetContacts',
      'changeContactsPage',
      'changeLoadingStatus',
      'changeDialogComponent',
      'changeSelectStatus',
    ]),
    async init() {
      this.changeLoadingStatus(true)
      await this.asyncGetStorages()
      await this.asyncGetGroups()
      this.changeLoadingStatus(false)
    },
    async loadNextPage (index, done) {
      if (index === 1 && this.contactsList.length === 0 && this.contactsPage === 1) {
        this.$refs.contactsInfiniteScroll.setIndex(0)
      } else {
        this.changeContactsPage(index + 1)
      }
      await this.asyncGetContacts()
      done(this.contactsPagesCount <= this.contactsPage)
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
