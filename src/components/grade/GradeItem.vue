<template>
  <div class="grade-item" :class="{'active_color': colorNum == list}">
   <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GradeItem',
  props: {
    list: Number,
    num: Number
  },
  data () {
    return {
      colorNum: this.num
    }
  }
}
</script>

<style lang="less">
  .grade-item {
    text-align: center;
    flex: 1;
    color: #fff;
    border-radius: 5px;
    border: none;
    outline: none;
    padding: 2px;
    margin: 2px 30px;
    background-color: rgb(5, 47, 161);
    cursor: pointer;
    @media screen and (max-width: 927px) {
      margin: 2px;
      width: 100px;
    }
  }
  .active_color {
    background-color: rgb(130, 230, 30)
  }
</style>
