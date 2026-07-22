<template>
  <q-scroll-area
    data-test-id="contacts-group-edit"
    :thumb-style="{width: '5px'}"
    class="contacts__list full-height edit-group__scroll"
  >
    <q-form
      class="q-px-lg q-py-md edit-group__form"
      @touchstart.passive="onFormTouchStart"
      @touchmove.passive="onFormTouchMove"
    >
      <div data-test-id="contacts-group-edit-name">
        <AppInput
          dense
          v-model="group.name"
          :label="$t('CONTACTSWEBCLIENT.LABEL_GROUP_NAME')"
          class="q-mb-xs contact__form-input"
        />
      </div>

      <AppToggle :label="$t('CONTACTSWEBCLIENT.LABEL_GROUP_IS_COMPANY')" v-model="group.isOrganization" :value="group.isOrganization" />

      <template v-if="group.isOrganization">
        <AppInput dense v-model="group.email" :label="$t('COREWEBCLIENT.LABEL_EMAIL')" class="q-mb-xs contact__form-input" />
        <AppInput dense v-model="group.company" :label="$t('CONTACTSWEBCLIENT.LABEL_COMPANY')" class="q-mb-xs contact__form-input" />
        <AppInput dense v-model="group.country" :label="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" class="q-mb-xs contact__form-input" />
        <AppInput dense v-model="group.state" :label="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" class="q-mb-xs contact__form-input" />
        <AppInput dense v-model="group.city" :label="$t('CONTACTSWEBCLIENT.LABEL_CITY')" class="q-mb-xs contact__form-input" />
        <AppInput dense v-model="group.street" :label="$t('CONTACTSWEBCLIENT.LABEL_STREET')" class="q-mb-xs contact__form-input" />
        <AppInput dense v-model="group.zip" :label="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" class="q-mb-xs contact__form-input" />
        <AppInput dense v-model="group.phone" :label="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" class="q-mb-xs contact__form-input" />
        <AppInput dense v-model="group.fax" :label="$t('CONTACTSWEBCLIENT.LABEL_FAX')" class="q-mb-xs contact__form-input" />
        <AppInput dense v-model="group.web" :label="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" class="q-mb-xs contact__form-input" />
      </template>
    </q-form>
  </q-scroll-area>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'pinia'
import { useContactsStore } from '../store/index-pinia.js'

import eventBus from 'src/event-bus'

import AppInput from 'src/components/common/AppInput'
import AppToggle from 'src/components/common/AppToggle'

export default {
  name: 'EditGroup',

  components: {
    AppInput,
    AppToggle
  },

  data() {
    return {
      touchStartY: 0,
      group: {
        UUID: '',
        name: '',
        isOrganization: false,
        email: '',
        country: '',
        city: '',
        company: '',
        fax: '',
        phone: '',
        state: '',
        street: '',
        web: '',
        zip: '',
      }
    }
  },

  computed: {
    ...mapState(useContactsStore, ['currentGroup', 'groupsList']),
    isNewGroup() {
      return this.$router.currentRoute.value.name === 'group-create'
    },
  },

  mounted() {
    eventBus.$on('ContactsMobileWebclient::saveGroup', this.onSaveGroup)
  },
  unmounted() {
    eventBus.$off('ContactsMobileWebclient::saveGroup', this.onSaveGroup)
  },

  watch: {
    currentGroup: {
      handler(group) {
        if (group && !this.isNewGroup) {
          for (const [key, value] of Object.entries(this.group)) {
            if (key === 'isOrganization') {
              this.group[key] = !!group[key] ? true : false
            } else {
              this.group[key] = group[key] || ''
            }
          }
        }
      },
      immediate: true
    },
  },

  methods: {
    onFormTouchStart(event) {
      this.touchStartY = event.touches[0].clientY
    },
    onFormTouchMove(event) {
      if (Math.abs(event.touches[0].clientY - this.touchStartY) < 8) {
        return
      }

      const activeElement = document.activeElement
      if (!activeElement || !this.$el.contains(activeElement)) {
        return
      }

      if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
        activeElement.blur()
      }
    },
    ...mapActions(useContactsStore, [
      'asyncCreateGroup',
      'asyncEditGroup',
      'asyncGetGroups',
      'setCurrentGroup',
    ]),
    async onSaveGroup() {
      const groupForSave = {}
      
      // capitalize first letter of each property
      for (const [key, value] of Object.entries(this.group)) {
        groupForSave[`${key[0].toUpperCase()}${key.slice(1)}`] = this.group[key] || ''
      }

      groupForSave.IsOrganization = this.group.isOrganization ? '1' : '0'

      if (this.isNewGroup) {
        const result = await this.asyncCreateGroup({ Group: groupForSave })
        // CreateGroup returns { UUID, ETag } (same as desktop), not a bare UUID string.
        const groupId = typeof result === 'string' ? result : result?.UUID
        if (groupId) {
          await this.asyncGetGroups()
          const group = this.groupsList.find((item) => item.UUID === groupId)
          this.setCurrentGroup(group || { ...this.group, UUID: groupId })
          this.$router.replace({ name: 'group-view', params: { groupId } })
        }
      } else {
        const result = await this.asyncEditGroup({ Group: groupForSave })
        if (result) {
          await this.asyncGetGroups()
          const group = this.groupsList.find((item) => item.UUID === this.group.UUID)
          this.setCurrentGroup(group || null)
          this.$router.back()
        }
      }
    }
  },
}
</script>

<style lang="scss">
.edit-group__form {
  .q-field {
    -webkit-tap-highlight-color: transparent;
  }

  .q-field__label {
    font-size: 14px !important;
    color: #969494 !important;
  }

  .q-field--filled .q-field__control {
    background: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    padding: 0;
  }

  .q-field--with-bottom {
    padding: 0;
  }

  .q-field__control {
    height: 45px;
  }
}

.edit-group__scroll .q-scrollarea__content {
  touch-action: pan-y;
}
</style>
