<template>
  <svg :width="width" :height="height" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_306_1969)">
      <path d="M1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5Z" stroke="black" stroke-width="2"/>
      <path d="M11.0021 10.9955L16 16" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <defs>
      <clipPath id="clip0_306_1969">
        <rect width="16" height="16" fill="white"/>
      </clipPath>
    </defs>
  </svg>
</template>

<script>
export default {
  name: 'FindInEmailIcon',
  props: {
    width: { type: Number, default: 16 },
    height: { type: Number, default: 16 },
  }
};
</script>
