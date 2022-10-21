<template>
  <q-scroll-area :thumb-style="{width: '5px'}" class="contacts__list">
    <q-form class="q-px-lg q-py-md">
      <AppInput v-model="group.Name" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_GROUP_NAME')" class="q-mb-sm" />

      <AppToggle :label="$t('CONTACTSWEBCLIENT.LABEL_GROUP_IS_COMPANY')" v-model="group.IsOrganization" :value="group.IsOrganization" />

      <template v-if="group.IsOrganization">
        <AppInput v-model="group.Email" :placeholder="$t('COREWEBCLIENT.LABEL_EMAIL')" />
        <AppInput v-model="group.Company" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_COMPANY')" />
        <AppInput v-model="group.Country" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" />
        <AppInput v-model="group.State" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" />
        <AppInput v-model="group.City" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_CITY')" />
        <AppInput v-model="group.Street" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_STREET')" />
        <AppInput v-model="group.Zip" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" />
        <AppInput v-model="group.Phone" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" />
        <AppInput v-model="group.Fax" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_FAX')" />
        <AppInput v-model="group.Web" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" />
      </template>
    </q-form>
  </q-scroll-area>
</template>

<script>
import { mapActions } from 'vuex'

import AppInput from 'src/components/common/AppInput'
import AppToggle from 'src/components/common/AppToggle'

export default {
  name: 'EditGroup',

  components: {
    AppInput,
    AppToggle
  },

  data() {
    return {
      group: {
        Name: '',
        IsOrganization: false,
        Email: '',
        Country: '',
        City: '',
        Company: '',
        Fax: '',
        Phone: '',
        State: '',
        Street: '',
        Web: '',
        Zip: '',
      }
    }
  },

  methods: {
    ...mapActions('contactsmobile', [ 'changeNewGroup' ]),
  },

  watch: {
    group: {
      handler(value) {
        //this.changeNewGroup({...value})
      },
      deep: true
    }
  },
}
</script>
