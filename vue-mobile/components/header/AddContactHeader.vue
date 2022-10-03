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

    <span class="text-center text-black header-title">
      {{ $t('CONTACTSMOBILEWEBCLIENT.HEADING_ADD_CONTACT') }}
    </span>

    <q-btn
      flat
      size="12px"
      color="blue"
      dense
      no-caps
      @click="onCreateContact"
    >
      {{ $t('COREWEBCLIENT.ACTION_SAVE') }}
    </q-btn>
  </q-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddContactHeader',
  computed: {
    ...mapGetters('contactsmobile', ['contactsList']),
  },
  // watch: {
  //   'contactsList.length'() {
  //     this.onPreviousPage()
  //   },
  // },
  methods: {
    ...mapActions('contactsmobile', ['asyncCreateContact']),
    onPreviousPage() {
      this.$router.back()
    },
    onCreateContact() {
      this.asyncCreateContact()
      this.onPreviousPage()
    }
  },
};
</script>
