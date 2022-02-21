<template>
  <div class="q-pa-md text-grey">
    {{ $t('CONTACTSMOBILEWEBCLIENT.LABEL_STORAGES') }}
  </div>

  <storage-item
    v-for="storage in storageList"
    :active="storage.Id === currentStorage.Id"
    :key="storage"
    :storage="storage"
  />

  <q-separator spaced />

  <div class="flex items-center justify-between q-pa-md">
    <div class="text-grey">
      {{ $t('CONTACTSWEBCLIENT.HEADING_GROUPS') }}
    </div>

    <q-btn
      flat
      size="15px"
      color="blue"
      dense
      icon="add"
      @click="addGroup"
    />
  </div>

  <group-item
    v-for="group in groupsList"
    :active="group.UUID === currentGroup.UUID"
    :key="group"
    :group="group"
  />
</template>

<script>
import { mapGetters } from 'vuex'

import StorageItem from '../components/StorageItem'
import GroupItem from '../components/GroupItem'

export default {
  name: 'DrawerContent',

  components: {
    StorageItem,
    GroupItem,
  },

  computed: {
    ...mapGetters('contactsmobile', [
      'storageList',
      'groupsList',
      'currentStorage',
      'currentGroup',
    ]),
  },

  methods: {
    async addGroup() {
      await this.$router.push({ path: `/add_group` })
    },
  }
};
</script>
