<template>
  <q-toolbar style="height: 55px;">
    <div class="col-2">
      <q-btn
          flat
          size="15px"
          color="black"
          round
          dense
          icon="chevron_left"
          @click="onPreviousPage"
      />
    </div>

    <div class="col-8 flex column">
      <span
        class="header-title text-black text-center"
      >
        {{ $t('CONTACTSWEBCLIENT.HEADING_BROWSER_TAB') }}
      </span>
      <span
        :style="{ 'margin-top': '5px' }"
        class="text-center header-caption"
      >
        {{ storageName }}
      </span>
    </div>

    <div class="col-2 flex justify-end">
      <div class="dropdown-more flex justify-center items-center">
        <q-btn-dropdown :menu-offset="[12, -41]" flat unelevated dense>
          <template v-slot:label>
            <action-icon class="q-mr-sm" icon="MoreIcon" />
          </template>
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="onPerformAction(actions.findInEmail)"
            >
              <action-icon class="q-mr-md" :icon="actions.findInEmail.icon" />
              <q-item-section>
                <q-item-label>
                  {{ actions.findInEmail.displayName }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-if="isShowAction(actions.share)"
              v-close-popup
              @click="onPerformAction(actions.share)"
            >
              <action-icon class="q-mr-md" :icon="actions.share.icon" />
              <q-item-section>
                <q-item-label>
                  {{actions.share.displayName }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
                clickable
                v-if="isShowAction(actions.unshare)"
                v-close-popup
                @click="onPerformAction(actions.unshare)"
            >
              <action-icon class="q-mr-md" :icon="actions.unshare.icon" />
              <q-item-section>
                <q-item-label>
                  {{actions.unshare.displayName }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="onPerformAction(actions.send)"
            >
              <action-icon class="q-mr-md" :icon="actions.send.icon" />
              <q-item-section>
                <q-item-label>
                  {{ actions.send.displayName }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              @click="editContact"
            >
              <action-icon class="q-mr-md" :icon="actions.edit.icon" />
              <q-item-section>
                <q-item-label>
                  {{ actions.edit.displayName }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              v-if="isShowAction(actions.delete)"
              @click="onPerformAction(actions.delete)"
            >
              <action-icon class="q-mr-md" :icon="actions.delete.icon" />
              <q-item-section>
                <q-item-label>
                  {{ actions.delete.displayName }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
  </q-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ActionIcon from "../common/ActionIcon";
import { contactActions } from '../../utils/contact-actions';

export default {
  name: 'ContactHeader',
  components: {
    ActionIcon
  },
  data() {
    return {
      actions: contactActions,
    }
  },
  computed: {
    ...mapGetters('contactsmobile', ['contactsList', 'currentStorage', 'currentContact']),
    storageName() {
      if (!this.currentStorage) return ''
      if (this.currentStorage?.DisplayName) return this.currentStorage.DisplayName
      let storage = this.currentStorage.Id
      if (!storage) return ''
      if (storage === 'collected') return 'Collected'
      storage = this.$t(`CONTACTSWEBCLIENT.LABEL_STORAGE_${storage.toUpperCase()}`)
      return storage
    },
  },
  watch: {
    'contactsList.length'() {
      this.onPreviousPage()
    },
  },
  methods: {
    ...mapActions('contactsmobile', ['changeDialogComponent']),
    onPreviousPage() {
      this.$router.back()
    },
    async onPerformAction(action) {
      if (action.method) {
        const result = await action.method(this.currentContact)
        if (result) {
          if (action.name === 'share' || action.name === 'unshare') {
            this.$router.push('/contacts')
          }
        }
      }
      if (action.component) {
        this.changeDialogComponent({ component: action.component })
      }
    },
    editContact() {
      console.log('editContact')
      this.$router.push(`/contact/${this.currentContact.UUID}/edit`)
    },
    isShowAction(action) {
      return action.isShowAction(action.name, this.currentContact)
    }
  },
};
</script>

<style>
.dropdown-more .q-btn-dropdown__arrow {
  display: none;
}
</style>
