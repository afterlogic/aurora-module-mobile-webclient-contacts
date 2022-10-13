<template>
  <main-layout>
    <q-scroll-area v-if="contact" :thumb-style="{width: '5px'}" class="contacts__list">
      <q-form class="q-px-lg q-py-md">
        <app-input dense v-model="contact.FullName" :label="$t('CONTACTSWEBCLIENT.LABEL_DISPLAY_NAME')" class="q-mb-xs contact__form-input" />
        <app-input dense v-model="contact.ViewEmail" :label="$t('COREWEBCLIENT.LABEL_EMAIL')" class="q-mb-xs contact__form-input" />
        <app-input dense v-if="!isShowExtraFields" v-model="getPhoneNumber" :label="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" class="q-mb-xs" />
        <div class="q-select-label">
          <q-select
              :display-value="`${typeof selection === 'number' ? phonesArray[selection]?.label : '' }`"
              @update:model-value="val => changePrimaryPhone(val)"
              @input:model-value="val => inputPrimaryPhone(val)"
              style="max-width: 700px"
              v-if="isShowExtraFields && phoneSelectOptions.length"
              clearable="false"
              v-model="selection"
              :options="phoneSelectOptions"
              stack-label
              emit-value
              map-options
              :label="$t('CONTACTSWEBCLIENT.LABEL_PHONE')"
              behavior="menu">
          </q-select>
          <div v-if="isShowExtraFields && !phoneSelectOptions.length">{{$t('CONTACTSMOBILEWEBCLIENT.LABEL_NO_PRIMARY_INFORMATION')}}</div>
        </div>
        <app-input dense v-model="contact.PersonalAddress" :label="$t('CONTACTSWEBCLIENT.LABEL_ADDRESS')" class="q-mb-xs contact__form-input" />
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
  </main-layout>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import { ref } from 'vue'
import eventBus from "src/event-bus";
import _ from 'lodash'

import MainLayout from 'src/layouts/MainLayout'
import AppInput from 'src/components/common/AppInput'
import AppCheckbox from 'src/components/common/AppCheckbox'
import OpenPgp from "../../../OpenPgpMobileWebclient/vue-mobile/openpgp-helper";
import ContactKeyIcon from "../components/icons/ContactKeyIcon";

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
      selection: ref(null),
    }
  },

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
  computed: {
    ...mapGetters('contactsmobile', [
        'currentContact',
        'groupsList',
    ]),
    phoneSelectOptions() {
      this.isNotTheFirstPhone = this.phonesArray.length

      this.addPhoneToArrayAndChooseSelection(0, 'Personal', this.contact.PersonalPhone)
      this.addPhoneToArrayAndChooseSelection(1, 'Mobile', this.contact.PersonalMobile)
      this.addPhoneToArrayAndChooseSelection(2, 'Business', this.contact.BusinessPhone)

      return this.phonesArray
    },
    getPhoneNumber: {
      get(){
        const personalPhone = this.contact.PersonalPhone
        const personalMobile = this.contact.PersonalMobile
        const businessPhone = this.contact.BusinessPhone
        const primaryPhone = this.contact.PrimaryPhone

        if (primaryPhone) {
          if(primaryPhone.toString() === personalPhone) {
            this.selection = ref(0)
            this.setCurrentPrimaryPhone(0, personalPhone)
          }
          if(primaryPhone.toString() === personalMobile) {
            this.selection = ref(1)
            this.setCurrentPrimaryPhone(1, personalMobile)
          }
          if(primaryPhone.toString() === businessPhone) {
            this.selection = ref(2)
            this.setCurrentPrimaryPhone(2, businessPhone)
          }
        }

        if (this.phonesArray.length >=1) {
          this.contact.PrimaryPhone = this.phonesArray[this.selection].data
        }

        return this.contact.PrimaryPhone
      },
      set(value){
        this.contact.PrimaryPhone = value
        this.currentPhoneAsPrimary.value = value

        switch(this.currentPhoneAsPrimary.index) {
          case 0: this.contact.PersonalPhone = value
            break
          case 1: this.contact.PersonalMobile = value
            break
          case 2: this.contact.BusinessPhone = value
            break
        }
      },
    },
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
  data: () => ({
    contact: null,
    isShowExtraFields: false,
    currentComponents: [],
    pgpKey: null,
    files: [],
    phonesArray: [],
    primaryPhoneType: 0,
    currentPhoneAsPrimary: {
      index: 0,
      value: '',
    },
    primaryPhoneInputValue: '',
    isNotTheFirstPhone: false,
  }),
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
    inputPrimaryPhone(val) {
      this.contact.PrimaryPhone = this.phonesArray[val].data
    },
    addPhoneToArrayAndChooseSelection(index, label, phone) {
      if (!phone) {
        return
      }

      this.phonesArray[index] = {
        label: label + ': ' + phone?.toString(),
        data: phone,
        value: index
      }
      this.setCurrentPrimaryPhone(index, phone)

      this.chooseSelection(index)
    },
    chooseSelection(index) {
      if (!this.isNotTheFirstPhone && !this.contact.PrimaryPhone) {
        this.selection = ref(index)
      }
      this.isNotTheFirstPhone = true
    },
    setCurrentPrimaryPhone(index, phone) {
      this.currentPhoneAsPrimary.index = index
      this.currentPhoneAsPrimary.value = phone
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
