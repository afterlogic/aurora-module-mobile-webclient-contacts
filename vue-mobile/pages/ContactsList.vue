<template>    
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
    
    <!-- <div class="full-width" v-if="loadingStatus">
      <q-linear-progress indeterminate track-color="grey-1" color="primary"/>
    </div> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ContactItem from '../components/ContactItem'
import EmptyContacts from '../components/EmptyContacts'
import AppPullRefresh from 'src/components/common/AppPullRefresh'

// import { RecycleScroller } from 'vue-virtual-scroller'
// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

export default {
  name: 'ContactsList',

  components: {
    ContactItem,
    EmptyContacts,
    AppPullRefresh,
    // RecycleScroller,
  },

  data() {
    return {
      isSelectMode: false,
    }
  },

  computed: {
    ...mapGetters('contactsmobile', [
      'contactsList',
      'contactsPage',
      // 'contactsPagesCount',
      'selectedContacts',
      'loadingStatus',
      'currentStorage',
      'numberOfContacts',
    ]),
    isListEmpty() {
      return this.contactsList.length == 0 && !this.loadingStatus
    },
    isListEndReached() {
      return this.contactsList.length === this.numberOfContacts
    },
  },

  watch: {
    contactsList(){
      this.$refs.contactsVirtualScroll?.refresh()
    },
    selectedContacts(items) {
      if (!items.length) {
        this.isSelectMode = false
      }
    },
    currentStorage: {
      handler: function(v) {
        this.clearContactList()
        this.asyncGetContacts()
      },
      immediate: true
    },
  },

  methods: {
    ...mapActions('contactsmobile', [
      'asyncGetContacts',
      'changeContactsPage',
      'setLoadingStatus',
      'changeSelectStatus',
      'clearContactList',
    ]),
    async init() {
      this.setLoadingStatus(true)
      await this.asyncGetContacts()      
      this.setLoadingStatus(false)
    },
    onIntersection(data) {
      if (!this.loadingStatus && data.isIntersecting) {
        this.changeContactsPage(this.contactsPage + 1)
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
