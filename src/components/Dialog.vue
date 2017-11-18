<template>
  <div id="selection-popup-dialog">
    <div class="wrapper" v-bind:class="direction">
      <div class="dialog-title">划词窗 <small>Selection Popup</small></div>
      <dialog-form v-bind:word="word" v-bind:typeId="typeId" v-bind:immediately="immediately"></dialog-form>
      <dialog-result></dialog-result>
    </div>
  </div>
</template>

<script>
  import Form from './Form.vue';
  import Result from './Result.vue';
  export default {
    components: {
      'dialog-form': Form, 'dialog-result': Result
    },
    props: ['direction', 'word', 'typeId', 'immediately'],
    data() {
      return {
        error: ''
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss">
  #selection-popup-dialog {
    position: absolute;
    z-index: 9999;

    .wrapper{
      position: absolute;
      display: flex;
      flex-direction: column;
      &.up{
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
      min-width: 300px;
      max-width: 300px;
      max-height: 400px;
      overflow: hidden;

      background-color: #ffffff;
      margin: 0px;
      padding: 0;
      border-radius: 2px;
      border: 1px solid rgba(0,0,0,.2);
      box-shadow: 0 2px 4px rgba(0,0,0,.2);

      .dialog-title{
        background-color: rgba(0, 0, 0, 0.1);
        height: 30px; line-height: 30px; text-indent: 6px;
        small{
          font-size: 10px;
        }
      }
    }
  }
</style>
