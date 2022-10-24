<template>
  <div style="height: 100%">
    <q-scroll-area v-if="contact" :thumb-style="{width: '5px'}" class="contacts__list">
      <q-form class="q-px-lg q-py-md">
        <app-input dense v-model="contact.FullName" :label="$t('CONTACTSWEBCLIENT.LABEL_DISPLAY_NAME')" class="q-mb-xs contact__form-input" />

        <app-input v-if="!isShowExtraFields" v-model="getEmail" :label="summaryEmailLabel" class="q-mb-xs contact__form-input" dense />
        <app-input
          v-if="isShowExtraFields && !emailSelectOptions.length"
          :label="summaryEmailLabel"
          :placeholder="$t('CONTACTSMOBILEWEBCLIENT.LABEL_NO_PRIMARY_INFORMATION')"
          class="q-mb-xs contact__form-input"
          disable dense stack-label />
        <q-select
          v-if="isShowExtraFields && emailSelectOptions.length"
          style="max-width: 700px"
          :clearable="false"
          v-model="contact.PrimaryEmail"
          :options="emailSelectOptions"
          stack-label
          emit-value
          map-options
          :label="$t('COREWEBCLIENT.LABEL_EMAIL')"
          behavior="menu">
        </q-select>

        <app-input v-if="!isShowExtraFields" v-model="getPhoneNumber" :label="summaryPhoneLabel" class="q-mb-xs" dense />
        <app-input 
          v-if="isShowExtraFields && !phoneSelectOptions.length"
          :label="summaryPhoneLabel"
          :placeholder="$t('CONTACTSMOBILEWEBCLIENT.LABEL_NO_PRIMARY_INFORMATION')"
          class="q-mb-xs contact__form-input"
          disable dense stack-label />
        <q-select
          v-if="isShowExtraFields && phoneSelectOptions.length"
          style="max-width: 700px"
          v-model="contact.PrimaryPhone"
          :options="phoneSelectOptions"
          :label="$t('CONTACTSWEBCLIENT.LABEL_PHONE')"
          stack-label
          :clearable="false"
          emit-value
          map-options
          behavior="menu">
        </q-select>

        <app-input dense v-if="!isShowExtraFields" v-model="getAddress" :label="summaryAddressLabel" class="q-mb-xs contact__form-input" />
        <app-input 
          v-if="isShowExtraFields && !addressSelectOptions.length"
          :label="summaryAddressLabel"
          :placeholder="$t('CONTACTSMOBILEWEBCLIENT.LABEL_NO_PRIMARY_INFORMATION')"
          class="q-mb-xs contact__form-input"
          disable dense stack-label  />
        <q-select
            style="max-width: 700px"
            v-if="isShowExtraFields && addressSelectOptions.length"
            :clearable="false"
            v-model="contact.PrimaryAddress"
            :options="addressSelectOptions"
            stack-label
            emit-value
            map-options
            :label="$t('CONTACTSWEBCLIENT.LABEL_ADDRESS')"
            behavior="menu">
        </q-select>

        <app-input dense v-model="contact.Skype" :label="$t('CONTACTSWEBCLIENT.LABEL_SKYPE')" class="q-mb-xs contact__form-input" />
        <app-input dense v-model="contact.Facebook" :label="$t('CONTACTSWEBCLIENT.LABEL_FACEBOOK')" class="q-mb-xs contact__form-input" />

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
          <app-input dense v-model="contact.FirstName" :label="$t('CONTACTSWEBCLIENT.LABEL_FIRST_NAME')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.LastName" :label="$t('CONTACTSWEBCLIENT.LABEL_LAST_NAME')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.NickName" :label="$t('CONTACTSWEBCLIENT.LABEL_NICK_NAME')" class="q-mb-xs contact__form-input" />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_HOME') }}</div>
          <app-input dense v-model="contact.PersonalEmail" :label="$t('CONTACTSWEBCLIENT.LABEL_PERSONAL_EMAIL')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalAddress" :label="$t('CONTACTSMOBILEWEBCLIENT.LABEL_PERSONAL_ADDRESS')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalCity" :label="$t('CONTACTSWEBCLIENT.LABEL_CITY')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalState" :label="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalZip" :label="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalCountry" :label="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalWeb" :label="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalFax" :label="$t('CONTACTSWEBCLIENT.LABEL_FAX')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalPhone" :label="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.PersonalMobile" :label="$t('CONTACTSWEBCLIENT.LABEL_MOBILE')" class="q-mb-xs contact__form-input" />

          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_BUSINESS') }}</div>
          <app-input dense v-model="contact.BusinessEmail" :label="$t('CONTACTSWEBCLIENT.LABEL_BUSINESS_EMAIL')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessCompany" :label="$t('CONTACTSWEBCLIENT.LABEL_COMPANY')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessAddress" :label="$t('CONTACTSMOBILEWEBCLIENT.LABEL_PERSONAL_ADDRESS')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessCity" :label="$t('CONTACTSWEBCLIENT.LABEL_CITY')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessState" :label="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessZip" :label="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessCountry" :label="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessJobTitle" :label="$t('CONTACTSWEBCLIENT.LABEL_JOB_TITLE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessDepartment" :label="$t('CONTACTSWEBCLIENT.LABEL_DEPARTMENT')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessOffice" :label="$t('CONTACTSWEBCLIENT.LABEL_OFFICE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessWeb" :label="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessFax" :label="$t('CONTACTSWEBCLIENT.LABEL_FAX')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.BusinessPhone" :label="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" class="q-mb-xs contact__form-input" />
          
          <div class="q-mt-lg">{{ $t('CONTACTSWEBCLIENT.HEADING_OTHER') }}</div>
            <div style="max-width: 700px">
              <q-input v-model="getDatetime" mask="date" :rules="['date']" :label="$t('CONTACTSWEBCLIENT.LABEL_BIRTHDAY')">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-menu :offset=[0,25] fit anchor="bottom start" self="top end" transition-show="scale" transition-hide="scale">
                      <q-date v-model="getDatetime" :options="dateOptions">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                        </div>
                      </q-date>
                    </q-menu>
                  </q-icon>
                </template>
              </q-input>
            </div>
          <app-input dense v-model="contact.OtherEmail" :label="$t('CONTACTSWEBCLIENT.LABEL_OTHER_EMAIL')" class="q-mb-xs contact__form-input" />
          <app-input dense v-model="contact.Notes" :label="$t('CONTACTSWEBCLIENT.LABEL_NOTES')" class="q-mb-xs contact__form-input" />
        </template>

        <div class="q-mt-lg encrypt-sign__heading">{{ $t('CONTACTSWEBCLIENT.HEADING_PGP_SETTINGS') }}</div>

        <div class="q-mt-sm encrypt-sign__message">{{ $t('CONTACTSWEBCLIENT.INFO_ENCRYPT_SIGN_MESSAGES') }}</div>

        <div v-if="pgpKey" class="flex q-my-md">
          <div class="q-mr-md">
            <contact-key-icon/>
          </div>
          <div>
            <div class="pgp-key__mail">{{ pgpKey.sMail }}</div>
            <div class="pgp-key__info">{{ `(${pgpKey.iBitSize}, ${pgpKey.sType})` }}</div>
          </div>

        </div>

        <div class="flex" v-if="!contact.PublicPgpKey">
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
        <div v-if="contact.PublicPgpKey">
          <q-btn
              style="padding-left: 0"
              size="12px"
              flat
              no-caps
              text-color="blue"
              label="Remove key"
              @click="onRemoveKey"
          >
          </q-btn>
        </div>
        <q-file ref="fileInput" v-model="files" class="hidden" multiple />
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
          :key="group.UUID"
          v-model="contact.GroupUUIDs"
          :label="group.name"
          :val="group.UUID"
          leftLabel
        />
      </q-form>
    </q-scroll-area>
    <component
        v-for="component in currentComponents"
        :key="component.name"
        :ref="component.name"
        :is="component.component"
    />
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import eventBus from 'src/event-bus'
import _ from 'lodash'

import MainLayout from 'src/layouts/MainLayout'
import AppInput from 'src/components/common/AppInput'
import AppCheckbox from 'src/components/common/AppCheckbox'
import OpenPgp from '../../../OpenPgpMobileWebclient/vue-mobile/openpgp-helper'
import ContactKeyIcon from '../components/icons/ContactKeyIcon'
import moment from "moment"

const phoneLabels = ['Mobile','Phone', 'Business']
const emailLabels = ['Home', 'Business', 'Other']
const addressLabels = ['Home', 'Business']

export default {
  name: "EditContact",

  components: {
    ContactKeyIcon,
    MainLayout,
    AppInput,
    AppCheckbox
  },

  setup () {
    return {
      dateOptions(date) {
        return date <= moment().format('YYYY/MM/DD')
      }
    }
  },

  data: () => ({
    contact: null,
    isShowExtraFields: false,
    currentComponents: [],
    pgpKey: null,
    files: [],
    datetime: '',
  }),

  async mounted() {
    if (_.isEmpty(this.currentContact)) {
      this.$router.push({ name: 'contacts' })
    }
    this.contact = _.cloneDeep(this.currentContact)
    this.contact['PublicPgpKey'] = this.contact['OpenPgpWebclient::PgpKey'] || ''
    this.contact['PgpSignMessages'] = this.contact['PgpSignMessages'] || false
    this.contact['PgpEncryptMessages'] = this.contact['PgpEncryptMessages'] || false
    if(this.contact['BirthYear'] && this.contact['BirthMonth'] && this.contact['BirthDay']) {
      this.datetime =  this.contact['BirthYear'] + '/' + this.contact['BirthMonth'] + '/' + this.contact['BirthDay']
    }

    if (this.contact['PublicPgpKey']) {
      await this.showKey(this.contact['PublicPgpKey'])
    }
    eventBus.$on('ContactsMobileWebclient::editContact', this.onEditContact)
    eventBus.$on('ContactsMobileWebclient::setPgpKey', this.setPgpKey)
    eventBus.$emit('ContactsMobileWebclient::setComponents', this.currentComponents)
  },

  watch: {
    async files() {
      if (this.files.length) {
        const filesList = []
        for (const file of this.files) {
          filesList.push(await file.text())
        }
        this.setFilesKeys(filesList)
        this.showImportKeys = true
      }
    },
    phoneSelectOptions: function (options) {
      if (options.length > 0 && this.isShowExtraFields) {
        const found = options.find(item => item.value === this.contact.PrimaryPhone)
        if (!found) {
          this.contact.PrimaryPhone = options[0].value
        }
      }
    },
    emailSelectOptions: function (options) {
      if (options.length > 0 && this.isShowExtraFields) {
        const found = options.find(item => item.value === this.contact.PrimaryEmail)
        if (!found) {
          this.contact.PrimaryEmail = options[0].value
        }
      }
    },
    addressSelectOptions: function (options) {
      if (options.length > 0 && this.isShowExtraFields) {
        const found = options.find(item => item.value === this.contact.PrimaryAddress)
        if (!found) {
          this.contact.PrimaryAddress = options[0].value
        }
      }
    },
  },

  computed: {
    ...mapGetters('contactsmobile', [
      'currentContact',
      'groupsList',
    ]),
    summaryPhoneLabel: function() {
      return this.$t('CONTACTSWEBCLIENT.LABEL_PHONE') + ' (' + phoneLabels[this.contact.PrimaryPhone] +')'
    },
    summaryEmailLabel: function() {
      return this.$t('COREWEBCLIENT.LABEL_EMAIL') + ' (' + emailLabels[this.contact.PrimaryEmail] +')'
    },
    summaryAddressLabel: function() {
      return this.$t('CONTACTSWEBCLIENT.LABEL_ADDRESS') + ' (' + addressLabels[this.contact.PrimaryAddress] +')'
    },
    phoneSelectOptions() {
      const options = []

      if (this.contact) {
        if (this.contact.PersonalMobile) { 
          options.push({ 'value': 0, 'label': phoneLabels[0] + ': ' + this.contact.PersonalMobile })
        }
  
        if (this.contact.PersonalPhone) {
          options.push({ 'value': 1, 'label': phoneLabels[1] + ': ' + this.contact.PersonalPhone })
        }
  
        if (this.contact.BusinessPhone) {
          options.push({ 'value': 2, 'label': phoneLabels[2] + ': ' + this.contact.BusinessPhone })
        }
  
        return options
      }
    },
    getPhoneNumber: {
      get() {
        let phone = ''

        switch (this.contact.PrimaryPhone) {
          case 0:
            phone = this.contact.PersonalMobile
            break
          case 1:
            phone = this.contact.PersonalPhone
            break
          case 2:
            phone = this.contact.BusinessPhone
            break
        }

        return phone
      },
      set(value) {
        switch (this.contact.PrimaryPhone) {
          case 0:
            this.contact.PersonalMobile = value
            break
          case 1:
            this.contact.PersonalPhone = value
            break
          case 2:
            this.contact.BusinessPhone = value
            break
        }
      },
    },
    emailSelectOptions() {
      const options = []

      if (this.contact) {
        if (this.contact.PersonalEmail) {
          options.push({ 'value': 0, 'label': emailLabels[0] + ': ' + this.contact.PersonalEmail })
        }

        if (this.contact.BusinessEmail) {
          options.push({ 'value': 1, 'label': emailLabels[1] + ': ' + this.contact.BusinessEmail })
        }

        if (this.contact.OtherEmail) {
          options.push({ 'value': 2, 'label': emailLabels[2] + ': ' + this.contact.OtherEmail })
        }

        return options
      }
    },
    getEmail: {
      get() {
        let email = ''

        switch (this.contact.PrimaryEmail) {
          case 0:
            email = this.contact.PersonalEmail
            break
          case 1:
            email = this.contact.BusinessEmail
            break
          case 2:
            email = this.contact.OtherEmail
            break
        }

        return email
      },
      set(value) {
        switch (this.contact.PrimaryEmail) {
          case 0:
            this.contact.PersonalEmail = value
            break
          case 1:
            this.contact.BusinessEmail = value
            break
          case 2:
            this.contact.OtherEmail = value
            break
        }
      }
    },
    addressSelectOptions() {
      const options = []

      if (this.contact) {
        if (this.contact.PersonalAddress) {
          options.push({'value': 0, 'label': addressLabels[0] + ': ' + this.contact.PersonalAddress})
        }

        if (this.contact.BusinessAddress) {
          options.push({'value': 1, 'label': addressLabels[1] + ': ' + this.contact.BusinessAddress})
        }

        return options
      }
    },
    getAddress: {
      get() {
        let address = ''

        switch (this.contact.PrimaryAddress) {
          case 0:
            address = this.contact.PersonalAddress
            break
          case 1:
            address = this.contact.BusinessAddress
            break
        }

        return address
      },
      set(value) {
        switch (this.contact.PrimaryAddress) {
          case 0:
            this.contact.PersonalAddress = value
            break
          case 1:
            this.contact.BusinessAddress = value
            break
        }
      },
    },
    getDatetime: {
      set(value) {
        this.contact.BirthYear = moment(value).format('YYYY')
        this.contact.BirthMonth = moment(value).format('MM')
        this.contact.BirthDay = moment(value).format('DD')
        this.datetime = value
      },
      get() {
        return this.datetime
      }
    }
  },
  methods: {
    ...mapActions('contactsmobile', ['asyncEditContact']),
    onImportPgpKeyFromFile() {
      this.$refs.fileInput.$el.click()
    },
    async showKey(key) {
      const keys = await OpenPgp.getKeysInfo(key)
      if (keys.length) {
        this.pgpKey = keys[0]
      }
    },
    onRemoveKey() {
      this.pgpKey = null
      this.contact['PublicPgpKey'] = ''
      this.contact['OpenPgpWebclient::PgpKey'] = ''
    },
    setPgpKey(pgpKey) {
      this.contact.PublicPgpKey = pgpKey
      this.showKey(pgpKey)
    },
    onImportPgpKeyFromText() {
      if (this.$refs?.ImportKeyForString) {
        this.$refs?.ImportKeyForString.openDialog(this.contact)
      }
    },
    async onEditContact() {
      const result = await this.asyncEditContact({
        Contact: this.contact
      })
    },
  },
  unmounted() {
    eventBus.$off('ContactsMobileWebclient::editContact', this.onEditContact)
    eventBus.$off('ContactsMobileWebclient::setPgpKey', this.setPgpKey)
  }
}
</script>

<style lang="scss">
.pgp-key {
  &__mail {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 2px;
  }
  &__info {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #969494;
  }
}

.q-field__label{
  font-size: 14px !important;
}

.q-date__header, .q-date__actions {
  display: none;
}

.q-field--filled .q-field__control {
  background: none;
  border-bottom: 1px solid rgba(0,0,0,0.25);
  padding: 0;
}
.q-field--with-bottom {
  padding: 0;
}

.q-field__control {
  height: 45px;
}
</style>
