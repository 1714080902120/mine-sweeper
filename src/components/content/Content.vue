<template>
  <div id="content">
    <div v-if="judge">
    <ContentBase>
      <table slot="table">
        <tr v-for="(row, i1) in table" :key="i1">
          <td v-for="(col, i2) in row" ref="col" :key="col.type" class="content-item" @mousedown="create(i1, i2, col, $event)" @contextmenu="makeFlag(i1, i2, col, $event)"></td>
        </tr>
      </table>
    </ContentBase>
    </div>
    <div class="judge" v-else-if="!judge">SELECT THE GRADE！</div>
    <div v-if="!gameState" id="gameEnd">{{gameEnd}}</div>
  </div>
</template>

<script>
import ContentBase from './ContentBase'
export default {
  name: 'Content',
  data () {
    return {
      table: null,
      // 盘段是否开始
      judge: 0,
      // 判断是否开始游戏
      gameState: true,
      saveLeft: 0,
      saveRight: 0,
      save: 0,
      clickTimes: 0
    }
  },
  components: {
    ContentBase
  },
  methods: {
    create (i1, i2, col, e) {
      const This = this
      let arr, length, len, mineArr, reg, reg2, reg3, reg4
      arr = []
      length = this.table.length
      reg = new RegExp('mine', 'gi')
      reg2 = /flag/gi
      reg3 = /zero/gi
      reg4 = /\b(one|two|three|four|five|six|seven|eight)\b/gi
      mineArr = this.$store.state.minePositions
      len = this.$store.state.minePositions.length
      // 核心 递归操作 显示周围的0，直到遇到数字不为0的情况
      // 递归函数 遍历该点周围8个点
      const toJudge = function (i1, i2) {
        let leng = This.$store.state.trCol
        for (let a = i1 - 1; a <= i1 + 1; a++) {
          for (let b = i2 - 1; b <= i2 + 1; b++) {
            if (
              a < 0 ||
              b < 0 ||
              a > leng - 1 ||
              b > leng - 1 ||
              reg3.test(This.$refs.col[a][b].className) ||
              reg4.test(This.$refs.col[a][b].className)
            ) {
              continue
            }
            if (parseInt(This.table[a][b].value) !== 0 && !reg4.test(This.$refs.col[a][b].className)) {
              This.table[a][b].state = '1'
              This.clickTimes += 1
              switch (parseInt(This.table[a][b].value)) {
                case 1: This.$refs.col[a][b].className += ' one'
                  continue
                case 2: This.$refs.col[a][b].className += ' two'
                  continue
                case 3: This.$refs.col[a][b].className += ' three'
                  continue
                case 4: This.$refs.col[a][b].className += ' four'
                  continue
                case 5: This.$refs.col[a][b].className += ' five'
                  continue
                case 6: This.$refs.col[a][b].className += ' six'
                  continue
                case 7: This.$refs.col[a][b].className += ' seven'
                  continue
                case 8: This.$refs.col[a][b].className += ' eight'
                  continue
              }
            } else if (parseInt(This.table[a][b].value) === 0 && !reg3.test(This.$refs.col[a][b].className)) {
              This.table[a][b].state = '1'
              This.clickTimes += 1
              This.$refs.col[a][b].className += ' zero'
              toJudge(a, b)
            }
            console.log(This.clickTimes)
            console.log(This.table[i1][i2].state)
          }
        }
      }
      this.$store.commit('gameStart')
      // 点击右键
      if (e.which === 1) {
        // 判断是否可以点击
        if (reg2.test(e.srcElement.className)) return false
        // 碰到雷
        if (reg.test(col.type)) {
          if (reg.test(e.srcElement.className)) return false
          // 获取当前的DOM元素并且处理为二维数组
          this.$nextTick(() => {
            if (this.save === 0) {
              for (let i = 0; i < length; i++) {
                arr[i] = this.$refs.col.splice(0, length)
              }
              console.log(this.save)
              this.$refs.col = arr
            }
            // 显示所有的雷 游戏结束
            for (let t = 0; t < len; t++) {
              if (reg.test(this.$refs.col[mineArr[t].x][mineArr[t].y].className)) return false
              this.$refs.col[mineArr[t].x][mineArr[t].y].className = 'content-item mine'
            }
            let time = setTimeout(() => {
              alert('GAME OVER!')
              this.$store.commit('gameOver')
              history.go(0)
              clearTimeout(time)
            }, 1000)
          })
        } else {
          this.$nextTick(() => {
            if (this.save === 0) {
              for (let i = 0; i < length; i++) {
                arr[i] = this.$refs.col.splice(0, length)
              }
              this.$refs.col = arr
            }
            this.save = 1
            // 判断是否点过该点 没有的话次数加1
            if (this.table[i1][i2].state === '1') {
              return false
            } else {
              this.table[i1][i2].state = '1'
              this.clickTimes += 1
            }
            switch (parseInt(this.table[i1][i2].value)) {
              case 1: e.srcElement.className += ' one'
                break
              case 2: e.srcElement.className += ' two'
                break
              case 3: e.srcElement.className += ' three'
                break
              case 4: e.srcElement.className += ' four'
                break
              case 5: e.srcElement.className += ' five'
                break
              case 6: e.srcElement.className += ' six'
                break
              case 7: e.srcElement.className += ' seven'
                break
              case 8: e.srcElement.className += ' eight'
                break
              case 0 :
                e.srcElement.className += ' zero'
                toJudge(i1, i2)
                break
            }
            console.log(This.clickTimes)
            console.log(This.table[i1][i2].state)
            // 赢得情况 根据显示次数来判断
            if (this.clickTimes === length * length - len) {
              // 显示所有的雷 游戏结束
              for (let t = 0; t < len; t++) {
                if (reg.test(this.$refs.col[mineArr[t].x][mineArr[t].y].className)) return false
                this.$refs.col[mineArr[t].x][mineArr[t].y].className = 'content-item mine'
              }
              alert('YOU WIN!')
              let timer = setTimeout(() => {
                history.go(0)
                clearTimeout(timer)
              }, 4000)
            }
          })
        }
      }
    },
    // 插旗函数
    makeFlag (i1, i2, col, e) {
      let arr = []
      let reg = new RegExp('flag', 'gi')
      let reg2 = /zero|one|two|three|four|five|six|seven|eight/gi
      arr = e.srcElement.className.split(',')
      if (reg2.test(e.srcElement.className)) return false
      if (!reg.test(e.srcElement.className)) {
        if (this.$store.state.flags <= 0) return false
        this.$store.commit('lostFlag')
        arr.push(' flag')
        arr.join('')
        e.srcElement.className = arr
      } else {
        this.$store.commit('getFlag')
        arr.pop()
        e.srcElement.className = arr.join('')
      }
    }
  },
  computed: {
  },
  watch: {
    // 当行列一发生变化就执行一下操作
    '$store.state.trRow' () {
      this.clickTimes = 0
      this.table = null
      this.table = this.$store.state.blockPositions
      this.judge = 1
    },
    immediate: true
  }
}
</script>

<style lang="less">
  @color: #d9d9d9;
  #content {
    text-align: center;
    .judge {
      font-family: cursive;
      font-size: 40px;
      font-weight: bold;
      border: 10px solid #000;
      margin: 50px auto;
    }
  }
  @var: 20px;
  tr {
    padding: 0px;
    margin: 0px;
  }
  td {
    text-align: center;
    font-size: 14px;
    background-color: #ccc;
    border: 2px solid;
    width: @var;
    height: @var;
    padding: 0px;
    border-color: #fff #a1a1a1 #a1a1a1 #fff;
    cursor: default;
  }
  .mine {
    background: @color url(~assets/img/boom.svg) no-repeat center;
    background-size: cover;
  }
  .flag {
    background: #ccc url(~assets/img/flag.svg) no-repeat center;
    background-size: cover;
  }
  .zero {
    border-color: @color;
    background: @color;
  }
  .one {
    border-color: @color;
    background: @color;
    color: #0332fe;
  }
  .two {
    border-color: @color;
    background: @color;
    color: #019f02;
  }
  .three {
    border-color: @color;
    background: @color;
    color: #ff2600;
  }
  .four {
    border-color: @color;
    background: @color;
    color: #93208f;
  }
  .five {
    border-color: @color;
    background: @color;
    color: #ff7f29;
  }
  .six {
    border-color: @color;
    background: @color;
    color: #ff3fff;
  }
  .seven {
    border-color: @color;
    background: @color;
    color: #3fffbf;
  }
  .eight {
    border-color: @color;
    background: @color;
    color: #22ee0f;
  }
  .zero::before {
    content: '';
  }
  .one::before {
    content: '1'
  }
  .two::before {
    content: '2'
  }
  .three::before {
    content: '3'
  }
  .four::before {
    content: '4'
  }
  .five::before {
    content: '5'
  }
  .six::before {
    content: '6'
  }
  .seven::before {
    content: '7'
  }
  .eight::before {
    content: '8'
  }
</style>
