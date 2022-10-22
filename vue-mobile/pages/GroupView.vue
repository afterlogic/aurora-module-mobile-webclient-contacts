<template>
  <q-scroll-area :thumb-style="{width: '5px'}" class="contacts__list">
    <q-form class="q-px-lg q-py-md">
      <ContactInfoField :value="currentGroup.name" icon="ContactNameIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_GROUP_NAME')" class="q-mb-sm" />
<!-- 
      <template v-if="currentGroup.IsOrganization"> -->
        <ContactInfoField :value="currentGroup.email" icon="ContactEmailIcon" :caption="$t('COREWEBCLIENT.LABEL_EMAIL')"  />
        <ContactInfoField :value="currentGroup.company" icon="" :caption="$t('CONTACTSWEBCLIENT.LABEL_COMPANY')" />
        <ContactInfoField :value="currentGroup.country" icon="ContactCountryIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" />
        <ContactInfoField :value="currentGroup.state" icon="ContactMapIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" />
        <ContactInfoField :value="currentGroup.city" icon="" :caption="$t('CONTACTSWEBCLIENT.LABEL_CITY')" />
        <ContactInfoField :value="currentGroup.street" icon="ContactAddressIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_STREET')" />
        <ContactInfoField :value="currentGroup.zip" icon="ContactZipIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" />
        <ContactInfoField :value="currentGroup.phone" icon="ContactPhoneIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" />
        <ContactInfoField :value="currentGroup.fax" icon="ContactFaxIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_FAX')" />
        <ContactInfoField :value="currentGroup.web" icon="ContactWebPageIcon" :caption="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" />
      <!-- </template> -->
    </q-form>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'

import AppInput from 'src/components/common/AppInput'
import AppToggle from 'src/components/common/AppToggle'

import ContactInfoField from '../components/ContactInfoField'

export default {
  name: 'GroupView',

  components: {
    AppInput,
    AppToggle,
    ContactInfoField,
  },

  computed: {
    ...mapGetters('contactsmobile', [
      'currentGroup',
    ]),
  },

  // watch: {
  //   currentGroup(v) {
  //     console.log('current group', v)
  //   }
  // },
}
</script>
