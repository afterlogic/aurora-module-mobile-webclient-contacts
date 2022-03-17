<template>
  <q-item style="padding-right: 0">

    <div class="flex items-center q-mr-md">
      <contact-info-icon :icon="icon" />
    </div>

    <q-item-section>
      <q-item-label class="contact__caption">
        {{ caption }}
      </q-item-label>
      <q-item-label class="contact__info-value">
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
<style scoped>
.contact__caption {
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #969494;
}
.contact__info-value {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
}
</style>
