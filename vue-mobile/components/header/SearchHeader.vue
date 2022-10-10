<template>
  <div>
    <q-toolbar class="app-header search-toolbar">
      <div class="col app-header__left">
        <q-btn @click="onCloseSearch" color="black" icon="close" flat round dense />
      </div>
      <div class="col app-header__title">
        <span class="app-header__title-main">
          {{ $t('CONTACTSMOBILEWEBCLIENT.LABEL_SEARCH') }}
        </span>
        <span class="app-header__title-secondary">
          {{ storageName }}
        </span>
      </div>
      <div class="col app-header__right"></div>
    </q-toolbar>
    <q-toolbar class="search-toolbar__field">
      <q-input
        v-model="text"
        :placeholder="$t('CONTACTSMOBILEWEBCLIENT.LABEL_SEARCH')"
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SearchHeader',

  data() {
    return {
      text: '',
    }
  },

  computed: {
    ...mapGetters('contactsmobile', ['currentStorage', 'searchText']),
    storageName() {
      return this.currentStorage.name || ''
    },
  },

  mounted() {
    this.text = this.searchText
  },
  watch: {
    text() {
      this.search()
    }
  },

  methods: {
    ...mapActions('contactsmobile', [
      'asyncGetContacts',
      'changeCurrentHeader',
      'changeSearchText'
    ]),
    async search() {
      this.changeSearchText(this.text)
      await this.asyncGetContacts()
    },
    async onCloseSearch() {
      this.changeSearchText('')
      this.changeCurrentHeader('')
      await this.asyncGetContacts()
    },
  },
}
</script>
