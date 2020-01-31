import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 列数
    trCol: 0,
    // 行数
    trRow: 0,
    // 炸弹数量
    sweepers: 0,
    // 旗帜数量
    flags: 0,
    // 判断游戏是否结束 结束为1
    gameOver: 0,
    // 判断游戏是否进行到一半
    gameState: 0,
    // 获取炸弹所在的位置
    sweepersPositions: [],
    // 每个点的坐标
    blockPositions: [],
    // 获得所有炸弹坐标
    minePositions: []
  },
  mutations,
  actions,
  getters,
  modules
})
