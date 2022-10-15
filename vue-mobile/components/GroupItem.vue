<template>
  <q-item class="group" :active="active" clickable v-ripple @click.prevent="selectGroup">
    <q-item-section side>
      <group-icon />
    </q-item-section>
    <q-item-section class="group__name">
      {{ group.name }}
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
    active: { type: Boolean, default: false },
  },
  methods: {
    ...mapActions('contactsmobile', [
      // 'asyncGetContacts',
      'setCurrentGroup',
    ]),
    async selectGroup() {
      // this.setCurrentGroup(this.group)
      this.$router.push(`/contacts/group/${this.group.UUID}`)
      eventBus.$emit('closeDrawer')
      // await this.asyncGetContacts()
    },
  },
}
</script>

<style lang="scss" scoped>
.group {
  padding: 0 24px;

  &__name {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.3px;
  }
}
</style>
