<template>
  <MainLayout>
    <template v-slot:header>
      <ContactsHeader />
    </template>

    <template v-slot:drawer>
      <DrawerContent />
    </template>

    <router-view></router-view>

    <AppCreateButton :rotate="appButtonRotate" @click="showCreateButtonsDialog" v-if="isShowCreateButtons" />

    <DialogsList />
  </MainLayout>
</template>

<script>
import { mapGetters, mapActions } from 'pinia'
import { useContactsStore } from '../store/index-pinia.js'

import MainLayout from 'src/layouts/MainLayout'
import AppCreateButton from 'src/components/common/AppCreateButton'

import ContactsHeader from '../components/header/ContactsHeader'
import DrawerContent from '../components/DrawerContent'
import DialogsList from '../components/DialogsList'

export default {
  name: 'Contacts',

  components: {
    MainLayout,
    AppCreateButton,
    ContactsHeader,
    DrawerContent,
    DialogsList,
  },

  data() {
    return {
      isSelectMode: false,
    }
  },

  async mounted() {
    const storageId = this.$route.params.storageId
    const groupId = this.$route.params.groupId

    if (!storageId && !groupId) {
      if (this.storageList.length === 0) {
        await this.asyncGetStorages()
      }
      if (this.$route.name !== 'group-create') {
        this.$router.push({ name: 'contact-list', params: { storageId: this.getDefaultStorage.id } })
      }
    }
  },

  computed: {
    ...mapGetters(useContactsStore, [
      'storageList',
      'groupsList',
      'selectedContacts',
      'currentStorage',
      'currentContact',

      'dialogComponent',
      'currentHeader',
      'getDefaultStorage',
    ]),
    // showContact() {
    //   return !!this.currentContact?.UUID
    // },
    appButtonRotate() {
      return this.dialogComponent?.component === 'CreateButtonsDialogs'
    },
    isShowCreateButtons() {
      return (
        this.currentHeader !== 'SearchHeader'
        && !this.isSelectMode
        && (this.$route.name === 'contact-list' || this.$route.name === 'group-list')
      )
    },
  },

  watch: {
    '$route.params.storageId': {
      handler: async function (storageId) {
        // console.log('router watch: storage id', storageId)
        // console.log('router watch: group id', this.$route.params.groupId)
        await this.fetchData()

        if (!storageId && !this.$route.params.groupId && this.$route.name !== 'group-create') {
          this.$router.push({ name: 'contact-list', params: { storageId: this.getDefaultStorage.id } })
        }
        const storage = this.storageList.length ? this.storageList.find((storage) => storage.id === storageId) : {}
        if (storage) {
          this.setCurrentStorage(storage)
        }
      },
      immediate: true,
    },
    '$route.params.groupId': {
      handler: async function (groupId) {
        await this.fetchData()
        // console.log('router watch: group id', groupId)
        // console.log('router watch: storage id', this.$route.params.storageId)
        let group = this.groupsList.length ? this.groupsList.find((group) => group.UUID === groupId) : {}

        if (!group) {
          this.setLoadingStatus(true)
          await this.asyncGetGroups()
          this.setLoadingStatus(false)
          group = this.groupsList.length ? this.groupsList.find((group) => group.UUID === groupId) : {}
        }

        if (group) {
          this.setCurrentGroup(group)
        } else {
          this.setCurrentGroup(null)
        }
      },
      immediate: true,
    },
    '$route.params.contactId': {
      handler: async function (conctactId) {
        // console.log('$route.params.contactId', conctactId)
        if (conctactId) {
          this.asyncGetContact({ UUID: conctactId })
        } else {
          // console.log('reset current contact')
          this.asyncGetContact({})
        }
      },
      immediate: true,
    },
    selectedContacts(items) {
      if (!items.length) {
        this.isSelectMode = false
      }
    },
  },

  methods: {
    ...mapActions(useContactsStore, [
      'asyncGetStorages',
      'asyncGetGroups',
      'asyncGetContact',
      'setLoadingStatus',
      'changeDialogComponent',
      'setCurrentStorage',
      'setCurrentGroup',
    ]),
    async fetchData(force) {
      this.setLoadingStatus(true)
      if (this.storageList.length === 0) {
        // console.log('fetchData: getting storages')
        await this.asyncGetStorages()
      }

      if (this.groupsList.length === 0) {
        // console.log('fetchData: getting groups')
        await this.asyncGetGroups()
      }
      this.setLoadingStatus(false)
    },
    showCreateButtonsDialog() {
      if (this.dialogComponent?.component === 'CreateButtonsDialogs') {
        this.changeDialogComponent({ component: '' })
      } else {
        this.changeDialogComponent({ component: 'CreateButtonsDialogs' })
      }
    },
  },
}
</script>

<style lang="scss">
.contacts {
  &__list {
    height: 100%;
  }

  &__loader {
    display: flex;
    justify-content: center;
  }
}

.contact-field {
  padding: 4px 0 4px 24px;

  &__icon {
    display: flex;
    align-items: center;
    margin-right: 16px;
    min-width: 16px;
  }

  &__caption {
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    color: #969494;
  }

  &__value {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    word-break: break-all;
  }

  // &__action {
  // }
}
</style>
