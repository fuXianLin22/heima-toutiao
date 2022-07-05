<template>
  <i :class="['toutiao', `toutiao-${icon}`]"></i>
</template>

<script>
export default {
  name: 'TouTiaoIcon',
  props: {
    icon: {
      type: String
    }
  }
}
</script>

<style></style>
