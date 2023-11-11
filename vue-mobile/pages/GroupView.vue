<template>
  <q-scroll-area :thumb-style="{width: '5px'}" class="contacts__list">
    <q-form class="q-px-lg q-py-md">
      <ContactInfoField :value="group.name" icon="ContactNameIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_GROUP_NAME')" class="q-mb-sm" />

      <template v-if="group.isOrganization">
        <ContactInfoField :value="group.email" icon="ContactEmailIcon" :caption="$t('COREWEBCLIENT.LABEL_EMAIL')"  />
        <ContactInfoField :value="group.company" icon="" :caption="$t('CONTACTSWEBCLIENT.LABEL_COMPANY')" />
        <ContactInfoField :value="group.country" icon="ContactCountryIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" />
        <ContactInfoField :value="group.state" icon="ContactMapIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" />
        <ContactInfoField :value="group.city" icon="" :caption="$t('CONTACTSWEBCLIENT.LABEL_CITY')" />
        <ContactInfoField :value="group.street" icon="ContactAddressIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_STREET')" />
        <ContactInfoField :value="group.zip" icon="ContactZipIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" />
        <ContactInfoField :value="group.phone" icon="ContactPhoneIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" />
        <ContactInfoField :value="group.fax" icon="ContactFaxIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_FAX')" />
        <ContactInfoField :value="group.web" icon="ContactWebPageIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" />
      </template>
    </q-form>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'pinia'
import { useContactsStore } from '../store/index-pinia.js'

import ContactInfoField from '../components/ContactInfoField'

export default {
  name: 'GroupView',

  components: {
    ContactInfoField,
  },

  data() {
    return {
      group: {
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

  watch: {
    currentGroup: {
      handler(group) {
        if (group) {
          for (const [key, value] of Object.entries(this.group)) {
            this.group[key] = group[key] || ''
          }
        }
      },
      immediate: true
    },
  },

  computed: {
    ...mapGetters(useContactsStore, [
      'currentGroup',
    ]),
  },
}
</script>
