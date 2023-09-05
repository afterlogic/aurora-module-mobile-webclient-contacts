<template>
  <app-item
    v-if="contact"
    :item="contact"
    :isSelected="contact.isSelected"
    :isChoice="isSelectMode"
    clickable
    @click="listItemClick(contact)"
    :active="contact.isSelected"
    >    
    <q-item-section v-if="!isSelectMode" class="contact__avatar" side>
      <div class="contact__avatar-title">
        {{ contactFirstLetter }}
      </div>
    </q-item-section>
    <q-item-section class="list-item__text">
      <q-item-label class="list-item__text_primary contact__name">
        <span class="contact__name-text"> {{ contact.fullName || 'No Name' }}</span>
        <span v-if="isItsMe" class="contact__name-me">(It's me)</span>
        <storage-icon v-if="currentStorage?.id === 'all'" class="contact__storage-type" color="#969494" :icon="storageIcon" />
      </q-item-label>
      <q-item-label class="list-item__text_secondary contact__email">
        {{ contact.email || 'No email address' }}
      </q-item-label>
    </q-item-section>
    <div class="q-mr-lg flex items-center" v-if="contact.hasPgpPublicKey">
      <key-icon />
    </div>
  </app-item>
</template>

<script>
import KeyIcon from 'src/components/common/icons/KeyIcon'
import StorageIcon from './icons/StorageIcon'
import AppItem from 'src/components/common/AppItem'

import { mapGetters } from 'vuex'

export default {
  name: 'ContactItem',
  props: {
    contact: { type: Object, default: null },
    isSelectMode: { type: Boolean, default: false },
    selectContact: { type: Function, default: null, require: true },
  },
  components: {
    KeyIcon,
    StorageIcon,
    AppItem
  },
  computed: {
    ...mapGetters('contactsmobile', ['currentStorage']),
    ...mapGetters('core', ['userPublicId']),
    contactFirstLetter() {
      const firstLetter = this.contact.fullName?.[0] || this.contact.email?.[0]
      return firstLetter ? firstLetter.toUpperCase() : ''
    },
    isItsMe() {
      return this.userPublicId === this.contact.email
    },
    storageIcon() {
      return this.contact.storage[0].toUpperCase() + this.contact.storage.slice(1)
    },
  },
  methods: {
    listItemClick(item) {
      if (this.isSelectMode) {
        this.selectContact(item)
      } else {
        this.openContact()
      }
    },
    async openContact() {
      const storageId = this.currentStorage?.id || this.contact?.storage
      if (storageId) {
        await this.$router.push({ path: `/contacts/${storageId}/${this.contact.UUID}` })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.contact {

  &__name {
    display: flex;
    align-items: center;
  }
  &__name-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__name-me {
    font-size: 10px;
    color: #469CF8;
    margin-left: 8px;
  }
  &__storage-type {
    margin-left: 8px;
  }
  &__email {
 
  }
  &__avatar {
    width: 32px;
    height: 32px;
    background: rgba(178, 216, 255, 0.25);
    border-radius: 8px;
    padding-right: 0px !important;
    display: flex;
    align-items: center;
    align-self: center;
    justify-content: center;
    margin-right: 16px;
  }
  &__avatar-title {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 1;
    color: #469CF8;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #000;
    }
  }
}
</style>
