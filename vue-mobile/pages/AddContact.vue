<template>
  <main-layout>
    <q-scroll-area :thumb-style="{width: '5px'}" class="contacts__list">
      <q-form class="q-px-lg q-py-md">
        <app-input v-model="Contact.FullName" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_DISPLAY_NAME')" class="q-mb-sm" />
        <app-input v-model="Contact.ViewEmail" :placeholder="$t('COREWEBCLIENT.LABEL_EMAIL')" class="q-mb-sm" />
        <app-input v-model="Contact.Phone" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" class="q-mb-sm" />
        <app-input v-model="Contact.PersonalAddress" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_ADDRESS')" class="q-mb-sm" />
        <app-input v-model="Contact.Skype" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_SKYPE')" class="q-mb-sm" />
        <app-input v-model="Contact.Facebook" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_FACEBOOK')" class="q-mb-sm" />

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

        <template v-if="isShowExtraFields">
          <app-input v-model="Contact.FirstName" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_FIRST_NAME')" />
          <app-input v-model="Contact.LastName" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_LAST_NAME')" />
          <app-input v-model="Contact.NickName" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_NICK_NAME')" />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_HOME') }}</div>
          <app-input v-model="Contact.PersonalEmail" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_PERSONAL_EMAIL')" />
          <app-input v-model="Contact.PersonalAddress" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_PERSONAL_ADDRESS')" />
          <app-input v-model="Contact.PersonalCity" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_CITY')" />
          <app-input v-model="Contact.PersonalState" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" />
          <app-input v-model="Contact.PersonalZip" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" />
          <app-input v-model="Contact.PersonalCountry" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" />
          <app-input v-model="Contact.PersonalWeb" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" />
          <app-input v-model="Contact.PersonalFax" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_FAX')" />
          <app-input v-model="Contact.PersonalPhone" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" />
          <app-input v-model="Contact.PersonalMobile" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_MOBILE')" />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_BUSINESS') }}</div>
          <app-input v-model="Contact.BusinessEmail" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_BUSINESS_EMAIL')" />
          <app-input v-model="Contact.BusinessCompany" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_COMPANY')" />
          <app-input v-model="Contact.BusinessAddress" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_PERSONAL_ADDRESS')" />
          <app-input v-model="Contact.BusinessCity" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_CITY')" />
          <app-input v-model="Contact.BusinessState" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" />
          <app-input v-model="Contact.BusinessZip" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" />
          <app-input v-model="Contact.BusinessCountry" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" />
          <app-input v-model="Contact.BusinessJobTitle" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_JOB_TITLE')" />
          <app-input v-model="Contact.BusinessDepartment" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_DEPARTMENT')" />
          <app-input v-model="Contact.BusinessOffice" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_OFFICE')" />
          <app-input v-model="Contact.BusinessWeb" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" />
          <app-input v-model="Contact.BusinessFax" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_FAX')" />
          <app-input v-model="Contact.BusinessPhone" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_OTHER') }}</div>
          <app-input v-model="Contact.BirthDay" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_BIRTHDAY')" />
          <app-input v-model="Contact.OtherEmail" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_OTHER_EMAIL')" />
          <app-input v-model="Contact.Notes" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_NOTES')" />
        </template>

        <div class="q-mt-lg text-body1">{{ $t('CONTACTSWEBCLIENT.HEADING_PGP_SETTINGS') }}</div>

        <div class="text-caption text-grey">{{ $t('CONTACTSWEBCLIENT.INFO_ENCRYPT_SIGN_MESSAGES') }}</div>

        <app-checkbox
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
