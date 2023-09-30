<template>
  <q-scroll-area :thumb-style="{width: '5px'}" class="contacts__list">
    <q-form class="q-px-lg q-py-md">
      <AppInput v-model="group.name" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_GROUP_NAME')" class="q-mb-sm" />

      <AppToggle :label="$t('CONTACTSWEBCLIENT.LABEL_GROUP_IS_COMPANY')" v-model="group.isOrganization" :value="group.isOrganization" />

      <template v-if="group.isOrganization">
        <AppInput v-model="group.email" :placeholder="$t('COREWEBCLIENT.LABEL_EMAIL')" />
        <AppInput v-model="group.company" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_COMPANY')" />
        <AppInput v-model="group.country" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" />
        <AppInput v-model="group.state" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" />
        <AppInput v-model="group.city" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_CITY')" />
        <AppInput v-model="group.street" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_STREET')" />
        <AppInput v-model="group.zip" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" />
        <AppInput v-model="group.phone" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" />
        <AppInput v-model="group.fax" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_FAX')" />
        <AppInput v-model="group.web" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" />
      </template>
    </q-form>
  </q-scroll-area>
</template>

<script>
import { mapGetters, mapActions } from 'pinia'
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
    ...mapGetters(useContactsStore, [
      'currentGroup',
    ]),
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
              this.group[key] = group[key] === '1' ? true : false || false
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
    ...mapActions(useContactsStore, [
      'asyncCreateGroup',
      'asyncEditGroup',
      'setCurrentGroup',
      'updateGroup',
    ]),
    async onSaveGroup() {
      const group = {}
      
      for (const [key, value] of Object.entries(this.group)) {
        group[`${key[0].toUpperCase()}${key.slice(1)}`] = this.group[key] || ''
      }

      group.IsOrganization = group.IsOrganization ? '1' : '0'

      if (this.isNewGroup) {
        const result = await this.asyncCreateGroup({ Group: group })
        if (result) {
          this.setCurrentGroup(null)
          this.$router.replace({ name: 'group-view', params: { groupId: result } })
        }
      } else {
        const result = await this.asyncEditGroup({ Group: group })
        if (result) {
          this.updateGroup(group)
          this.$router.back()
        }
      }
    }
  },
}
</script>
