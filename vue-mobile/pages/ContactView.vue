<template>
  <q-scroll-area :thumb-style="{width: '5px'}" class="contact-info"  v-if="!isLoading">
    <div class="contact-info__content">
      <div class="contact-avatar">
        <div class="contact-avatar__letter">{{ contactFirstLetter }}</div>
      </div>

      <div class="contact-info__fullname" :class="{'contact-info__fullname-empty': !currentContact.FullName}">
        {{ currentContact.FullName || "No Name" }}
      </div>

      <div>
        <ContactInfoField :caption="$t('COREWEBCLIENT.LABEL_EMAIL')" icon="ContactEmailIcon" item-action-icon="MailIcon" :value="email" />
        <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" icon="ContactPhoneIcon" item-action-icon="PhoneIcon" :value="phoneNumber"/>

        <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_SKYPE')" icon="ContactSkypeIcon" :value="currentContact.Skype" />
        <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_ADDRESS')" icon="ContactAddressIcon" :value="address" />
        <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_CITY')" icon="ContactAddressIcon" :value="currentContact.PersonalCity" />
        <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_FACEBOOK')" icon="ContactFacebookIcon" :value="currentContact.Facebook" />
        <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_FIRST_NAME')" icon="ContactNameIcon" :value="currentContact.FirstName" />
        <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_LAST_NAME')" icon="ContactNameIcon" :value="currentContact.LastName" />
        <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_NICK_NAME')" icon="ContactNameIcon" :value="currentContact.NickName" />

        <div v-if="isShowHome" class="contact-info__section">
          <div class="contact-info__section-title">{{ $t('CONTACTSWEBCLIENT.HEADING_HOME') }}</div>
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" icon="ContactMapIcon" :value="currentContact.PersonalState" />
          <ContactInfoField :caption="$t('CONTACTSMOBILEWEBCLIENT.LABEL_PERSONAL_ADDRESS')" icon="ContactWebPageIcon" :value="currentContact.PersonalAddress" />
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" icon="ContactZipIcon" :value="currentContact.PersonalZip" />
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" icon="ContactCountryIcon" :value="currentContact.PersonalCountry" />
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" icon="ContactWebPageIcon" item-action-icon="GoToPageIcon" :value="currentContact.PersonalWeb" />
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_PERSONAL_EMAIL')" icon="ContactWebPageIcon" :value="currentContact.PersonalEmail"/>
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_FAX')" icon="ContactWebPageIcon" :value="currentContact.PersonalFax" />
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" icon="ContactPhoneIcon" item-action-icon="PhoneIcon" :value="currentContact.PersonalPhone" />
        </div>

        <div v-if="isShowBusiness" class="contact-info__section">
          <div class="contact-info__section-title">{{ $t('CONTACTSWEBCLIENT.HEADING_BUSINESS') }}</div>
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_BUSINESS_EMAIL')" icon="ContactEmailIcon" item-action-icon="MailIcon" :value="currentContact.BusinessEmail" />
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_COMPANY')" icon="ContactWebPageIcon" :value="currentContact.BusinessCompany" />
          <ContactInfoField :caption="$t('CONTACTSMOBILEWEBCLIENT.LABEL_PERSONAL_ADDRESS')" icon="ContactWebPageIcon" :value="currentContact.BusinessAddress"/>
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_CITY')" icon="ContactWebPageIcon" :value="currentContact.BusinessCity" />
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" icon="ContactWebPageIcon" :value="currentContact.BusinessState"/>
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" icon="ContactWebPageIcon" :value="currentContact.BusinessZip"/>
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" icon="ContactCountryIcon" :value="currentContact.BusinessCountry" />
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_JOB_TITLE')" icon="ContactCountryIcon" :value="currentContact.BusinessJobTitle"  />
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_DEPARTMENT')" icon="ContactCountryIcon" :value="currentContact.BusinessDepartment"  />
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_OFFICE')" icon="ContactCountryIcon" :value="currentContact.BusinessOffice"  />
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" icon="ContactWebPageIcon" item-action-icon="GoToPageIcon" :value="currentContact.BusinessWeb" />
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_FAX')" icon="ContactWebPageIcon" :value="currentContact.BusinessFax" />
          <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" icon="ContactWebPageIcon" :value="currentContact.BusinessPhone" />
        </div>

        <div class="contact-info__section">
          <div v-if="isShowOther" class="contact-info__section-title">{{ $t('CONTACTSWEBCLIENT.HEADING_OTHER') }}</div>
          <div class="contact-info__section-content">
            <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_OTHER_EMAIL')" icon="ContactEmailIcon" item-action-icon="MailIcon" :value="currentContact.OtherEmail" />
            <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_BIRTHDAY')" icon="ContactBirthdayIcon" :value="contactBirthday" />
            <ContactInfoField :caption="$t('CONTACTSWEBCLIENT.LABEL_NOTES')" icon="ContactNotesIcon" :value="currentContact.Notes" />
          </div>
        </div>

        <div class="contact-info__section" v-if="currentContact?.GroupUUIDs?.length">
          <div class="contact-info__section-title">{{ $t('CONTACTSWEBCLIENT.HEADING_GROUPS') }}</div>
          <div class="contact-info__section-content">
            <ContactInfoField
              v-for="UUID in currentContact.GroupUUIDs"
              :key="UUID"
              icon="HashtagIcon"
              :value="groupNameByUuid(UUID)"
            />
          </div>
        </div>
      </div>
    </div>
  </q-scroll-area>

  <div class="q-mt-xl flex items-center justify-center" v-if="isLoading">
    <q-circular-progress
      indeterminate
      size="40px"
      color="primary"
      class="q-ma-md"
    />
  </div>
  <!-- <dialogs-list /> -->
</template>

<script>
import { mapGetters, mapActions } from 'pinia'
import { useContactsStore } from '../store/index-pinia.js'

import ContactInfoField from '../components/ContactInfoField'

export default {
  name: 'ContactInfo',

  components: {
    ContactInfoField,
  },

  computed: {
    ...mapGetters(useContactsStore, [
      'currentContact',
      'groupsList',
      'isLoading',
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
      this.currentContact.PersonalPhone ||
      this.currentContact.PersonalAddress ||
      this.currentContact.PersonalEmail
    },
    isShowBusiness() {
      return this.currentContact.BusinessEmail ||
      this.currentContact.BusinessCountry ||
      this.currentContact.BusinessWeb ||
      this.currentContact.BusinessAddress ||
      this.currentContact.BusinessCity ||
      this.currentContact.BusinessState ||
      this.currentContact.BusinessZip ||
      this.currentContact.BusinessJobTitle ||
      this.currentContact.BusinessDepartment ||
      this.currentContact.BusinessOffice ||
      this.currentContact.BusinessFax ||
      this.currentContact.BusinessPhone
    },
    isShowOther() {
      return this.currentContact.OtherEmail ||
      this.contactBirthday ||
      this.currentContact.Notes
    },
    phoneNumber() {
      let phone

      switch (this.currentContact.PrimaryPhone) {
        case 0:
          phone = this.currentContact.PersonalMobile
          break
        case 1:
          phone = this.currentContact.PersonalPhone
          break
        case 2:
          phone = this.currentContact.BusinessPhone
          break
      }

      return phone
    },
    email(){
      let email = ''

      switch (this.currentContact.PrimaryEmail) {
        case 0:
          email = this.currentContact.PersonalEmail
          break
        case 1:
          email = this.currentContact.BusinessEmail
          break
        case 2:
          email = this.currentContact.OtherEmail
          break
      }

      return email
    },
    address(){
      let address = ''

      switch (this.currentContact.PrimaryAddress) {
        case 0:
          address = this.currentContact.PersonalAddress
          break
        case 1:
          address = this.currentContact.BusinessAddress
          break
      }

      return address
    },
  },
  methods: {
    ...mapActions(useContactsStore, ['asyncGetContact']),
    groupNameByUuid(UUID) {
      return this.groupsList.find((group) => group.UUID === UUID)?.name
    },
  },
}
</script>
<style lang="scss">
.contact-info {
  height: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    padding: 24px 0;
  }

  &__fullname {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    margin: 0 auto 24px;
    word-break: break-all;
    padding: 0 16px 0 24px;
    width: 100%;
  }

  &__section {
    padding: 16px 0;
  }
  &__section-title {
    font-size: 14px;
    padding: 16px 24px;
    border-top: 1px solid #F6F6F6;
  }
}

.contact-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px !important;
  height: 32px;
  background: rgba(178, 216, 255, 0.25);
  border-radius: 8px;
  align-self: center;
  margin-bottom: 24px;

  &__letter {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.3px;
    color: #469CF8;
    justify-content: center;
    display: flex;
  }
}

.q-scrollarea__content {
  width: 100%;
}
</style>
