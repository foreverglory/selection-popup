<template>
  <div id="selection-popup">
    <selection-popup-icon v-show="selected && !popped" v-bind:style="style" v-bind:direction="direction" v-bind:word="word"></selection-popup-icon>
    <selection-popup-dialog v-show="popped" v-bind:style="style" v-bind:direction="direction" v-bind:word="word"></selection-popup-dialog>
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
        word: ''
      }
    },
    mounted() {
      var vm = this;
      document.onmouseup = function (event) {
        let selection = window.getSelection();
        let word = selection.toString();
        if (word) {
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
      }
      this.$el.onmouseup = function (event) {
        event.stopPropagation();
      };
    }
  }
</script>

<style lang="scss">
  #selection-popup{
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
