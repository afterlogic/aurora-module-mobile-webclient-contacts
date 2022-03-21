<template>
  <q-item clickable v-ripple @click.prevent="selectGroup">
    <q-item-section avatar>
      <group-icon />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-subtitle1">
        {{ group.Name }}
      </q-item-label>
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
      'asyncGetContacts',
      'changeCurrentGroup',
    ]),
    async selectGroup() {
      this.changeCurrentGroup(this.group)
      eventBus.$emit('closeDrawer')
      await this.asyncGetContacts()
    },
  },
}
</script>
