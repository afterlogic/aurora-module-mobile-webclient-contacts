<template>
  <div class="caption flex items-center justify-center">
    <div class="flex column caption__box">
      <div class="q-mb-md">
        <contact-icon />
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
  &__box {
    margin-top: 266px;
  }
}
</style>
