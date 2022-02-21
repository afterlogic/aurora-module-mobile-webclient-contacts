<template>
  <q-page-sticky position="bottom-right" :offset="[20, 18]">
    <q-btn fab icon="add" color="blue" @click="addContact" />
  </q-page-sticky>
</template>

<script>

export default {
  name: 'CreateButton',
  methods: {
    async addContact() {
      await this.$router.push({ path: `/add_contact` })
    },
  },
}
</script>
