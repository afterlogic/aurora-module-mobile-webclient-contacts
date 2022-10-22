<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <q-btn icon="chevron_left" @click="onPreviousPage" color="black" flat round dense />
    </div>

    <div class="col app-header__title">
      <span class="app-header__title-main">
        {{ $t('CONTACTSMOBILEWEBCLIENT.HEADING_VIEW_GROUP') }}
      </span>
      <span class="app-header__title-secondary">
      </span>
    </div>

    <div class="col app-header__right">
      <ActionIcon
        class="q-mr-md"
        color="black"
        icon="EditIcon"
        @click="editGroup"
      />
      <ActionIcon
        class="q-mr-md"
        color="black"
        icon="DeleteIcon"
        @click="onPerformAction"
      />
    </div>
  </q-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import notification from 'src/utils/notification'

import ActionIcon from '../common/ActionIcon'
import { contactActions } from '../../utils/contact-actions'

export default {
  name: 'GroupViewHeader',

  components: {
    ActionIcon
  },

  data() {
    return {
      actions: contactActions,
    }
  },

  computed: {
    ...mapGetters('contactsmobile', [
      'currentGroup',
    ]),
    groupName() {
      return this.currentGroup.name || ''
    },
  },

  methods: {
    ...mapActions('contactsmobile', ['changeDialogComponent']),
    onPreviousPage() {
      this.$router.back()
    },
    editGroup() {
      this.$router.push({ name: 'group-edit', params: { contactId: this.currentGroup.UUID } })
    },
    isShowAction(action) {
      return action.isShowAction(action.name, this.currentGroup)
    },

    onPerformAction(action) {
      notification.showReport('Comming soon')
      // if (action.method) {
      //   const result = await action.method(this.currentGroup)
      //   if (result) {
      //     if (action.name === 'share' || action.name === 'unshare') {
      //       this.$router.push('/contacts')
      //     }
      //   }
      // }
      // if (action.component) {
      //   this.changeDialogComponent({ component: action.component })
      // }
    },
  },
};
</script>
