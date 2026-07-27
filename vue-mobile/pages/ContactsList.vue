<template>
  <div class="column fit" data-test-id="contacts-list">
  <AppListLoader v-if="isInitialListLoading" initial class="col" />
  <EmptyContacts v-else-if="isListEmpty" class="col" />

  <q-scroll-area
    v-else
    id="contacts-list-scroll"
    ref="contactsScrollArea"
    :thumb-style="{ width: '5px' }"
    class="contacts__list col full-height"
  >
    <AppPullRefresh :refresh-action="reloadContactsData">
      <q-virtual-scroll
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
            v-intersection="onIntersection"
            v-if="contactsList.length > 0 && !isListEndReached"
          >
            <AppListLoader v-if="isLoading" />
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
import AppListLoader from 'src/components/common/AppListLoader'

export default {
  name: 'ContactsList',

  components: {
    ContactItem,
    EmptyContacts,
    AppPullRefresh,
    AppListLoader,
  },

  data() {
    return {
      isSelectMode: false,
      // Ignore the click that follows mouse long-press (hold → mouseup → click).
      skipSelectToggleUntil: 0,
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
      if (Date.now() < this.skipSelectToggleUntil) {
        return
      }
      contact.isSelected = !contact.isSelected
    },
    longPress(contact) {
      this.isSelectMode = true
      contact.isSelected = true
      // Quasar touch-hold + Playwright mouse.up still emit a click that would
      // toggle the just-selected item off before SelectHeader can appear.
      this.skipSelectToggleUntil = Date.now() + 500
    },
  },
}
</script>
