<template>
  <q-item style="padding-right: 0">
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
      <contact-item-action-icon :icon="itemActionIcon" />
    </q-item-section>
  </q-item>
</template>

<script>
import ContactInfoIcon from "./ContactInfoIcon";
import ContactItemActionIcon from "./ContactItemActionIcon";

export default {
  name: 'ContactInfoListItem',
  components: {
    ContactInfoIcon,
    ContactItemActionIcon
  },
  props: {
    caption: String,
    icon: String,
    value: String,
    itemActionIcon: String
  }
};
</script>
