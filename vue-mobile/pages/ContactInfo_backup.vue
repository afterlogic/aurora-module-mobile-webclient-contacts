<template>
  <main-layout>
    <q-scroll-area :thumb-style="{width: '5px'}" class="contact-info">
      <div class="contact-info__content" v-if="!loadingStatus">
        <div class="contact-avatar">
          <div class="contact-avatar__letter">{{ contactFirstLetter }}</div>
        </div>

        <div class="contact-info__fullname" :class="{'contact-info__fullname-empty': !currentContact.FullName}">
          {{ currentContact.FullName || "No Name" }}
        </div>

        <div>
          <contact-info-field :caption="$t('COREWEBCLIENT.LABEL_EMAIL')" icon="ContactEmailIcon" item-action-icon="MailIcon" v-if="currentContact.ViewEmail" :value="currentContact.ViewEmail" />
          <!-- <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" icon="ContactPhoneIcon" item-action-icon="PhoneIcon" v-if="currentContact.PrimaryPhone" :value="currentContact.PrimaryPhone" /> -->

          <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_SKYPE')" icon="ContactSkypeIcon" v-if="currentContact.Skype" :value="currentContact.Skype" />
          <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_ADDRESS')" icon="ContactAddressIcon" v-if="currentContact.PersonalAddress" :value="currentContact.PersonalAddress" />
          <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_FACEBOOK')" icon="ContactFacebookIcon" v-if="currentContact.Facebook" :value="currentContact.Facebook" />
          <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_FIRST_NAME')" icon="ContactNameIcon" v-if="currentContact.FirstName" :value="currentContact.FirstName" />
          <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_LAST_NAME')" icon="ContactNameIcon" v-if="currentContact.LastName" :value="currentContact.LastName" />
          <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_NICK_NAME')" icon="ContactNameIcon" v-if="currentContact.NickName" :value="currentContact.NickName" />

          <div class="contact-info__section">
            <div v-if="isShowHome" class="contact-info__section-title">{{ $t('CONTACTSWEBCLIENT.HEADING_HOME') }}</div>
            <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" icon="ContactMapIcon" v-if="currentContact.PersonalState" :value="currentContact.PersonalState" />
            <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" icon="ContactZipIcon" v-if="currentContact.PersonalZip" :value="currentContact.PersonalZip" />
            <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" icon="ContactCountryIcon" v-if="currentContact.PersonalCountry" :value="currentContact.PersonalCountry" />
            <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" icon="ContactWebPageIcon" v-if="currentContact.PersonalWeb"  item-action-icon="GoToPageIcon" :value="currentContact.PersonalWeb" />
            <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_FAX')" icon="ContactWebPageIcon" v-if="currentContact.PersonalFax" :value="currentContact.PersonalFax" />
            <!-- <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" icon="ContactPhoneIcon" v-if="currentContact.PersonalPhone" item-action-icon="PhoneIcon" :value="currentContact.PersonalPhone" /> -->
          </div>

          <div class="contact-info__section">
            <div v-if="isShowBusiness" class="contact-info__section-title">{{ $t('CONTACTSWEBCLIENT.HEADING_BUSINESS') }}</div>
            <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_BUSINESS_EMAIL')" icon="ContactEmailIcon" item-action-icon="MailIcon" v-if="currentContact.BusinessEmail" :value="currentContact.BusinessEmail" />
            <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" icon="ContactCountryIcon" v-if="currentContact.BusinessCountry" :value="currentContact.BusinessCountry" />
            <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" icon="ContactWebPageIcon" item-action-icon="GoToPageIcon" v-if="currentContact.BusinessWeb" :value="currentContact.BusinessWeb" />
          </div>

          <div class="contact-info__section">
            <div v-if="isShowOther" class="contact-info__section-title">{{ $t('CONTACTSWEBCLIENT.HEADING_OTHER') }}</div>
            <div class="contact-info__section-content">
              <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_OTHER_EMAIL')" icon="ContactEmailIcon" item-action-icon="MailIcon" v-if="currentContact.OtherEmail" :value="currentContact.OtherEmail" />
              <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_BIRTHDAY')" icon="ContactBirthdayIcon" v-if="contactBirthday" :value="contactBirthday" />
              <contact-info-field :caption="$t('CONTACTSWEBCLIENT.LABEL_NOTES')" icon="ContactNotesIcon" v-if="currentContact.Notes" :value="currentContact.Notes" />
            </div>
          </div>

          <div class="contact-info__section" v-if="currentContact?.GroupUUIDs?.length">
            <div class="contact-info__section-title">{{ $t('CONTACTSWEBCLIENT.HEADING_GROUPS') }}</div>
            <div class="contact-info__section-content">
              <contact-info-field
                :key="groupId"
                v-for="groupId in currentContact.GroupUUIDs"
                icon="HashtagIcon"
                :value="groupNameById(groupId)"
              />
            </div>
          </div>
        </div>
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
import ContactInfoField from '../components/ContactInfoField'
import DialogsList from '../components/DialogsList'

export default {
  name: 'ContactInfo',

  components: {
    MainLayout,
    ContactInfoField,
    DialogsList,
  },

  async mounted() {
    const storageId = this.$route.params.storageId
    const contactId = this.$route.params.id

    // console.log('contact mounted', storageId, contactId)

    // await this.asyncGetStorages()
    // this.setCurrentStorage(this.getDefaultStorage)
    const UUID = this.$route.params.id
    await this.asyncGetContact({ UUID })

    // console.log('Contact view: contact', this.currentContact)
    // console.log('Contact view: loadingStatus', this.loadingStatus)
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
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
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

.contact-field {
  padding: 4px 0 4px 24px;

  &__icon {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }

  &__caption {
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    color: #969494;
  }

  &__value {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }

  &__action {

  }
}


.contact-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
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
  }
}
</style>
