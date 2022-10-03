<template>
  <div class="contacts__drawer-head q-pl-lg" style="padding-top: 32px">
    {{$t('CONTACTSMOBILEWEBCLIENT.LABEL_STORAGES')}}
  </div>
  <q-separator spaced class="separator-color"/>

  <div>
    <storage-item
        v-for="storage in storageList"
        :active="storage.Id === currentStorage.Id"
        :key="storage"
        :storage="storage"
    />
  </div>

  <q-separator spaced class="separator-color"/>

  <div class="flex items-center justify-between q-pa-md q-pl-lg">
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

  <div>
    <group-item
        v-for="group in groupsList"
        :active="group.UUID === currentGroup.UUID"
        :key="group"
        :group="group"
    />
  </div>
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
<style>
.contacts__drawer-head {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 25px;
  color: #969494;
}
.separator-color {
  background: #F6F6F6;
}
</style>
