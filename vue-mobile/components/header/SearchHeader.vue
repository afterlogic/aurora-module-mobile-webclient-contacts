<template>
  <div>
    <q-toolbar class="app-header search-toolbar">
      <div class="col app-header__left">
        <q-btn @click="onCloseSearch" color="black" icon="close" flat round dense />
      </div>
      <div class="col app-header__title">
        <span class="app-header__title-main" v-t="'COREMOBILEWEBCLIENT.LABEL_SEARCH'" />
        <span class="app-header__title-secondary">
          {{ storageName }}
        </span>
      </div>
      <div class="col app-header__right"></div>
    </q-toolbar>
    <q-toolbar class="search-toolbar__field">
      <q-input
        v-model="text"
        :placeholder="$t('COREMOBILEWEBCLIENT.LABEL_SEARCH')"
        autofocus
        borderless
        outlined
        dense
        class="search-toolbar__input"
        debounce="400"
      />
    </q-toolbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'pinia'
import { useContactsStore } from '../../store/index-pinia.js'

export default {
  name: 'SearchHeader',

  data() {
    return {
      text: '',
    }
  },

  computed: {
    ...mapGetters(useContactsStore, ['currentStorage', 'currentGroup', 'searchText']),
    storageName() {
      return this.currentStorage?.name || this.currentGroup?.name || ''
    },
  },

  mounted() {
    this.text = this.searchText
  },
  watch: {
    text() {
      this.search()
    },
  },

  methods: {
    ...mapActions(useContactsStore, ['asyncGetContacts', 'changeCurrentHeader', 'changeSearchText']),
    async search() {
      this.changeSearchText(this.text)
    },
    async onCloseSearch() {
      this.changeSearchText('')
      this.changeCurrentHeader('')
    },
  },
}
</script>
