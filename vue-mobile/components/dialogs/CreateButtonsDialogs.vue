<template>
  <q-dialog
      transition-show="fade"
      transition-hide="fade"
      transition-duration="200"
      v-model="openDialog"
  >
    <div class="flex column q-pa-sm absolute create-buttons">
      <create-contact-group-icon @click="addGroup" />
      <create-contact-icon @click="addContact" />
    </div>
  </q-dialog>
</template>

<script>
import CreateContactGroupIcon from "../icons/create/CreateContactGroupIcon";
import CreateContactIcon from "../icons/create/CreateContactIcon";

export default {
  name: "CreateButtonsDialogs",
  components: {
    CreateContactGroupIcon,
    CreateContactIcon
  },
  data: () => ({
    openDialog: false,
  }),
  methods: {
    async addContact() {
      await this.$router.push({ path: `/add_contact` })
    },
    async addGroup() {
      await this.$router.push({ path: `/add_group` })
    },
  }
}
</script>

<style scoped>
.create-buttons {
  box-shadow: none;
  position: fixed;
  z-index: 1;
  bottom: 138px;
  right: 9px;
  margin-right: 2px;
}
</style>
