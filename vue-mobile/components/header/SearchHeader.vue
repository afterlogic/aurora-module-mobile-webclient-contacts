<template>
  <div>
    <q-toolbar class="app-header search-toolbar">
      <div class="col">
        <q-btn @click="onCloseSearch" color="black" icon="close" flat round dense />
      </div>
      <div class="col flex column text-center text-black search">
        <span class="header-title">
          {{ $t('CONTACTSMOBILEWEBCLIENT.LABEL_SEARCH') }}
        </span>
        <span class="header-caption">
          {{ storageName }}
        </span>
      </div>
      <div class="col"></div>
    </q-toolbar>
    <q-toolbar class="flex row search-toolbar-input">
      <q-input
        v-model="text"
        :style="{ height: '48px' }"
        :input-style="{ height: '48px' }"
        :placeholder="$t('CONTACTSMOBILEWEBCLIENT.LABEL_SEARCH')"
        autofocus
        borderless
        outlined
        class="col-12 q-px-md search"
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
