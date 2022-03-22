<template>
  <main-layout>
    <q-scroll-area :thumb-style="{width: '5px'}" class="contacts__list">
      <q-form class="q-px-lg q-py-md">
        <app-input v-model="Group.Name" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_GROUP_NAME')" class="q-mb-sm" />

        <app-toggle :label="$t('CONTACTSWEBCLIENT.LABEL_GROUP_IS_COMPANY')" v-model="Group.IsOrganization" :value="Group.IsOrganization" />

        <template v-if="Group.IsOrganization">
          <app-input v-model="Group.Email" :placeholder="$t('COREWEBCLIENT.LABEL_EMAIL')" />
          <app-input v-model="Group.Company" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_COMPANY')" />
          <app-input v-model="Group.Country" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_COUNTRY_REGION')" />
          <app-input v-model="Group.State" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_STATE_PROVINCE')" />
          <app-input v-model="Group.City" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_CITY')" />
          <app-input v-model="Group.Street" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_STREET')" />
          <app-input v-model="Group.Zip" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_ZIP_CODE')" />
          <app-input v-model="Group.Phone" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_PHONE')" />
          <app-input v-model="Group.Fax" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_FAX')" />
          <app-input v-model="Group.Web" :placeholder="$t('CONTACTSWEBCLIENT.LABEL_WEB_PAGE')" />
        </template>
      </q-form>
    </q-scroll-area>
  </main-layout>
</template>

<script>
import { mapActions } from 'vuex'

import MainLayout from 'src/layouts/MainLayout'
import AppInput from 'src/components/common/AppInput'
import AppToggle from "src/components/common/AppToggle";

export default {
  name: 'AddGroup',

  components: {
    MainLayout,
    AppInput,
    AppToggle
  },

  data() {
    return {
      Group: {
        Name: '',
        IsOrganization: 0,
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
    Group: {
      handler(value) {
        this.changeNewGroup({...value})
      },
      deep: true
    }
  },
}
</script>
