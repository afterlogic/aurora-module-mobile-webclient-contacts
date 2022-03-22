<template>
  <main-layout>
    <q-scroll-area :thumb-style="{width: '5px'}" class="contacts__list q-pl-lg q-py-lg">
      <div class="flex column justify-center align-center" v-if="!loadingStatus">
        <div class="q-pr-lg flex justify-center">
          <div class="q-mx-auto q-mb-sm contact__avatar flex items-center justify-center">
            <div class="contact__avatar-title">{{ contactFirstLetter }}</div>
          </div>
        </div>

        <div class="q-mx-auto text-subtitle1 q-pr-lg q-pb-lg">
          {{ currentContact.FullName || "No Name" }}
        </div>

        <q-list>
          <contact-info-list-item :caption="$t('COREWEBCLIENT.LABEL_EMAIL')" icon="ContactEmailIcon" item-action-icon="MailIcon" :value="currentContact.ViewEmail" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" icon="ContactPhoneIcon" item-action-icon="PhoneIcon" :value="currentContact.PersonalPhone" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_SKYPE')" icon="ContactSkypeIcon" :value="currentContact.Skype" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_ADDRESS')" icon="ContactAddressIcon" :value="currentContact.PersonalAddress" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_FACEBOOK')" icon="ContactFacebookIcon" :value="currentContact.Facebook" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_FIRST_NAME')" icon="ContactNameIcon" :value="currentContact.FirstName" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_LAST_NAME')" icon="ContactNameIcon" :value="currentContact.LastName" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_NICK_NAME')" icon="ContactNameIcon" :value="currentContact.NickName" />

          <q-separator spaced />

          <div class="q-mt-lg q-pb-sm contact__title">{{ $t('CONTACTSWEBCLIENT.HEADING_HOME') }}</div>
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" icon="ContactMapIcon" :value="currentContact.PersonalState" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" icon="ContactZipIcon" :value="currentContact.PersonalZip" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" icon="ContactCountryIcon" :value="currentContact.PersonalCountry" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" icon="ContactWebPageIcon"  item-action-icon="GoToPageIcon" :value="currentContact.PersonalWeb" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_FAX')" icon="ContactWebPageIcon" :value="currentContact.PersonalFax" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" icon="ContactPhoneIcon" item-action-icon="PhoneIcon" :value="currentContact.PersonalPhone" />

          <q-separator spaced />

          <div class="q-mt-lg q-pb-sm contact__title">{{ $t('CONTACTSWEBCLIENT.HEADING_BUSINESS') }}</div>
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_BUSINESS_EMAIL')" icon="ContactEmailIcon" item-action-icon="MailIcon" :value="currentContact.BusinessEmail" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" icon="ContactCountryIcon" :value="currentContact.BusinessCountry" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" icon="ContactWebPageIcon" item-action-icon="GoToPageIcon" :value="currentContact.BusinessWeb" />

          <q-separator spaced />

          <div class="q-mt-lg q-pb-sm contact__title">{{ $t('CONTACTSWEBCLIENT.HEADING_OTHER') }}</div>
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_OTHER_EMAIL')" icon="ContactEmailIcon" item-action-icon="MailIcon" :value="currentContact.OtherEmail" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_BIRTHDAY')" icon="ContactBirthdayIcon" :value="contactBirthday" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_NOTES')" icon="ContactNotesIcon" :value="currentContact.Notes" />

          <q-separator spaced />

          <div v-if="currentContact?.GroupUUIDs?.length">
            <div class="q-mt-lg q-pb-sm text-body1">{{ $t('CONTACTSWEBCLIENT.HEADING_GROUPS') }}</div>
            <contact-info-list-item v-for="groupId in currentContact.GroupUUIDs" icon="HashtagIcon" :value="groupNameById(groupId)" />
          </div>
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
<style scoped>
.contact__avatar {
  width: 32px;
  height: 32px;
  background: rgba(178, 216, 255, 0.25);
  border-radius: 8px;
}
.contact__avatar-title {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.3px;
  color: #469CF8;
}
.contact__title {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}
</style>
