<template>
  <main-layout>
    <q-scroll-area :thumb-style="{width: '5px'}" class="contacts__list q-px-lg q-py-lg">
      <div class="flex column justify-center align-center" v-if="!loadingStatus">
        <q-avatar rounded color="light-blue-1" text-color="blue-5" size="md" class="q-mx-auto q-mb-sm">
          {{ contactFirstLetter }}
        </q-avatar>

        <div class="q-mx-auto text-subtitle1">
          {{ currentContact.FullName }}
        </div>

        <q-list>
          <contact-info-list-item :caption="$t('COREWEBCLIENT.LABEL_EMAIL')" icon="ContactEmailIcon" :value="currentContact.ViewEmail" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" icon="ContactPhoneIcon" :value="currentContact.PersonalPhone" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_SKYPE')" icon="ContactSkypeIcon" :value="currentContact.Skype" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_ADDRESS')" icon="ContactAddressIcon" :value="currentContact.PersonalAddress" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_FACEBOOK')" icon="ContactFacebookIcon" :value="currentContact.Facebook" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_FIRST_NAME')" icon="ContactNameIcon" :value="currentContact.FirstName" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_LAST_NAME')" icon="ContactNameIcon" :value="currentContact.LastName" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_NICK_NAME')" icon="ContactNameIcon" :value="currentContact.NickName" />

          <q-separator spaced />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_HOME') }}</div>
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" icon="ContactMapIcon" :value="currentContact.PersonalState" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" icon="ContactZipIcon" :value="currentContact.PersonalZip" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" icon="ContactCountryIcon" :value="currentContact.PersonalCountry" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" icon="ContactWebPageIcon" :value="currentContact.PersonalWeb" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_FAX')" icon="ContactWebPageIcon" :value="currentContact.PersonalFax" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" icon="ContactPhoneIcon" :value="currentContact.PersonalPhone" />

          <q-separator spaced />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_BUSINESS') }}</div>
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_BUSINESS_EMAIL')" icon="ContactEmailIcon" :value="currentContact.BusinessEmail" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" icon="ContactCountryIcon" :value="currentContact.BusinessCountry" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" icon="ContactWebPageIcon" :value="currentContact.BusinessWeb" />

          <q-separator spaced />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_OTHER') }}</div>
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_OTHER_EMAIL')" icon="ContactEmailIcon" :value="currentContact.OtherEmail" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_BIRTHDAY')" icon="ContactBirthdayIcon" :value="contactBirthday" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_NOTES')" icon="ContactNotesIcon" :value="currentContact.Notes" />

          <q-separator spaced />

          <div class="q-mt-lg text-body1">{{ $t('CONTACTSWEBCLIENT.HEADING_GROUPS') }}</div>
          <contact-info-list-item v-for="groupId in currentContact.GroupUUIDs" icon="HashtagIcon" :value="groupNameById(groupId)" />
        </q-list>
      </div>
    </q-scroll-area>

    <div class="q-mt-xl flex items-center justify-center" v-if="loadingStatus">
      <q-circular-progress
        indeterminate
        size="40px"
        color="primary"
        class="q-ma-md"
      />
    </div>
  </main-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import MainLayout from 'src/layouts/MainLayout'
import ContactInfoListItem from '../components/ContactInfoListItem';

export default {
  name: 'ContactInfo',

  components: {
    MainLayout,
    ContactInfoListItem,
  },

  mounted() {
    const UUID = this.$route.params.id
    this.asyncGetContact({ UUID })
  },

  computed: {
    ...mapGetters('contactsmobile', [
      'currentContact',
      'groupsList',
      'loadingStatus',
    ]),
    contactFirstLetter() {
      const firstLetter = this.currentContact.FullName?.[0] || this.currentContact.ViewEmail?.[0]
      return firstLetter ? firstLetter.toUpperCase() : ''
    },
    contactBirthday() {
      return `${this.currentContact.BirthDay}.${this.currentContact.BirthMonth}.${this.currentContact.BirthYear}`
    }
  },

  methods: {
    ...mapActions('contactsmobile', ['asyncGetContact']),
    groupNameById(groupId) {
      return this.groupsList.find((group) => group.UUID === groupId).Name
    }
  },
}
</script>
