<template>
  <div>
    <Grade/>
    <Content/>
    <Calc/>
  </div>
</template>

<script>

import Grade from 'components/grade/Grade'
import Content from 'components/content/Content'
import Calc from 'components/calc/Calc'
export default {
  name: 'Main',
  data () {
    return {

    }
  },
  components: {
    Grade,
    Content,
    Calc
  }
}
</script>

<style lang="less">
  @import '~assets/less/base.less';
</style>
