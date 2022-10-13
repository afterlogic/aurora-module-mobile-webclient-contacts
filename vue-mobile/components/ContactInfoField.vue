<template>
  <q-item class="contact-field">
    <div class="contact-field__icon">
      <contact-info-icon :icon="icon" />
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
      <contact-field-action-icon :icon="itemActionIcon" />
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
    caption: String,
    icon: { type: String, default: '' },
    value: String,
    itemActionIcon: { type: String, default: '' }
  }
};
</script>
