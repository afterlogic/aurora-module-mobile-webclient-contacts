<template>
  <div>
    <q-toolbar class="app-header search-toolbar">
      <div class="col app-header__left">
        <AppHeaderButton
          data-test-id="contacts-search-close"
          icon="close"
          @click="onCloseSearch"
        />
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
      <div data-test-id="contacts-search-input" class="full-width">
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
      </div>
    </q-toolbar>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'pinia'
import { useContactsStore } from '../../store/index-pinia.js'
import AppHeaderButton from 'src/components/common/AppHeaderButton'

export default {
  name: 'SearchHeader',

  components: {
    AppHeaderButton,
  },

  data() {
    return {
      text: '',
    }
  },

  computed: {
    ...mapState(useContactsStore, ['currentStorage', 'currentGroup', 'searchText']),
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
