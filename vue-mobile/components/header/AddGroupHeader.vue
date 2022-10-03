<template>
  <q-toolbar style="height: 55px;" class="justify-between">
    <q-btn
      flat
      size="15px"
      color="black"
      round
      dense
      icon="close"
      @click="onPreviousPage"
    />

    <span class="header-title text-black text-center">
      {{ $t('CONTACTSMOBILEWEBCLIENT.HEADING_ADD_GROUP') }}
    </span>

    <q-btn
      flat
      size="12px"
      color="blue"
      dense
      no-caps
      @click="onCreateGroup"
    >
      {{ $t('COREWEBCLIENT.ACTION_SAVE') }}
    </q-btn>
  </q-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddGroupHeader',
  computed: {
    ...mapGetters('contactsmobile', ['contactsList']),
  },
  // watch: {
  //   'contactsList.length'() {
  //     this.onPreviousPage()
  //   },
  // },
  methods: {
    ...mapActions('contactsmobile', ['asyncCreateGroup']),
    onPreviousPage() {
      this.$router.back()
    },
    onCreateGroup() {
      this.asyncCreateGroup()
      this.onPreviousPage()
    }
  },
};
</script>
