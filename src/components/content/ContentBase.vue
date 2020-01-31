<template>
  <div class="content-base">
    <slot name="table"></slot>
  </div>
</template>

<script>
export default {
  name: 'ContentBase',
  data () {
    return {

    }
  },
  computed: {
  }
}
</script>

<style lang="less">
  .content-base {
    margin: 0 auto;
    padding: 0px;
    margin-top: 30px;
    table {
    border-spacing: 1px;
    background-color: #929196;
    margin: 0 auto;
  }
  }
</style>
