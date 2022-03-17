<template>
  <q-item>
    <q-item-section avatar>
      <contact-info-icon :icon="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
      <q-item-label>
        {{ value }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-icon name="info" color="green" />
    </q-item-section>
  </q-item>
</template>

<script>
import ContactInfoIcon from "./ContactInfoIcon";

export default {
  name: 'ContactInfoListItem',
  components: {
    ContactInfoIcon
  },
  props: {
    caption: String,
    icon: String,
    value: String,
  }
};
</script>
