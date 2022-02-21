<template>
  <q-toolbar style="height: 55px;" class="justify-between">
    <q-btn
      flat
      size="15px"
      color="black"
      round
      dense
      icon="chevron_left"
      @click="onPreviousPage"
    />

    <div class="flex column">
      <span
        class="text-black text-bold text-center"
        style="font-size: 17px;"
      >
        {{ $t('CONTACTSWEBCLIENT.HEADING_BROWSER_TAB') }}
      </span>
      <span
        :style="{ 'margin-top': '-5px' }"
        class="text-black text-center text-blue-grey-12"
      >
        {{ storageName }}
      </span>
    </div>

    <div class="flex justify-end">
      <div class="dropdown-more flex justify-center items-center">
        <q-btn-dropdown :menu-offset="[8, -45]" flat unelevated dense>
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
              @click="onPerformAction(actions.edit)"
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
import { mapGetters } from 'vuex'

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
    ...mapGetters('contactsmobile', ['contactsList', 'currentStorage']),
    storageName() {
      return this.currentStorage.Id
    },
  },
  watch: {
    'contactsList.length'() {
      this.onPreviousPage()
    },
  },
  methods: {
    onPreviousPage() {
      this.$router.back()
    },
    onPerformAction(action) {
      if (action.method) {
        action.method(this.$store)
      }
    },
  },
};
</script>

<style>
.dropdown-more .q-btn-dropdown__arrow {
  display: none;
}
</style>
