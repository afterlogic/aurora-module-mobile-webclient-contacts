<template>
  <div class="column fit" data-test-id="contacts-list">
  <EmptyContacts v-if="isListEmpty" />

  <q-scroll-area id="contacts-list-scroll" ref="contactsScrollArea" :thumb-style="{ width: '5px' }" class="contacts__list col full-height">
    <AppPullRefresh :refresh-action="reloadContactsData">
      <div class="contacts__loader contacts__loader_initial" v-if="isInitialListLoading">
        <q-spinner-dots color="primary" size="40px" />
      </div>
      <q-virtual-scroll
        v-else-if="!isListEmpty"
        ref="contactsVirtualScroll"
        :virtual-scroll-item-size="64"
        :virtual-scroll-slice-size="24"
        :items="contactsList"
        scroll-target="#contacts-list-scroll > .scroll"
      >
        <template v-slot="{ item }">
          <ContactItem
            :key="item.UUID"
            class="contact"
            v-touch-hold.mouse="event => longPress(item, event)"
            :contact="item"
            :isSelectMode="isSelectMode"
            :selectItemHandler="selectItem"
          />
        </template>
        <template #after>
          <div
            class="contacts__loader"
            v-intersection="onIntersection"
            v-if="contactsList.length > 0 && !isListEndReached"
          >
            <q-spinner-dots v-if="isLoading" color="primary" size="40px" />
          </div>
        </template>
      </q-virtual-scroll>
    </AppPullRefresh>
  </q-scroll-area>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'pinia'
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
    ...mapState(useContactsStore, ['contactsList', 'contactsPage', 'isLoading', 'currentStorage', 'searchText']),
    ...mapGetters(useContactsStore, ['isContactsListEndReached', 'selectedContacts']),
    isInitialListLoading() {
      return this.isLoading && this.contactsList.length === 0
    },
    isListEmpty() {
      return this.contactsList.length == 0 && !this.isLoading
    },
    isListEndReached() {
      return this.isContactsListEndReached
    },
  },

  created() {
    // Avoid EmptyContacts flash on first paint before mounted fetch starts.
    if (this.contactsList.length === 0) {
      this.setLoadingStatus(true)
    }
  },

  mounted() {
    if (this.contactsList.length === 0) {
      this.asyncGetContacts()
    }
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
      handler: function() {
        this.setLoadingStatus(true)
        this.clearContactList()
        this.asyncGetContacts()
      },
      immediate: false
    },
    searchText() {
      this.setLoadingStatus(true)
      this.asyncGetContacts()
    },
  },

  methods: {
    ...mapActions(useContactsStore, [
      'asyncGetStorages',
      'asyncGetContacts',
      'asyncGetGroups',
      'changeContactsPage',
      'setLoadingStatus',
      'clearContactList',
    ]),
    onIntersection(data) {
      if (!this.isLoading && !this.isListEndReached && data.isIntersecting) {
        this.changeContactsPage(this.contactsPage + 1)
        this.asyncGetContacts()
      }
    },
    async reloadContactsData() {
      this.changeContactsPage(1)
      await this.asyncGetStorages()
      await this.asyncGetContacts()
      await this.asyncGetGroups()
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

<style scoped lang="scss">
.contacts__loader_initial {
  display: flex;
  justify-content: center;
  padding: 16px 0;
}
</style>
