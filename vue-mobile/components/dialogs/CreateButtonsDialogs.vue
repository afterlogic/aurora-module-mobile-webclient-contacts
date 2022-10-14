<template>
  <q-dialog
      transition-show="fade"
      transition-hide="fade"
      transition-duration="200"
      v-model="openDialog"
  >
    <div class="flex column absolute create-buttons">
      <div class="create-buttons__item upload-file" @click="addGroup">
        <create-contact-group-icon />
      </div>
      <div class="create-buttons__item create-folder" @click="addContact">
        <create-contact-icon />
      </div>
    </div>
  </q-dialog>
</template>

<script>
import CreateContactGroupIcon from '../icons/create/CreateContactGroupIcon'
import CreateContactIcon from '../icons/create/CreateContactIcon'

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
      this.$emit('closeDialog')
      await this.$router.push({ path: `/contacts/create-contact` })
    },
    async addGroup() {
      this.$emit('closeDialog')
      await this.$router.push({ path: `/contacts/create-group` })
    },
  }
}
</script>

<style lang="scss" scoped>
.create-buttons {
  box-shadow: none;
  position: fixed;
  z-index: 1;
  bottom: 132px;
  right: 16px;
  margin-right: 0px;
  width: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__item {
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    box-shadow: 0 0 10px rgba(28, 133, 231, 0.4);
  }
}
</style>
