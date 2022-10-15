<template>
  <main-layout>
    <template v-slot:drawer>
      <drawer-content />
    </template>
    <router-view></router-view>
    <app-create-button :rotate="appButtonRotate" @click="showCreateButtonsDialog" v-if="isShowCreateButtons"/>
    <dialogs-list />
  </main-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import MainLayout from 'src/layouts/MainLayout'
import AppCreateButton from 'src/components/common/AppCreateButton'

import DrawerContent from '../components/DrawerContent'
import DialogsList from '../components/DialogsList'

export default {
  name: 'Contacts',

  components: {
    MainLayout,
    AppCreateButton,
    DrawerContent,
    DialogsList,
  },

  data() {
    return {
      isSelectMode: false,
    }
  },

  // beforeRouteEnter(to, from) {
  //   console.log('enter routing')
  // },

  // beforeRouteUpdate(to, from) {
  //   console.log('update routing')
  // },

  async mounted() {
    const storageId = this.$route.params.storageId
    const groupId = this.$route.params.groupId

    if (!storageId && !groupId) {
      if (this.storageList.length === 0) {
        await this.asyncGetStorages()
      }
      // console.log('correct empty route')
      this.$router.push(`/contacts/${this.getDefaultStorage.id}`)
    }
  },

  computed: {
    ...mapGetters('contactsmobile', [
      'storageList',
      'groupsList',
      'selectedContacts',
      // 'loadingStatus',
      'currentStorage',
      'currentContact',
      
      'dialogComponent',
      'currentHeader',
      'getDefaultStorage',
    ]),
    showContact() {
      return !!this.currentContact?.UUID
    },
    appButtonRotate() {
      return this.dialogComponent?.component === 'CreateButtonsDialogs'
    },
    isShowCreateButtons() {
      return this.currentHeader !== 'SearchHeader' && !this.isSelectMode && !this.showContact
    },
  },

  watch: {
    '$route.params.storageId': {
      handler: async function (storageId) {
        // console.log('router watch: storage id', storageId)
        await this.fetchData()
        
        const storage = this.storageList.length ? this.storageList.find(item => item.id === this.$route.params.storageId) : {}
        if (storage) {
          this.setCurrentStorage(storage)
        }
      },
      immediate: true
    },
    '$route.params.groupId': {
      handler: async function (groupId) {
        await this.fetchData()
        // console.log('router watch: group id', groupId)
        // console.log('router watch: storage id', this.$route.params.storageId)
        const group = this.groupsList.length ? this.groupsList.find(group => group.UUID === groupId) : {}
        
        // console.log('storage', allStorage)
        if (group) {
          this.setCurrentGroup(group)
          // this.setCurrentStorage(allStorage)
        }
      },
      immediate: true
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
      immediate: true
    },
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
      'asyncGetContact',
      'setLoadingStatus',
      'changeDialogComponent',
      // 'changeSelectStatus',
      'setCurrentStorage',
      'setCurrentGroup',
    ]),
    async fetchData() {
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
      if (this.dialogComponent.component === 'CreateButtonsDialogs') {
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
</style>
