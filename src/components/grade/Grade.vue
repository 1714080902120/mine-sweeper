<template>
  <div id="grade">
    <GradeBase>
      <GradeItem v-for="(item,index) in btn" :key="item.name" :num="item.num" :list="i">
        <div @click="active(index, item)">{{item.name}}</div>
      </GradeItem>
    </GradeBase>
  </div>
</template>

<script>
import GradeItem from './GradeItem'
import GradeBase from './GradeBase'
export default {
  name: 'grade',
  data () {
    return {
      i: -1,
      btn: [
        {
          name: '初级',
          num: 0,
          colNum: 9,
          rowNum: 9,
          boom: 10
        },
        {
          name: '中级',
          num: 1,
          colNum: 16,
          rowNum: 16,
          boom: 40
        },
        {
          name: '高级',
          num: 2,
          colNum: 25,
          rowNum: 25,
          boom: 99
        },
        {
          name: '终极',
          num: 3,
          colNum: 30,
          rowNum: 30,
          boom: 333
        }
      ]
    }
  },
  components: {
    GradeBase,
    GradeItem
  },
  methods: {
    active (index, item) {
      if (this.$store.state.gameState === 1 && !confirm('游戏还未结束，确定要切换等级？')) return false
      this.i = index
      this.$store.commit('clean')
      this.$store.commit('changeTdNum', { colNum: item.colNum, rowNum: item.rowNum })
      this.$store.commit('changeBoom', { boom: item.boom })
      this.$store.commit('toGetSweepersPositions')
      this.$store.commit('toGetBlockPositions')
    }
  }
}
</script>

<style lang="less">
  #grade {
    margin: 0 auto;
    margin-top: 20px;
    padding: 0px;
  }
</style>
