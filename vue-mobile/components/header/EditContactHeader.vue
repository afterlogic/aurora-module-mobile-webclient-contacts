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

    <span
        class="text-center text-black header-title"
    >
      {{ $t('CONTACTSWEBCLIENT.HEADING_EDIT_CONTACT') }}
    </span>

    <q-btn
        flat
        size="12px"
        color="blue"
        dense
        no-caps
        @click="onEditContact"
    >
      {{ $t('COREWEBCLIENT.ACTION_SAVE') }}
    </q-btn>
  </q-toolbar>
</template>

<script>
import eventBus from "src/event-bus";

export default {
  name: "EditContactHeader",
  methods: {
    onEditContact() {
      eventBus.$emit('ContactsMobileWebclient::editContact');
      this.onPreviousPage();
    },
    onPreviousPage() {
      this.$router.back()
    },
  }
}
</script>

<style scoped>

</style>
