<template>
  <div class="flex items-center justify-center caption full-height full-width">
    <div class="caption__box">
      <div class="q-mb-md">
        <ContactIcon />
      </div>
      <div>
        {{ $t('CONTACTSMOBILEWEBCLIENT.LABEL_EMPTY_CONTACTS') }}
      </div>
    </div>
  </div>
</template>

<script>
import ContactIcon from './icons/ContactIcon'

export default {
  name: 'EmptyContacts',
  components: {
    ContactIcon,
  },
};
</script>

<style lang="scss" scoped>
.caption {
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  color: #969494;
}
</style>
