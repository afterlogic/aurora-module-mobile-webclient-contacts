<template>
  <q-item clickable v-ripple @click="selectContact">
    <q-item-section avatar class="contact__avatar">
      <q-avatar rounded color="light-blue-1" text-color="blue-5" size="md">
        {{ contact.FullName[0] || contact.ViewEmail[0] }}
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-subtitle1 text-dark contact__name">
        {{ contact.FullName }}
      </q-item-label>
      <q-item-label class="text-secondary contact__email">
        <div>{{ contact.ViewEmail }}</div>
      </q-item-label>
    </q-item-section>
    <q-item-section avatar side v-if="contact.HasPgpPublicKey">
      <q-btn
        size="14px"
        color="grey"
        flat
        round
        icon="key"
      />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'ContactItem',
  props: {
    contact: { type: Object, default: null },
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
  min-height: unset;
  margin: 24px;
  padding: 0;
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
  }
  &__avatar {
    min-width: 32px;
  }
}
</style>
