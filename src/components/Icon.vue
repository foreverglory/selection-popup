<template>
  <div id="selection-popup-icon">
    <ul v-bind:class="direction">
      <li v-for="type in types" v-on:click="submit(type.id)">
        <img v-bind:src="type.icon"/>
        <span>{{type.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    props: ['word', 'direction'],
    computed: {
      types() {
        return this.$store.state.types;
      }
    },
    data() {
      return {};
    },
    methods: {
      submit(id) {
        this.$store.commit('popup', {word: this.word, typeId: id, auto: true});
      }
    }
  }
</script>

<style lang="scss">
  #selection-popup-icon{
    position: absolute;
    z-index: 9998;

    ul{
      position: absolute;
      display: flex;
      flex-direction: column;
      background: #fff;
      border: 1px solid rgba(0,0,0,.2);
      transition: opacity .218s;
      box-shadow: 0 2px 4px rgba(0,0,0,.2);

      &.up{
        flex-direction: column-reverse;
        bottom: 0;
        top: auto;
      }
      &.down{
        flex-direction: column;
        top: 0;
      }
      &.left{
        right: 0;
        left: auto;
      }
      &.right{
        left: 0;
      }

      li{
        height: 24px;
        width: 120px;
        padding: 5px 5px;
        cursor: pointer;
        &:hover{
          background-color: rgba(0,0,0,.2);
        }
        img{
          float: left;
          margin-right: 5px;
          width: 24px;
          height: 24px;
        }
        span{
          display: inline-block;
          font-size: 12px;
          line-height: 24px;
          height: 24px;
        }
      }
    }
  }
</style>
