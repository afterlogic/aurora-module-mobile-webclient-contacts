<template>
  <div>
    <div class="contacts__drawer-head q-pl-lg" style="padding-top: 32px">
      {{$t('CONTACTSMOBILEWEBCLIENT.LABEL_STORAGES')}}
    </div>
    <q-separator spaced class="separator-color"/>

    <div>
      <storage-item
        v-for="storage in storageListToDisplay"
        :key="storage.id"
        :active="storage.id === currentStorage?.id"
        :storage="storage"
      />
    </div>

    <q-separator spaced class="separator-color"/>

    <div class="flex items-center justify-between q-pa-md q-pl-lg">
      <div class="text-grey">
        {{ $t('CONTACTSWEBCLIENT.HEADING_GROUPS') }}
      </div>

      <q-btn icon="add" @click="addGroup" size="15px" color="blue" flat dense />
    </div>

    <GroupItem
      v-for="group in groupsList"
      :key="group.UUID"
      :active="group.UUID === currentGroup?.UUID"
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
    storageListToDisplay () {
      return this.storageList.filter(item => item.display === true)
    },
  },

  methods: {
    addGroup() {
      this.$router.push({ name: 'group-create' })
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
