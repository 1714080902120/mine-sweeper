<template>
  <div id="grade-base">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GradeBase',
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
  #grade-base {
    display: flex;
    left: 0px;
    right: 0px;
    top: 30px;
  }
</style>
