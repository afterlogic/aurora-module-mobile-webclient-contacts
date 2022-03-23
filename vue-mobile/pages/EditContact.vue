<template>
  <main-layout>
    <q-scroll-area v-if="contact" :thumb-style="{width: '5px'}" class="contacts__list">
      <q-form class="q-px-lg q-py-md">
        <app-input dense v-model="contact.FullName" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_DISPLAY_NAME')" class="q-mb-xs contact__form-input" />
        <app-input dense v-model="contact.ViewEmail" :placeholder="$t('COREWEBCLIENT.LABEL_EMAIL')" class="q-mb-xs contact__form-input" />
        <app-input dense v-model="contact.Phone" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" class="q-mb-xs" />
        <app-input dense v-model="contact.PersonalAddress" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_ADDRESS')" class="q-mb-xs contact__form-input" />
        <app-input dense v-model="contact.Skype" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_SKYPE')" class="q-mb-xs contact__form-input" />
        <app-input dense v-model="contact.Facebook" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_FACEBOOK')" class="q-mb-xs contact__form-input" />

        <div class="flex justify-center q-mt-md">
          <q-btn
              class="q-mx-auto"
              size="12px"
              flat
              no-caps
              text-color="blue"
              v-model="isShowExtraFields"
              :label="isShowExtraFields ? $t('CONTACTSWEBCLIENT.ACTION_HIDE_ADDITIONAL_FIELDS'): $t('CONTACTSWEBCLIENT.ACTION_SHOW_ADDITIONAL_FIELDS')"
              @click="isShowExtraFields = !isShowExtraFields"
          >
          </q-btn>
        </div>

        <template v-if="isShowExtraFields">
          <app-input dense v-model="contact.FirstName" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_FIRST_NAME')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.LastName" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_LAST_NAME')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.NickName" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_NICK_NAME')" class="q-mb-xs contact__form-input" />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_HOME') }}</div>
          <app-input dense v-model="contact.PersonalEmail" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_PERSONAL_EMAIL')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalAddress" :placeholder="$t('CONTACTSMOBILEWEBCLIENT.LABEL_PERSONAL_ADDRESS')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalCity" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_CITY')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalState" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalZip" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalCountry" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalWeb" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalFax" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_FAX')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalPhone" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalMobile" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_MOBILE')" class="q-mb-xs contact__form-input" />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_BUSINESS') }}</div>
          <app-input dense v-model="contact.BusinessEmail" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_BUSINESS_EMAIL')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessCompany" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_COMPANY')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessAddress" :placeholder="$t('CONTACTSMOBILEWEBCLIENT.LABEL_PERSONAL_ADDRESS')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessCity" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_CITY')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessState" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessZip" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessCountry" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessJobTitle" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_JOB_TITLE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessDepartment" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_DEPARTMENT')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessOffice" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_OFFICE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessWeb" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessFax" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_FAX')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessPhone" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" class="q-mb-xs contact__form-input" />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_OTHER') }}</div>
          <app-input dense v-model="contact.BirthDay" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_BIRTHDAY')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.OtherEmail" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_OTHER_EMAIL')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.Notes" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_NOTES')" class="q-mb-xs contact__form-input" />
        </template>

        <div class="q-mt-lg encrypt-sign__heading">{{ $t('CONTACTSWEBCLIENT.HEADING_PGP_SETTINGS') }}</div>

        <div class="q-mt-sm encrypt-sign__message">{{ $t('CONTACTSWEBCLIENT.INFO_ENCRYPT_SIGN_MESSAGES') }}</div>

        <div class="flex">
          <q-btn
              style="padding-left: 0"
              size="12px"
              flat
              no-caps
              text-color="blue"
              label="Import from file"
              @click="onImportFromFile"
          >
          </q-btn>
          <q-btn
              size="12px"
              flat
              no-caps
              text-color="blue"
              label="Import from text"
              @click="onImportFromText"
          >
          </q-btn>
        </div>

        <app-checkbox
            class="q-mt-md"
            leftLabel
            v-model="contact.PgpSignMessages"
            :label="$t('CONTACTSWEBCLIENT.LABEL_SIGN_MESSAGES')"
        />

        <app-checkbox
            leftLabel
            v-model="contact.PgpEncryptMessages"
            :label="$t('CONTACTSWEBCLIENT.LABEL_ENCRYPT_MESSAGES')"
        />

        <q-separator spaced />

        <div class="q-mt-lg text-body1">{{ $t('CONTACTSWEBCLIENT.HEADING_GROUPS') }}</div>

        <app-checkbox
            v-for="group in groupsList"
            leftLabel
            :label="group.Name"
            :val="group.UUID"
            v-model="Contact.GroupUUIDs"
        />
      </q-form>
    </q-scroll-area>
  </main-layout>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

import MainLayout from 'src/layouts/MainLayout'
import AppInput from 'src/components/common/AppInput'
import AppCheckbox from 'src/components/common/AppCheckbox'

export default {
  name: "EditContact",
  components: {
    MainLayout,
    AppInput,
    AppCheckbox
  },
  mounted() {
    this.contact = _.cloneDeep(this.currentContact)
  },
  computed: {
    ...mapGetters('contactsmobile', ['currentContact'])
  },
  data: () => ({
    contact: null,
    isShowExtraFields: false,
    groupsList: []
  }),
  methods: {
    onImportFromFile() {

    },
    onImportFromText() {

    }
  }
}
</script>

<style scoped>

</style>
