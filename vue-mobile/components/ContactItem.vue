<template>
  <AppItem
    v-if="contact"
    data-test-id="contacts-item"
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
    <q-item-section class="list-item__text contact__text">
      <div class="contact__content">
        <div class="contact__info">
          <q-item-label class="contact__name">
            <span class="contact__name-text">{{ contact.fullName || 'No Name' }}</span>
            <span v-if="isItsMe" class="contact__name-me">(It's me)</span>
            <StorageIcon
              v-if="showStorageIcon"
              class="contact__icon"
              color="#969494"
              :icon="storageIconName"
            />
          </q-item-label>
          <q-item-label class="list-item__text_secondary contact__email">
            {{ contact.email || 'No email address' }}
          </q-item-label>
        </div>
        <span v-if="showPgpKeyIcon" class="contact__pgp-icon">
          <KeyIcon />
        </span>
      </div>
    </q-item-section>
  </AppItem>
</template>

<script>
import KeyIcon from 'src/components/common/icons/KeyIcon'
import StorageIcon from './icons/StorageIcon'
import AppItem from 'src/components/common/AppItem'
import modulesManager from 'src/modules-manager'

import { mapState, mapGetters } from 'pinia'
import { useContactsStore } from '../store/index-pinia.js'
import { useCoreStore } from 'src/stores/index-pinia.js'

const STORAGE_ICON_NAMES = {
  team: 'Team',
  shared: 'Shared',
  collected: 'Collected',
  personal: 'Personal',
}

export default {
  name: 'ContactItem',
  props: {
    contact: { type: Object, default: null },
    isSelectMode: { type: Boolean, default: false },
    selectItemHandler: { type: Function, default: null, require: true },
  },
  components: {
    KeyIcon,
    StorageIcon,
    AppItem,
  },
  computed: {
    ...mapState(useContactsStore, ['currentStorage', 'currentGroup']),
    ...mapGetters(useCoreStore, ['userPublicId']),
    contactFirstLetter() {
      const firstLetter = this.contact.fullName?.[0] || this.contact.email?.[0]
      return firstLetter ? firstLetter.toUpperCase() : ''
    },
    isItsMe() {
      return this.userPublicId === this.contact.email
    },
    isOpenPgpEnabled() {
      return modulesManager.isModuleAvailable('OpenPgpMobileWebclient')
        || modulesManager.isModuleAvailable('OpenPgpWebclient')
    },
    showStorageIcon() {
      return this.currentStorage?.id === 'all' || !!this.currentGroup?.UUID
    },
    showPgpKeyIcon() {
      return this.isOpenPgpEnabled && this.contact.hasPgpPublicKey
    },
    storageIconName() {
      if (this.contact.isTeam) {
        return 'Team'
      }

      const storage = (this.contact.storage || '').toLowerCase()
      return STORAGE_ICON_NAMES[storage] || 'Personal'
    },
  },
  methods: {
    listItemClick(item) {
      if (this.isSelectMode) {
        this.selectItemHandler(item)
      } else {
        this.openContact()
      }
    },
    async openContact() {
      const storageId = this.currentStorage?.id || this.contact?.storage
      if (storageId) {
        await this.$router.push({ name: 'contact-view', 'params': {storageId, 'contactId': this.contact.UUID }})
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.contact {
  &__text {
    min-width: 0;
    flex: 1;
  }

  &__content {
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 0;
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__name {
    display: flex;
    align-items: center;
    min-width: 0;
    overflow: hidden;
    font-size: 16px;
    line-height: 1.2;
    color: #000;
  }

  &__pgp-icon {
    flex-shrink: 0;
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #969494;

    :deep(svg) {
      width: 24px;
      height: 24px;
      display: block;
    }

    :deep(path),
    :deep(circle),
    :deep(rect) {
      stroke: currentColor;
    }
  }

  &__icon {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    margin-left: 6px;

    :deep(svg) {
      width: 16px;
      height: 16px;
    }
  }
  &__name-text {
    min-width: 0;
    flex: 0 1 auto;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__name-me {
    flex-shrink: 0;
    font-size: 10px;
    color: #469CF8;
    margin-left: 8px;
  }
  &__email {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
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
