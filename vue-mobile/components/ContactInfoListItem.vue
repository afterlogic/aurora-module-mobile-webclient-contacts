<template>
  <q-item>
    <q-item-section avatar>
      <q-icon color="primary" :name="icon" />
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
export default {
  name: 'ContactInfoListItem',

  props: {
    caption: String,
    icon: String,
    value: String,
  }
};
</script>
