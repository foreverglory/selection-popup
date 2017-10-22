<template>
  <div id="selection-popup">
    <selection-popup-icon v-if="selected && !popped" v-bind:style="style" v-bind:direction="direction" v-bind:word="word" v-on:submit="onSubmit"></selection-popup-icon>
    <selection-popup-dialog 
      v-if="popped" 
      v-bind:style="style"
      v-bind:direction="direction" 
      v-bind:word="word"
      v-bind:typeId="typeId"
      v-bind:immediately="immediately"
      >
    </selection-popup-dialog>
  </div>
</template>

<script>
  import Icon from './components/Icon.vue';
  import Dialog from './components/Dialog.vue';

  export default {
    components: {
      'selection-popup-icon': Icon, 'selection-popup-dialog': Dialog
    },
    computed: {
      selected: {
        get: function () {
          return this.$store.state.selected;
        },
        set: function (value) {
          this.$store.state.selected = value;
        }
      },
      popped() {
        return this.$store.state.popped;
      }
    },
    data() {
      return {
        direction: ['down', 'right'],
        style: {
          left: 0,
          top: 0
        },
        word: '',
        typeId: '',
        immediately: false
      }
    },
    methods: {
      onSubmit( {word, typeId}){
        this.word = word;
        this.typeId = typeId;
        this.immediately = true;
        this.$store.state.popped = true;
      }
    },
    mounted() {
      var vm = this;
      document.addEventListener('mouseup', function (event) {
        let selection = window.getSelection();
        let word = selection.toString();
        if (word && event.which === 1) {
          vm.selected = true;

          var boxHeight = 400, boxWidth = 300;
          var direction = [];

          if (event.screenY + boxHeight > document.documentElement.clientHeight && boxHeight < document.documentElement.clientHeight / 2) {
            //向上
            vm.$set(vm, 'style', {
              left: event.pageX + 'px',
              top: (event.pageY - 20) + 'px'
            });
            direction.push('up');
          } else {
            //向下
            vm.$set(vm, 'style', {
              left: event.pageX + 'px',
              top: (event.pageY + 20) + 'px'
            });
            direction.push('down');
          }
          if (event.screenX + boxWidth > document.documentElement.clientWidth) {
            //向左
            direction.push('left');
          } else {
            //向右
            direction.push('right');
          }
          vm.$set(vm, 'direction', direction);
        } else {
          vm.$store.commit('reset');
        }
        vm.word = word;
      });
      this.$el.addEventListener('mouseup', function (event) {
        event.stopPropagation();
      });
    }
  }
</script>

<style lang="scss">
  #selection-popup{
    position: absolute;
    top: 0;
    left: 0;
    *{
      box-sizing: content-box;
      padding: 0; margin: 0; 
    }
    ul,ol {
      margin-top: 0;
      margin-bottom: 10px;
    }
    ul ul,
    ol ul,
    ul ol,
    ol ol {
      margin-bottom: 0;
    }
    ul{
      li{
        list-style: none;
      }
    }

    dl {
      margin-top: 0;
      margin-bottom: 20px;
    }
    dt,
    dd {
      line-height: 1.42857143;
    }
    dt {
      font-weight: bold;
    }
    dd {
      margin-left: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: inherit;
      font-weight: 500;
      line-height: 1.1;
      color: inherit;
    }
    h1 small,
    h2 small,
    h3 small,
    h4 small,
    h5 small,
    h6 small {
      font-weight: normal;
      line-height: 1;
      color: #777;
    }
    h1,
    h2,
    h3
    {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    h1 small,
    h2 small,
    h3 small {
      font-size: 65%;
    }
    h4,
    h5,
    h6
    {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    h4 small,
    h5 small,
    h6 small
    {
      font-size: 75%;
    }
    h1 {
      font-size: 36px;
    }
    h2 {
      font-size: 30px;
    }
    h3 {
      font-size: 24px;
    }
    h4 {
      font-size: 18px;
    }
    h5{
      font-size: 14px;
    }
    h6 {
      font-size: 12px;
    }
    p {
      margin: 0 0 10px;
    }

    small {
      font-size: 85%;
    }
    mark{
      padding: .2em;
      background-color: #fcf8e3;
    }

    abbr[title],
    abbr[data-original-title] {
      cursor: help;
      border-bottom: 1px dotted #777;
    }

    blockquote {
      padding: 10px 20px;
      margin: 0 0 20px;
      font-size: 17.5px;
      border-left: 5px solid #eee;
    }
    blockquote p:last-child,
      blockquote ul:last-child,
      blockquote ol:last-child {
      margin-bottom: 0;
    }
    blockquote footer,
    blockquote small {
      display: block;
      font-size: 80%;
      line-height: 1.42857143;
      color: #777;
    }
    blockquote footer:before,
      blockquote small:before {
      content: '\2014 \00A0';
    }

    address {
      margin-bottom: 20px;
      font-style: normal;
      line-height: 1.42857143;
    }
    code,
    kbd,
    pre,
    samp {
      font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
    }
    code {
      padding: 2px 4px;
      font-size: 90%;
      color: #c7254e;
      background-color: #f9f2f4;
      border-radius: 4px;
    }
    kbd {
      padding: 2px 4px;
      font-size: 90%;
      color: #fff;
      background-color: #333;
      border-radius: 3px;
      -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);
      box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);
    }
    kbd kbd {
      padding: 0;
      font-size: 100%;
      font-weight: bold;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  }
</style>
