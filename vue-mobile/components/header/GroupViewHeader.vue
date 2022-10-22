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
        v-if="isShowAction(actions.deleteGroup)"
        class="q-mr-md"
        color="black"
        :icon="actions.deleteGroup.icon"
        @click="onPerformAction(actions.deleteGroup)"
      />
    </div>
  </q-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import notification from 'src/utils/notification'

import ActionIcon from '../common/ActionIcon'
import { getGroupActions } from '../../utils/group-actions'

export default {
  name: 'GroupViewHeader',

  components: {
    ActionIcon
  },

  data() {
    return {
      actions: getGroupActions(),
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
    ...mapActions('contactsmobile', [
      'changeDialogComponent'
    ]),
    onPreviousPage() {
      this.$router.back()
    },
    editGroup() {
      this.$router.push({ name: 'group-edit', params: { contactId: this.currentGroup.UUID } })
    },
    isShowAction(action) {
      return action.isShowAction(action.name, this.currentGroup)
    },
    async onPerformAction(action) {
      // notification.showReport('Comming soon')
      // console.log('onPerformAction', action)
      if (action.getComponent) {
        this.changeDialogComponent({ getComponent: action.getComponent})
      } else if (action.component) {
        this.changeDialogComponent({ component: action.component })
      }
      else if (action.method) {
        await action.method(this.currentGroup)
        if (result) {
          this.$router.push({ name: 'contact-list' })
        }
      }
    },
  },
};
</script>
