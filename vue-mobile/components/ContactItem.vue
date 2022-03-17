<template>
  <q-item class="contact" clickable v-ripple @click="selectContact">
    <q-item-section avatar class="contact__avatar q-ml-lg">
      <q-avatar rounded color="light-blue-1" text-color="blue-5" size="md">
        {{ contactFirstSymbol }}
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-dark contact__name">
        {{ contact.FullName || 'No Name' }}
      </q-item-label>
      <q-item-label class="text-secondary contact__email">
        <div>{{ contact.ViewEmail }}</div>
      </q-item-label>
    </q-item-section>
    <q-item-section class="q-mr-lg" avatar side v-if="contact.HasPgpPublicKey">
      <key-icon />
    </q-item-section>
  </q-item>
</template>

<script>
import KeyIcon from "src/components/common/icons/KeyIcon";

export default {
  name: 'ContactItem',
  props: {
    contact: { type: Object, default: null },
  },
  components: {
    KeyIcon
  },
  computed: {
    contactFirstSymbol() {
      const firstSymbol = this.contact.FullName[0] || this.contact.ViewEmail[0]
      return firstSymbol.toUpperCase()
    }
  },
  methods: {
    async selectContact() {
      await this.$router.push({ path: `/contact/${this.contact.UUID}` })
    },
  },
}
</script>

<style lang="scss" scoped>
.contact {
  height: 32px;
  padding: 0;
  margin: 16px 0;
  width: 100vw;
  &__name {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px !important;
    letter-spacing: 0.3px;
    white-space: nowrap;
    overflow: hidden;
  }
  &__email {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 10px !important;
    overflow: hidden;
  }
  &__avatar {
    min-width: 32px;
  }
}
</style>
