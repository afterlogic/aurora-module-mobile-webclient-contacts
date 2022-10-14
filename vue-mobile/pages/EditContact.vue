<template>
  <div style="height: 100%">
    <q-scroll-area v-if="contact" :thumb-style="{width: '5px'}" class="contacts__list">
      <q-form class="q-px-lg q-py-md">
        <app-input dense v-model="contact.FullName" :label="$t('CONTACTSWEBCLIENT.LABEL_DISPLAY_NAME')" class="q-mb-xs contact__form-input" />

        <app-input dense v-if="!isShowExtraFields" v-model="getEmail" :label="$t('COREWEBCLIENT.LABEL_EMAIL')" class="q-mb-xs contact__form-input" />
        <div class="q-select-label">
          <q-select
            :display-value="`${typeof selection.emailSelection === 'number' ? emailsArray[selection.emailSelection]?.label : '' }`"
            @update:model-value="val => changePrimaryEmail(val)"
            @input:model-value="val => changePrimaryPhone(val)"
            style="max-width: 700px"
            v-if="isShowExtraFields && emailSelectOptions.length"
            clearable="false"
            v-model="selection.emailSelection"
            :options="emailSelectOptions"
            stack-label
            emit-value
            map-options
            :label="$t('COREWEBCLIENT.LABEL_EMAIL')"
            behavior="menu">
        </q-select>
          <div v-if="isShowExtraFields && !emailSelectOptions.length">{{$t('CONTACTSMOBILEWEBCLIENT.LABEL_NO_PRIMARY_INFORMATION')}}</div>
        </div>

        <app-input dense v-if="!isShowExtraFields" v-model="getPhoneNumber" :label="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" class="q-mb-xs" />
        <div class="q-select-label">
          <q-select
              :display-value="`${typeof selection.phoneSelection === 'number' ? phonesArray[selection.phoneSelection]?.label : '' }`"
              @update:model-value="val => changePrimaryPhone(val)"
              @input:model-value="val => changePrimaryPhone(val)"
              style="max-width: 700px"
              v-if="isShowExtraFields && phoneSelectOptions.length"
              clearable="false"
              v-model="selection.phoneSelection"
              :options="phoneSelectOptions"
              stack-label
              emit-value
              map-options
              :label="$t('CONTACTSWEBCLIENT.LABEL_PHONE')"
              behavior="menu">
          </q-select>
          <div v-if="isShowExtraFields && !phoneSelectOptions.length">{{$t('CONTACTSMOBILEWEBCLIENT.LABEL_NO_PRIMARY_INFORMATION')}}</div>
        </div>

        <app-input dense v-if="!isShowExtraFields" v-model="getAddress" :label="$t('CONTACTSWEBCLIENT.LABEL_ADDRESS')" class="q-mb-xs contact__form-input" />
        <div class="q-select-label">
          <q-select
              :display-value="`${typeof selection.addressSelection === 'number' ? addressArray[selection.addressSelection]?.label : '' }`"
              @update:model-value="val => changePrimaryAddress(val)"
              @input:model-value="val => changePrimaryAddress(val)"
              style="max-width: 700px"
              v-if="isShowExtraFields && addressSelectOptions.length"
              clearable="false"
              v-model="selection.addressSelection"
              :options="addressSelectOptions"
              stack-label
              emit-value
              map-options
              :label="$t('CONTACTSWEBCLIENT.LABEL_ADDRESS')"
              behavior="menu">
          </q-select>
          <div v-if="isShowExtraFields && !addressSelectOptions.length">{{$t('CONTACTSMOBILEWEBCLIENT.LABEL_NO_PRIMARY_INFORMATION')}}</div>
        </div>

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
          <app-input dense v-model="contact.BirthDay" :label="$t('CONTACTSWEBCLIENT.LABEL_BIRTHDAY')" class="q-mb-xs contact__form-input" />
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
            v-bind:key="group.UUID"
            v-for="group in groupsList"
            leftLabel
            :label="group.Name"
            :val="group.UUID"
            v-model="contact.GroupUUIDs"
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
import { ref } from 'vue'
import eventBus from 'src/event-bus'
import _ from 'lodash'

import MainLayout from 'src/layouts/MainLayout'
import AppInput from 'src/components/common/AppInput'
import AppCheckbox from 'src/components/common/AppCheckbox'
import OpenPgp from '../../../OpenPgpMobileWebclient/vue-mobile/openpgp-helper'
import ContactKeyIcon from '../components/icons/ContactKeyIcon'

export default {
  name: "EditContact",

  components: {
    ContactKeyIcon,
    MainLayout,
    AppInput,
    AppCheckbox
  },

  data: () => ({
    contact: null,
    isShowExtraFields: false,
    currentComponents: [],
    pgpKey: null,
    files: [],
    phonesArray: [],
    emailsArray: [],
    addressArray: [],
    currentPhoneAsPrimary: {
      index: 0,
      value: '',
    },
    currentEmailAsPrimary: {
      index: 0,
      value: '',
    },
    currentAddressAsPrimary: {
      index: 0,
      value: '',
    },
    isNotTheFirstPhone: false,
    isNotTheFirstEmail: false,
    isNotTheFirstAddress: false,
    selection: {
      phoneSelection: ref(null),
      emailSelection: ref(null),
      addressSelection: ref(null),
    },
  }),

  async mounted() {
    if (_.isEmpty(this.currentContact)) {
      this.$router.push('/contacts')
    }
    this.contact = _.cloneDeep(this.currentContact)
    this.contact['PublicPgpKey'] = this.contact['OpenPgpWebclient::PgpKey'] || ''
    this.contact['PgpSignMessages'] = this.contact['PgpSignMessages'] || false
    this.contact['PgpEncryptMessages'] = this.contact['PgpEncryptMessages'] || false

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
  },

  computed: {
    ...mapGetters('contactsmobile', [
      'currentContact',
      'groupsList',
    ]),
    phoneSelectOptions() {
      this.isNotTheFirstPhone = this.phonesArray.length

      this.addObjectToArrayAndChooseSelection(0, 'Personal', this.contact.PersonalPhone, this.currentPhoneAsPrimary, this.isNotTheFirstPhone, this.contact.PrimaryPhone, 'phoneSelection', 'PrimaryPhone', this.phonesArray)
      this.addObjectToArrayAndChooseSelection(1, 'Mobile', this.contact.PersonalMobile, this.currentPhoneAsPrimary, this.isNotTheFirstPhone, this.contact.PrimaryPhone, 'phoneSelection', 'PrimaryPhone', this.phonesArray)
      this.addObjectToArrayAndChooseSelection(2, 'Business', this.contact.BusinessPhone, this.currentPhoneAsPrimary, this.isNotTheFirstPhone, this.contact.PrimaryPhone, 'phoneSelection', 'PrimaryPhone', this.phonesArray)

      return this.phonesArray
    },
    getPhoneNumber: {
      get() {
        const personalPhone = this.contact.PersonalPhone
        const personalMobile = this.contact.PersonalMobile
        const businessPhone = this.contact.BusinessPhone
        const primaryPhone = this.contact.PrimaryPhone

        if (primaryPhone) {
          if (primaryPhone.toString() === personalPhone) {
            this.selection.phoneSelection = ref(0)
            this.setCurrentPrimaryObject(0, personalPhone, this.currentPhoneAsPrimary, 'PrimaryPhone')
          }
          if (primaryPhone.toString() === personalMobile) {
            this.selection.phoneSelection = ref(1)
            this.setCurrentPrimaryObject(1, personalMobile, this.currentPhoneAsPrimary, 'PrimaryPhone')
          }
          if (primaryPhone.toString() === businessPhone) {
            this.selection.phoneSelection = ref(2)
            this.setCurrentPrimaryObject(2, businessPhone, this.currentPhoneAsPrimary, 'PrimaryPhone')
          }
        }

        if (this.phonesArray.length >= 1) {
          this.contact.PrimaryPhone = this.phonesArray[this.selection.phoneSelection].data || ''
        }

        return this.contact.PrimaryPhone
      },
      set(value) {
        this.contact.PrimaryPhone = value
        this.currentPhoneAsPrimary.value = value

        switch (this.currentPhoneAsPrimary.index) {
          case 0:
            this.contact.PersonalPhone = value
            break
          case 1:
            this.contact.PersonalMobile = value
            break
          case 2:
            this.contact.BusinessPhone = value
            break
        }
      },
    },
    emailSelectOptions() {
      this.isNotTheFirstEmail = this.emailsArray.length

      this.addObjectToArrayAndChooseSelection(0, 'Home', this.contact.PersonalEmail, this.currentEmailAsPrimary, this.isNotTheFirstEmail, this.contact.PrimaryEmail, 'emailSelection', 'PrimaryEmail', this.emailsArray)
      this.addObjectToArrayAndChooseSelection(1, 'Business', this.contact.BusinessEmail, this.currentEmailAsPrimary, this.isNotTheFirstEmail, this.contact.PrimaryEmail, 'emailSelection', 'PrimaryEmail', this.emailsArray)
      this.addObjectToArrayAndChooseSelection(2, 'Other', this.contact.OtherEmail, this.currentEmailAsPrimary, this.isNotTheFirstEmail, this.contact.PrimaryEmail, 'emailSelection', 'PrimaryEmail', this.emailsArray)

      return this.emailsArray
    },
    getEmail: {
      get() {
        const personalEmail = this.contact.PersonalEmail
        const businessEmail = this.contact.BusinessEmail
        const otherEmail = this.contact.OtherEmail
        const primaryEmail = this.contact.PrimaryEmail

        if (primaryEmail) {
          if (primaryEmail.toString() === personalEmail) {
            this.selection.emailSelection = ref(0)
            this.setCurrentPrimaryObject(0, personalEmail, this.currentEmailAsPrimary, 'PrimaryEmail')
          }
          if (primaryEmail.toString() === businessEmail) {
            this.selection.emailSelection = ref(1)
            this.setCurrentPrimaryObject(1, businessEmail, this.currentEmailAsPrimary, 'PrimaryEmail')
          }
          if (primaryEmail.toString() === otherEmail) {
            this.selection.emailSelection = ref(2)
            this.setCurrentPrimaryObject(2, otherEmail, this.currentEmailAsPrimary, 'PrimaryEmail')
          }
        }

        if (this.emailsArray.length >= 1) {
          this.contact.PrimaryEmail = this.emailsArray[this.selection.emailSelection].data
        }

        return this.contact.PrimaryEmail
      },
      set(value) {
        this.contact.PrimaryEmail = value
        this.currentEmailAsPrimary.value = value

        switch (this.currentEmailAsPrimary.index) {
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
      this.isNotTheFirstAddress = this.addressArray.length

      this.addObjectToArrayAndChooseSelection(0, 'Home', this.contact.PersonalAddress, this.currentAddressAsPrimary, this.isNotTheFirstAddress, this.contact.PrimaryAddress, 'addressSelection', 'PrimaryAddress', this.addressArray)
      this.addObjectToArrayAndChooseSelection(1, 'Business', this.contact.BusinessAddress, this.currentAddressAsPrimary, this.isNotTheFirstAddress, this.contact.PrimaryAddress, 'addressSelection', 'PrimaryAddress', this.addressArray)

      return this.addressArray
    },
    getAddress: {
      get() {
        const personalAddress = this.contact.PersonalAddress
        const businessAddress = this.contact.BusinessAddress
        const primaryAddress = this.contact.PrimaryAddress

        if (primaryAddress) {
          if (primaryAddress.toString() === personalAddress) {
            this.selection.addressSelection = ref(0)
            this.setCurrentPrimaryObject(0, personalAddress, this.currentAddressAsPrimary, 'PrimaryAddress')
          }
          if (primaryAddress.toString() === businessAddress) {
            this.selection.addressSelection = ref(1)
            this.setCurrentPrimaryObject(1, businessAddress, this.currentAddressAsPrimary, 'PrimaryAddress')
          }
        }

        if (this.addressArray.length >= 1) {
          this.contact.PrimaryAddress = this.addressArray[this.selection.addressSelection].data
        }

        return this.contact.PrimaryAddress
      },
      set(value) {
        this.contact.PrimaryAddress = value
        this.currentAddressAsPrimary.value = value

        switch (this.currentAddressAsPrimary.index) {
          case 0:
            this.contact.PersonalAddress = value
            break
          case 1:
            this.contact.BusinessAddress = value
            break
        }
      },
    },
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
    changePrimaryPhone(val) {
      this.contact.PrimaryPhone = this.phonesArray[val].data
    },
    changePrimaryEmail(val) {
      this.contact.PrimaryEmail = this.emailsArray[val].data
    },
    changePrimaryAddress(val) {
      this.contact.PrimaryAddress = this.addressArray[val].data
    },
    addObjectToArrayAndChooseSelection(index, label, object, currentPrimaryObject, isNotTheFirstObject, primaryObject, select, primaryObjectLabel, ObjectsArray) {
      if (!object) {
        return
      }

      ObjectsArray[index] = {
        label: label + ': ' + object?.toString(),
        data: object,
        value: index
      }
      this.setCurrentPrimaryObject(index, object, currentPrimaryObject, primaryObjectLabel)
      this.chooseSelection(index, isNotTheFirstObject, primaryObject, select)
    },
    chooseSelection(index, isNotTheFirstObject, primaryObject, select) {
      if (!isNotTheFirstObject && !primaryObject) {
        this.selection[select] = ref(index)
      }

      isNotTheFirstObject = true
    },
    setCurrentPrimaryObject(index, object, currentPrimaryObject, primaryObjectLabel) {
      currentPrimaryObject.index = index
      currentPrimaryObject.value = object
      this.contact[primaryObjectLabel] = object
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
</style>
