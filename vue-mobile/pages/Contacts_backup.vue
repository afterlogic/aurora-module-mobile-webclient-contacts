<template>
  <main-layout>
    <template v-slot:drawer>
      <drawer-content />
    </template>
    
    <!-- Work, updating can be added -->
    <!-- <div style="width: 100vw; height: 100%; background-color: #eee;">
      <RecycleScroller
        class="scroller"
        style="height: 100%;"
        :items="contactsList"
        :item-size="64"
        key-field="UUID"
        ref="scrollContainer"
      >
      <template v-slot="{ item }">
        <contact-item
          class="contact"
          v-touch-hold.mouse="event => longPress(item, event)"
  
          :contact="item"
          :isSelectMode="isSelectMode"
          :selectContact="selectItem"
        />
      </template>
      <template #after>
        <div v-intersection="onIntersection">Loading...</div>
      </template>
      </RecycleScroller>
    </div> -->
    
     <q-scroll-area id="contacts-list-scroll" ref="contactsScrollArea" :thumb-style="{ width: '5px' }" class="contacts__list">
      <q-virtual-scroll
        v-if="!isListEmpty"
        ref="contactsVirtualScroll"
        :virtual-scroll-item-size="64"
        :items="contactsList"
        scroll-target="#contacts-list-scroll > .scroll"
      >
        <template v-slot="{ item, index }">
          <contact-item
            :key="index"
            class="contact"
            v-touch-hold.mouse="event => longPress(item, event)"
            :contact="item"
            :isSelectMode="isSelectMode"
            :selectContact="selectItem"
          />
        </template>
        <template #after>
          <div class="contacts__loader" v-intersection="onIntersection" v-if="!isListEndReached">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-virtual-scroll>
    </q-scroll-area>
    <!-- 
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
      </q-infinite-scroll> -->
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
    <!-- </q-scroll-area> -->

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
import DialogsList from '../components/DialogsList'
import AppCreateButton from 'src/components/common/AppCreateButton'
import AppPullRefresh from 'src/components/common/AppPullRefresh'

// import { RecycleScroller } from 'vue-virtual-scroller'
// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

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
    // RecycleScroller,
  },

  data() {
    return {
      isSelectMode: false,
    }
  },

  beforeRouteEnter(to, from) {
    // console.log('enter routing')
  },

  beforeRouteUpdate(to, from) {
    // console.log('update routing')
  },

  async mounted() {
    const storageId = this.$route.params.storageId
    // console.log('mounted storageId', this.$route.params.storageId)

    await this.asyncGetStorages()
    if (!storageId) {
      // console.log('default storage', this.getDefaultStorage.id)
      await this.$router.push(`/contacts/${this.getDefaultStorage.id}`)
      this.setCurrentStorage(this.getDefaultStorage)
    } else {
      // console.log('init', this.currentStorage)

      const storage = this.storageList.length ? this.storageList.find(item => item.id === storageId) : {}

      if (storage) {
        this.setCurrentStorage(storage)
        await this.init()
      }
    }
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
      'numberOfContacts',
      'getDefaultStorage',
    ]),
    isListEmpty() {
      return this.contactsList.length == 0 && !this.loadingStatus
    },
    isListEndReached() {
      return this.contactsList.length === this.numberOfContacts
    },
    appButtonRotate() {
      return this.dialogComponent?.component === 'CreateButtonsDialogs'
    },
    isShowCreateButtons() {
      return this.currentHeader !== 'SearchHeader' && !this.isSelectMode
    },
  },

  watch: {
    contactsList(items){
      this.$refs.contactsVirtualScroll.refresh()
    },
    selectedContacts(items) {
      if (!items.length) {
        this.isSelectMode = false
      }
    },
    async currentStorage(v) {
      // console.log('currentStorage watch', v)
      await this.asyncGetContacts()
    },
    // contactsPage () {
    //   if (this.contactsPage === 1) {
        // this.$refs.contactsScrollArea.setScrollPosition('vertical', 0)
        // this.$refs.contactsInfiniteScroll.setIndex(0)
        // this.$refs.contactsInfiniteScroll.resume(0)

        // this.$refs.contactsVirtualScroll.reset()
      // }
    // }
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
      'setCurrentStorage',
    ]),
    async init() {
      this.changeLoadingStatus(true)
      await this.asyncGetStorages()
      await this.asyncGetGroups()
      // console.log('init')
      await this.asyncGetContacts()      
      this.changeLoadingStatus(false)
    },
    onIntersection(data) {
      if (!this.loadingStatus && data.isIntersecting) {
        this.changeContactsPage(this.contactsPage + 1)

        // console.log('onIntersection')
        this.asyncGetContacts()
      }
    },
    // async loadNextPage (index, done) {
    //   if (index === 1 && this.contactsList.length === 0 && this.contactsPage === 1) {
    //     this.$refs.contactsInfiniteScroll.setIndex(0)
    //   } else {
    //     this.changeContactsPage(index + 1)
    //   }
    //   await this.asyncGetContacts()
    //   done(this.contactsPage >= this.contactsPagesCount )
    // },
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
.contacts {

  &__list {
    height: 100%;
    // max-height: 100vh;
    // overflow-x: hidden;

  
    // scrollbar-width: thin;
    // scrollbar-color: rgba(0,0,0,0.2) transparent;
  }

  &__loader {
    display: flex;
    justify-content: center;
  }
}

// ::-webkit-scrollbar {
//   width: 10px;
// }

// ::-webkit-scrollbar-track {
//   // background: #f1f1f1; 
// }

// ::-webkit-scrollbar-thumb {
//   background: rgba(0,0,0,0.2);
//   border-radius: 5px;
// }

// ::-webkit-scrollbar-thumb:hover {
//   background: rgba(0,0,0,0.3);
// }
</style>
