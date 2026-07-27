<template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <AppHeaderButton
        data-test-id="contacts-group-view-back"
        icon="chevron_left"
        @click="onPreviousPage"
      />
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
        data-test-id="contacts-group-view-edit"
        class="q-mr-md"
        color="black"
        icon="EditIcon"
        @click="editGroup"
      />
      <ActionIcon
        v-if="isShowAction(actions.deleteGroup)"
        data-test-id="contacts-group-view-delete"
        class="q-mr-md"
        color="black"
        :icon="actions.deleteGroup.icon"
        @click="onPerformAction(actions.deleteGroup)"
      />
    </div>
  </q-toolbar>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'pinia'
import { useContactsStore } from '../../store/index-pinia.js'

import ActionIcon from '../common/ActionIcon'
import AppHeaderButton from 'src/components/common/AppHeaderButton'
import { getGroupActions } from '../../utils/group-actions'

export default {
  name: 'GroupViewHeader',

  components: {
    ActionIcon,
    AppHeaderButton,
  },

  data() {
    return {
      actions: getGroupActions(),
    }
  },

  computed: {
    ...mapState(useContactsStore, ['currentGroup']),
    groupName() {
      return this.currentGroup?.name || ''
    },
  },

  methods: {
    ...mapActions(useContactsStore, [
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
