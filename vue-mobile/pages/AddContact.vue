<template>
  <main-layout>
    <q-scroll-area :thumb-style="{width: '5px'}" class="contacts__list">
      <q-form class="q-px-lg q-py-md">
        <app-input dense v-model="Contact.FullName" :label="$t('CONTACTSWEBCLIENT.LABEL_DISPLAY_NAME')" class="q-mb-xs contact__form-input" />
        <app-input dense v-model="Contact.ViewEmail" :label="$t('COREWEBCLIENT.LABEL_EMAIL')" class="q-mb-xs contact__form-input" />
        <app-input dense v-model="Contact.Phone" :label="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" class="q-mb-xs" />
        <app-input dense v-model="Contact.PersonalAddress" :label="$t('CONTACTSWEBCLIENT.LABEL_ADDRESS')" class="q-mb-xs contact__form-input" />
        <app-input dense v-model="Contact.Skype" :label="$t('CONTACTSWEBCLIENT.LABEL_SKYPE')" class="q-mb-xs contact__form-input" />
        <app-input dense v-model="Contact.Facebook" :label="$t('CONTACTSWEBCLIENT.LABEL_FACEBOOK')" class="q-mb-xs contact__form-input" />

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
          <app-input dense v-model="Contact.FirstName" :label="$t('CONTACTSWEBCLIENT.LABEL_FIRST_NAME')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.LastName" :label="$t('CONTACTSWEBCLIENT.LABEL_LAST_NAME')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.NickName" :label="$t('CONTACTSWEBCLIENT.LABEL_NICK_NAME')" class="q-mb-xs contact__form-input" />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_HOME') }}</div>
          <app-input dense v-model="Contact.PersonalEmail" :label="$t('CONTACTSWEBCLIENT.LABEL_PERSONAL_EMAIL')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.PersonalAddress" :label="$t('CONTACTSMOBILEWEBCLIENT.LABEL_PERSONAL_ADDRESS')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.PersonalCity" :label="$t('CONTACTSWEBCLIENT.LABEL_CITY')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.PersonalState" :label="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.PersonalZip" :label="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.PersonalCountry" :label="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.PersonalWeb" :label="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.PersonalFax" :label="$t('CONTACTSWEBCLIENT.LABEL_FAX')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.PersonalPhone" :label="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.PersonalMobile" :label="$t('CONTACTSWEBCLIENT.LABEL_MOBILE')" class="q-mb-xs contact__form-input" />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_BUSINESS') }}</div>
          <app-input dense v-model="Contact.BusinessEmail" :label="$t('CONTACTSWEBCLIENT.LABEL_BUSINESS_EMAIL')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.BusinessCompany" :label="$t('CONTACTSWEBCLIENT.LABEL_COMPANY')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.BusinessAddress" :label="$t('CONTACTSMOBILEWEBCLIENT.LABEL_PERSONAL_ADDRESS')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.BusinessCity" :label="$t('CONTACTSWEBCLIENT.LABEL_CITY')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.BusinessState" :label="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.BusinessZip" :label="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.BusinessCountry" :label="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.BusinessJobTitle" :label="$t('CONTACTSWEBCLIENT.LABEL_JOB_TITLE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.BusinessDepartment" :label="$t('CONTACTSWEBCLIENT.LABEL_DEPARTMENT')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.BusinessOffice" :label="$t('CONTACTSWEBCLIENT.LABEL_OFFICE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.BusinessWeb" :label="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.BusinessFax" :label="$t('CONTACTSWEBCLIENT.LABEL_FAX')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.BusinessPhone" :label="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" class="q-mb-xs contact__form-input" />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_OTHER') }}</div>
          <app-input dense v-model="Contact.BirthDay" :label="$t('CONTACTSWEBCLIENT.LABEL_BIRTHDAY')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.OtherEmail" :label="$t('CONTACTSWEBCLIENT.LABEL_OTHER_EMAIL')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="Contact.Notes" :label="$t('CONTACTSWEBCLIENT.LABEL_NOTES')" class="q-mb-xs contact__form-input" />
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
              @click="onImportPgpKeyFromFile"
          >
          </q-btn>
          <q-btn
              size="12px"
              flat
              no-caps
              text-color="blue"
              label="Import from text"
              @click="onImportPgpKeyFromText"
          >
          </q-btn>
        </div>

        <app-checkbox
          class="q-mt-md"
          leftLabel
          v-model="Contact.PgpSignMessages"
          :label="$t('CONTACTSWEBCLIENT.LABEL_SIGN_MESSAGES')"
        />

        <app-checkbox
          leftLabel
          v-model="Contact.PgpEncryptMessages"
          :label="$t('CONTACTSWEBCLIENT.LABEL_ENCRYPT_MESSAGES')"
        />

        <q-separator spaced />

        <div class="q-mt-lg text-body1">{{ $t('CONTACTSWEBCLIENT.HEADING_GROUPS') }}</div>

        <app-checkbox
            v-bind:key="group.UUID"
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

import MainLayout from 'src/layouts/MainLayout'
import AppInput from 'src/components/common/AppInput'
import AppCheckbox from 'src/components/common/AppCheckbox'

export default {
  name: 'AddContact',

  components: {
    MainLayout,
    AppInput,
    AppCheckbox,
  },

  data() {
    return {
      isShowExtraFields: false,
      Contact: {
        PrimaryEmail: 0,
        PrimaryPhone: 0,
        PrimaryAddress: 0,
        FullName: '',
        FirstName: '',
        LastName: '',
        NickName: '',
        Storage: 'personal',
        Skype: '',
        Facebook: '',
        PersonalEmail: '',
        PersonalAddress: '',
        PersonalCity: '',
        PersonalState: '',
        PersonalZip: '',
        PersonalCountry: '',
        PersonalWeb: '',
        PersonalFax: '',
        PersonalPhone: '',
        PersonalMobile: '',
        BusinessEmail: '',
        BusinessCompany: '',
        BusinessJobTitle: '',
        BusinessDepartment: '',
        BusinessOffice: '',
        BusinessAddress: '',
        BusinessCity: '',
        BusinessState: '',
        BusinessZip: '',
        BusinessCountry: '',
        BusinessFax: '',
        BusinessPhone: '',
        BusinessWeb: '',
        OtherEmail: '',
        Notes: '',
        BirthDay: 0,
        BirthMonth: 0,
        BirthYear: 0,
        PublicPgpKey: '',
        PgpEncryptMessages: false,
        PgpSignMessages: false,
        ViewEmail: '',
        GroupUUIDs: [],
      },
    }
  },

  computed: {
    ...mapGetters('contactsmobile', [ 'groupsList' ]),
  },

  methods: {
    ...mapActions('contactsmobile', [ 'changeNewContact' ]),
    onImportPgpKeyFromFile() {
      console.log('coming soon')
    },
    onImportPgpKeyFromText() {
      console.log('coming soon')
    }
  },

  watch: {
    Contact: {
      handler(value) {
        this.changeNewContact({...value})
      },
      deep: true
    }
  },
}
</script>
<style lang="scss">
.encrypt-sign {
  &__heading{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
  }
  &__message{
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #969494;
  }
}

.contact__form-input .q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input {
  padding: 6px 0 0 0;
}
</style>
