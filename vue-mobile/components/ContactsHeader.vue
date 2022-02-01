<template>
  <q-toolbar style="height: 55px" class="justify-between">
    <q-btn
        :ripple="false"
        dense
        class="text-bold text-black"
        no-caps
        flat
        :label="$t('CONTACTSWEBCLIENT.HEADING_BROWSER_TAB')"
        style="font-size: 17px;"
    />
  </q-toolbar>
</template>

<script>
export default {
  name: 'ContactsHeader',
}
</script>

<style scoped></style>
