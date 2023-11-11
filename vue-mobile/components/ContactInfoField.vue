<template>
  <q-item class="contact-field" v-if="value">
    <div class="contact-field__icon">
      <ContactInfoIcon :icon="icon" />
    </div>

    <q-item-section>
      <q-item-label class="contact-field__caption">
        {{ caption }}
      </q-item-label>
      <q-item-label class="contact-field__value">
        {{ value }}
      </q-item-label>
    </q-item-section>

    <q-item-section class="contact-field__action" side>
      <ContactFieldActionIcon :icon="itemActionIcon" />
    </q-item-section>
  </q-item>
</template>

<script>
import ContactInfoIcon from './ContactInfoIcon'
import ContactFieldActionIcon from './ContactFieldActionIcon'

export default {
  name: 'ContactInfoField',
  components: {
    ContactInfoIcon,
    ContactFieldActionIcon
  },
  props: {
    caption: { type: String, default: '' },
    icon: { type: String, default: '' },
    value: { type: String, default: '' },
    itemActionIcon: { type: String, default: '' }
  }
};
</script>
