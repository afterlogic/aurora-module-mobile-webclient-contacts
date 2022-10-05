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
          <contact-info-list-item :caption="$t('COREWEBCLIENT.LABEL_EMAIL')" icon="ContactEmailIcon" item-action-icon="MailIcon" v-if="currentContact.ViewEmail" :value="currentContact.ViewEmail" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" icon="ContactPhoneIcon" item-action-icon="PhoneIcon" v-if="currentContact.PrimaryPhone" :value="currentContact.PrimaryPhone" />

          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_SKYPE')" icon="ContactSkypeIcon" v-if="currentContact.Skype" :value="currentContact.Skype" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_ADDRESS')" icon="ContactAddressIcon" v-if="currentContact.PersonalAddress" :value="currentContact.PersonalAddress" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_FACEBOOK')" icon="ContactFacebookIcon" v-if="currentContact.Facebook" :value="currentContact.Facebook" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_FIRST_NAME')" icon="ContactNameIcon" v-if="currentContact.FirstName" :value="currentContact.FirstName" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_LAST_NAME')" icon="ContactNameIcon" v-if="currentContact.LastName" :value="currentContact.LastName" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_NICK_NAME')" icon="ContactNameIcon" v-if="currentContact.NickName" :value="currentContact.NickName" />

          <div v-if="isShowHome" class="q-mt-lg q-pb-sm contact__title">{{ $t('CONTACTSWEBCLIENT.HEADING_HOME') }}</div>
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" icon="ContactMapIcon" v-if="currentContact.PersonalState" :value="currentContact.PersonalState" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" icon="ContactZipIcon" v-if="currentContact.PersonalZip" :value="currentContact.PersonalZip" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" icon="ContactCountryIcon" v-if="currentContact.PersonalCountry" :value="currentContact.PersonalCountry" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" icon="ContactWebPageIcon" v-if="currentContact.PersonalWeb"  item-action-icon="GoToPageIcon" :value="currentContact.PersonalWeb" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_FAX')" icon="ContactWebPageIcon" v-if="currentContact.PersonalFax" :value="currentContact.PersonalFax" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" icon="ContactPhoneIcon" v-if="currentContact.PersonalPhone" item-action-icon="PhoneIcon" :value="currentContact.PersonalPhone" />

          <div v-if="isShowBusiness" class="q-mt-lg q-pb-sm contact__title">{{ $t('CONTACTSWEBCLIENT.HEADING_BUSINESS') }}</div>
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_BUSINESS_EMAIL')" icon="ContactEmailIcon" item-action-icon="MailIcon" v-if="currentContact.BusinessEmail" :value="currentContact.BusinessEmail" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" icon="ContactCountryIcon" v-if="currentContact.BusinessCountry" :value="currentContact.BusinessCountry" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" icon="ContactWebPageIcon" item-action-icon="GoToPageIcon" v-if="currentContact.BusinessWeb" :value="currentContact.BusinessWeb" />

          <div v-if="isShowOther" class="q-mt-lg q-pb-sm contact__title">{{ $t('CONTACTSWEBCLIENT.HEADING_OTHER') }}</div>
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_OTHER_EMAIL')" icon="ContactEmailIcon" item-action-icon="MailIcon" v-if="currentContact.OtherEmail" :value="currentContact.OtherEmail" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_BIRTHDAY')" icon="ContactBirthdayIcon" v-if="contactBirthday" :value="contactBirthday" />
          <contact-info-list-item :caption="$t('CONTACTSWEBCLIENT.LABEL_NOTES')" icon="ContactNotesIcon" v-if="currentContact.Notes" :value="currentContact.Notes" />

          <div v-if="currentContact?.GroupUUIDs?.length">
            <div class="q-mt-lg q-pb-sm text-body1">{{ $t('CONTACTSWEBCLIENT.HEADING_GROUPS') }}</div>
            <contact-info-list-item
              :key="groupId"
              v-for="groupId in currentContact.GroupUUIDs"
              icon="HashtagIcon"
              :value="groupNameById(groupId)"
            />
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
    <dialogs-list />
  </main-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MainLayout from 'src/layouts/MainLayout'
import ContactInfoListItem from '../components/ContactInfoListItem';
import DialogsList from "../components/DialogsList";

export default {
  name: 'ContactInfo',

  components: {
    MainLayout,
    ContactInfoListItem,
    DialogsList
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
      if (!this.currentContact.BirthDay || !this.currentContact.BirthMonth || !this.currentContact.BirthYear) return ''
      return `${this.currentContact.BirthDay}.${this.currentContact.BirthMonth}.${this.currentContact.BirthYear}`
    },
    isShowHome() {
      return this.currentContact.PersonalState ||
      this.currentContact.PersonalZip ||
      this.currentContact.PersonalCountry ||
      this.currentContact.PersonalWeb ||
      this.currentContact.PersonalFax ||
      this.currentContact.PersonalPhone
    },
    isShowBusiness() {
      return this.currentContact.BusinessEmail ||
      this.currentContact.BusinessCountry ||
      this.currentContact.BusinessWeb
    },
    isShowOther() {
      return this.currentContact.OtherEmail ||
      this.contactBirthday ||
      this.currentContact.Notes
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
