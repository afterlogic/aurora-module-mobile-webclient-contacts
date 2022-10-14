<template>
  <q-page-sticky position="bottom-right" :offset="[20, 18]">
    <q-fab icon="add" color="blue" direction="up">
      <q-fab-action color="blue" @click="addContact" icon="person_add" />
      <q-fab-action color="blue" @click="addGroup" icon="group_add" />
    </q-fab>
  </q-page-sticky>
</template>

<script>

export default {
  name: 'CreateButton',
  methods: {
    async addContact() {
      await this.$router.push({ path: `/create-contact` })
    },
    async addGroup() {
      await this.$router.push({ path: `/create-group` })
    },
  },
}
</script>
