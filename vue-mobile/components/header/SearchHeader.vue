<template>
  <q-toolbar class="search-toolbar">
    <q-card-actions align="left" class="col-3">
      <q-btn
        flat
        size="15px"
        color="black"
        round
        dense
        icon="close"
        @click="onCloseSearch"
      />
    </q-card-actions>
    <div class="flex column text-center text-black col-6 search">
      <span class="text-bold" style="font-size: 17px;">
        {{ $t('CONTACTSMOBILEWEBCLIENT.LABEL_SEARCH') }}
      </span
      >
      <span class="text-caption text-blue-grey-12" style="margin-top: -5px">
        {{ storageName }}
      </span>
    </div>
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
      model-value=""
      debounce="400"
    />
  </q-toolbar>
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
      return this.currentStorage.Id
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

<style>
.search .q-field__control {
  height: 48px;
}
.search-toolbar {
  height: 55px;
  font-size: 16px;
  padding: 0
}
.search-toolbar-input {
  height: 74px;
  font-size: 16px;
  padding: 0
}
</style>
