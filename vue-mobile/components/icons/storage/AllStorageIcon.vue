<template>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.47853 11.5H5.55924C5.73779 9.54208 6.13333 8.89534 6.32925 8.69932C6.46791 8.56061 6.61801 8.5 7.49999 8.5C8.38976 8.5 8.6301 8.56015 8.80694 8.72772C8.99024 8.90142 9.40677 9.5183 9.47853 11.5Z" :fill="color" :stroke="color" stroke-width="3"/>
    <circle cx="7.5" cy="4.5" r="1.5" :fill="color"/>
    <path d="M11.6953 8H11C12.6667 10.5 12 13 12 13L14.7204 12.9994C14.917 12.9994 15.0371 12.6311 14.9897 12.2589C14.6291 9.44476 13.1895 8 11.6953 8Z" :fill="color"/>
    <circle r="1.5" transform="matrix(-1 0 0 1 11.5 5.5)" :fill="color"/>
    <path d="M3.30469 8H4C2.33333 10.5 3 13 3 13L0.279578 12.9994C0.0830324 12.9994 -0.0370732 12.6311 0.0103382 12.2589C0.370948 9.44476 1.81052 8 3.30469 8Z" :fill="color"/>
    <circle cx="3.5" cy="5.5" r="1.5" :fill="color"/>
  </svg>
</template>

<script>
export default {
  name: "AllStorageIcon",
  props: {
    color: { type: String, default: '#969494' }
  }
}
</script>
