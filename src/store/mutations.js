const mutations = {
  // 修改行列
  changeTdNum (state, payload) {
    state.trCol = payload.colNum
    state.trRow = payload.rowNum
  },
  // 修改炸弹数量
  changeBoom (state, payload) {
    state.sweepers = payload.boom
    state.flags = payload.boom
  },
  // 坐标及属性
  toGetBlockPositions (state) {
    state.blockPositions = []
    let i, j, n, length, obj
    n = 0
    length = state.trRow
    for (i = 0; i < length; i++) {
      state.blockPositions[i] = []
      for (j = 0; j < length; j++) {
        // 每个格子对应的坐标及状态
        obj = { x: i, y: j, type: Math.random() * 100 + 'number', value: 0, state: 0 }
        if (state.sweepersPositions.indexOf(n) !== -1) {
          obj.type = Math.random() * 100 + 'mine'
          obj.value = 999
          state.minePositions.push(obj)
        }
        state.blockPositions[i].push(obj)
        n++
      }
    }
    this.commit('getValue')
  },
  // 修改每个点的value
  getValue (state) {
    let arr, length, x, y, len
    arr = []
    len = state.trCol
    length = state.minePositions.length
    const judge = function (x, y, t) {
      for (let a = x - 1; a <= x + 1; a++) {
        for (let b = y - 1; b <= y + 1; b++) {
          if (
            a < 0 ||
            b < 0 ||
            a > len - 1 ||
            b > len - 1 ||
            parseInt(state.blockPositions[a][b].value) === 999
          ) {
            continue
          }
          arr[t].push({ x: a, y: b })
        }
      }
    }
    for (let i = 0; i < length; i++) {
      arr[i] = []
      x = parseInt(state.minePositions[i].x)
      y = parseInt(state.minePositions[i].y)
      // 判断相邻的八个点坐标是否符合要求
      judge(x, y, i)
    }
    // 遍历arr，将坐标对应的点改变value值
    const changeValue = function () {
      let len, length, x, y, val
      len = arr.length
      for (let i = 0; i < len; i++) {
        length = arr[i].length
        for (let j = 0; j < length; j++) {
          x = parseInt(arr[i][j].x)
          y = parseInt(arr[i][j].y)
          val = parseInt(state.blockPositions[x][y].value) + 1
          state.blockPositions[x][y].value = val
        }
      }
    }
    changeValue()
  },
  // 获取炸弹索引
  toGetSweepersPositions (state) {
    let arr, num
    arr = []
    state.sweepersPositions = []
    num = state.trRow * state.trCol
    for (let i = 0; i < num; i++) { arr.push(i) }
    state.sweepersPositions = arr.sort(() => {
      return 0.5 - Math.random()
    }).slice(0, state.sweepers)
  },
  // 旗帜减少
  lostFlag (state) {
    state.flags -= 1
  },
  // 旗帜增加
  getFlag (state) {
    state.flags += 1
  },
  // 开始游戏
  gameStart (state) {
    state.gameState = 1
  },
  // 按到炸弹，游戏结束
  gameOver (state) {
    state.gameOver = 1
    state.gameState = 0
  },
  // 清零
  clean (state) {
    // 列数
    state.trCol = 0
    // 行数
    state.trRow = 0
    // 炸弹数量
    state.sweepers = 0
    // 旗帜数量
    state.flags = 0
    // 判断游戏是否结束 结束为1
    state.gameOver = 0
    // 判断游戏是否进行到一半
    state.gameState = 0
    // 获取炸弹所在的位置
    state.sweepersPositions = []
    // 每个点的坐标
    state.blockPositions = []
    // 获得所有炸弹坐标
    state.minePositions = []
  }
}

export default mutations
