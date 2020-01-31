<template>
  <div id="calc">
    <div class="imga"><img src="~assets/img/扫雷.svg">: {{sweepers}}</div>
    <div class="imgb"><img src="~assets/img/flag.svg">: {{flags}}</div>
  </div>
</template>

<script>
export default {
  name: 'Calc',
  data () {
    return {
      sweepers: 0,
      flags: 0
    }
  },
  watch: {
    '$store.state.sweepers' () {
      this.sweepers = 0
      this.sweepers = this.$store.state.sweepers
    },
    '$store.state.flags' () {
      this.flags = 0
      this.flags = this.$store.state.flags
    }
  }
}
</script>

<style lang="less">
  #calc {
    padding: 0px;
    margin: 0 auto;
    margin-top: 30px;
    text-align: center;
    .imga, .imgb {
      line-height: 50px;
      display: inline-block;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .imga {
      margin-right: 40px;
    }
  }
</style>
