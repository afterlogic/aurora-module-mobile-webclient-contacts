<template>
  <div class="contact flex q-my-lg" @click="selectContact">
    <div class="contact__avatar flex justify-center q-ml-lg q-mr-md">
      <div class="contact__avatar-title flex items-center justify-center">
        {{ contactFirstLetter }}
      </div>
    </div>
    <q-item-section>
      <q-item-label class="text-dark no-wrap contact__name flex items-center">
       <span class="contact__name-text"> {{ contact.FullName || 'No Name' }}</span>
       <span v-if="isItsMe" class="contact__name-me q-ml-sm">(It's me)</span>
       <div>
         <storage-icon v-if="currentStorage.Id === 'all'" class="q-mx-sm" color="#969494" :icon="storageIcon" />
       </div>
      </q-item-label>
      <q-item-label class="text-secondary contact__email">
        {{ contact.ViewEmail }}
      </q-item-label>
    </q-item-section>
    <div class="q-mr-lg flex items-center" v-if="contact.HasPgpPublicKey">
      <key-icon />
    </div>
  </div>
</template>

<script>
import KeyIcon from "src/components/common/icons/KeyIcon";
import StorageIcon from "./icons/StorageIcon";

import { mapGetters } from 'vuex'

export default {
  name: 'ContactItem',
  props: {
    contact: { type: Object, default: null },
  },
  components: {
    KeyIcon,
    StorageIcon
  },
  computed: {
    ...mapGetters('contactsmobile', ['currentStorage']),
    ...mapGetters('core', ['userPublicId']),
    contactFirstLetter() {
      const firstLetter = this.contact.FullName?.[0] || this.contact.ViewEmail?.[0]
      return firstLetter ? firstLetter.toUpperCase() : ''
    },
    isItsMe() {
      return this.userPublicId === this.contact.ViewEmail
    },
    storageIcon() {
      return this.contact.Storage[0].toUpperCase() + this.contact.Storage.slice(1)
    },
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
  padding: 0;
  width: 100vw;
  &__name {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px !important;
    letter-spacing: 0.3px;
  }
  &__name-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__name-me {
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 16px;
    color: #469CF8;
    letter-spacing: 0.3px;
  }
  &__email {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__avatar {
    width: 32px;
    height: 32px;
    background: rgba(178, 216, 255, 0.25);
    border-radius: 8px;
  }
  &__avatar-title {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.3px;
    color: #469CF8;
  }
}
</style>
