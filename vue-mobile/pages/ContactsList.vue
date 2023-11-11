<template>
  <EmptyContacts v-if="isListEmpty" />

  <q-scroll-area id="contacts-list-scroll" ref="contactsScrollArea" :thumb-style="{ width: '5px' }" class="contacts__list">
    <AppPullRefresh :refresh-action="reloadList">
      <q-virtual-scroll
        v-if="!isListEmpty"
        ref="contactsVirtualScroll"
        :virtual-scroll-item-size="64"
        :items="contactsList"
        scroll-target="#contacts-list-scroll > .scroll"
      >
        <template v-slot="{ item, index }">
          <ContactItem
            :key="index"
            class="contact"
            v-touch-hold.mouse="event => longPress(item, event)"
            :contact="item"
            :isSelectMode="isSelectMode"
            :selectItemHandler="selectItem"
          />
        </template>
        <template #after>
          <div class="contacts__loader" v-intersection="onIntersection" v-if="!isListEndReached">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-virtual-scroll>
    </AppPullRefresh>
  </q-scroll-area>
</template>

<script>
import { mapGetters, mapActions } from 'pinia'
import { useContactsStore } from '../store/index-pinia.js'

import ContactItem from '../components/ContactItem'
import EmptyContacts from '../components/EmptyContacts'
import AppPullRefresh from 'src/components/common/AppPullRefresh'

export default {
  name: 'ContactsList',

  components: {
    ContactItem,
    EmptyContacts,
    AppPullRefresh,
  },

  data() {
    return {
      isSelectMode: false,
    }
  },

  computed: {
    ...mapGetters(useContactsStore, [
      'contactsList',
      'contactsPage',
      // 'contactsPagesCount',
      'selectedContacts',
      'isLoading',
      'currentStorage',
      'numberOfContacts',
      'searchText',
    ]),
    isListEmpty() {
      return this.contactsList.length == 0 && !this.isLoading
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
      immediate: false
    },
    searchText() {
      this.asyncGetContacts()
    },
  },

  methods: {
    ...mapActions(useContactsStore, [
      'asyncGetContacts',
      'changeContactsPage',
      'setLoadingStatus',
      'clearContactList',
    ]),
    onIntersection(data) {
      if (!this.isLoading && data.isIntersecting) {
        this.changeContactsPage(this.contactsPage + 1)
        this.asyncGetContacts()
      }
    },
    async reloadList() {
      this.changeContactsPage(1)
      await this.asyncGetContacts()
    },
    selectItem(contact) {
      contact.isSelected = !contact.isSelected
    },
    longPress(contact) {
      this.isSelectMode = true
      this.selectItem(contact)
    },
  },
}
</script>
