<template>
  <div
    class="action-icon flex justify-center items-center"
    :style="iconStyle"
  >
    <component :is="icon" :color="color" />
  </div>
</template>

<script>
import FindInEmailIcon from "../icons/contact-actions/FindInEmailIcon";
import SharingIcon from "../icons/contact-actions/SharingIcon";
import SendIcon from "../icons/contact-actions/SendIcon";
import EditIcon from "../icons/contact-actions/EditIcon";
import DeleteIcon from "../icons/contact-actions/DeleteIcon";
import MoreIcon from "../icons/contact-actions/MoreIcon";
import MailIcon from "../icons/contact-actions/MailIcon";
import InfoIcon from "../icons/contact-actions/InfoIcon";

export default {
  name: 'ActionIcon',
  props: {
    icon: { type: String, required: true },
    color: { type: String, default: 'currentColor' },
  },
  components: {
    FindInEmailIcon,
    SharingIcon,
    SendIcon,
    EditIcon,
    DeleteIcon,
    MoreIcon,
    MailIcon,
    InfoIcon,
  },
  computed: {
    iconStyle() {
      return this.color ? { color: this.color } : null
    },
  },
}
</script>

<style scoped>
.action-icon {
  width: 16px;
}
</style>
