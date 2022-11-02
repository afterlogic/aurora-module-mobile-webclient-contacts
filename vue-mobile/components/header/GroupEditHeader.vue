 <template>
  <q-toolbar class="app-header">
    <div class="col app-header__left">
      <q-btn icon="close" @click="onPreviousPage" color="black" flat round dense />
    </div>

    <div class="col app-header__title" v-if="isNewGroup">
      {{ $t('CONTACTSMOBILEWEBCLIENT.HEADING_ADD_GROUP') }}
    </div>
    <div class="col app-header__title" v-else>
      {{ $t('CONTACTSMOBILEWEBCLIENT.HEADING_EDIT_GROUP') }}
    </div>

    <div class="col app-header__right">
      <q-btn @click="onCreateGroup" color="primary" size="12px" no-caps flat dense>
        {{ $t('COREWEBCLIENT.ACTION_SAVE') }}
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script>
import eventBus from 'src/event-bus'

export default {
  name: 'GroupEditHeader',

  computed: {
    isNewGroup() {
      return this.$router.currentRoute.value.name === 'group-create'
    }
  },

  methods: {
    onPreviousPage() {
      this.$router.back()
    },
    onCreateGroup() {
      eventBus.$emit('ContactsMobileWebclient::saveGroup')
    }
  },

}
</script>
