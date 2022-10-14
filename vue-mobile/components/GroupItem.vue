<template>
  <q-item class="q-px-lg" clickable v-ripple @click.prevent="selectGroup">
    <q-item-section side>
      <group-icon />
    </q-item-section>
    <q-item-section class="text-subtitle1">
      {{ group.Name }}
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'
import eventBus from "src/event-bus";

import GroupIcon from './icons/GroupIcon'

export default {
  name: 'GroupItem',
  components: {
    GroupIcon,
  },
  props: {
    group: { type: Object, default: null },
  },
  methods: {
    ...mapActions('contactsmobile', [
      // 'asyncGetContacts',
      'setCurrentGroup',
    ]),
    async selectGroup() {
      this.setCurrentGroup(this.group)
      eventBus.$emit('closeDrawer')
      // await this.asyncGetContacts()
    },
  },
}
</script>
