<template>
  <div id="selection-popup-dialog-form">
    <select v-model="typeId">
      <option v-for="type in types" v-bind:value="type.id">{{type.name}}</option>
    </select>
    <input type="text" class="input" placeholder="" v-model="word"/>
    <button type="button" v-on:click="submit"></button>
  </div>
</template>

<script>
  export default {
    computed: {
      types() {
        return this.$store.state.types;
      }
    },
    props: ['word', 'typeId', 'immediately'],
    data() {
      return {};
    },
    mounted() {
      if (this.immediately) {
        this.submit();
      }
    },
    methods: {
      submit() {
        this.$store.dispatch("submit", {
          word: this.word,
          typeId: this.typeId
        }).then(() => {

        });
      }
    }
  }
</script>

<style lang="scss">
  #selection-popup-dialog-form {
    display: flex;
    height: 30px;
    position: relative;
    select {
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }
    input {
      flex: 1;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-right-width: 0;
      /* border-radius: 3px; */
      box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
      color: inherit;
      padding: 0 10px;
      font-size: 15px;
    }
    button {
      background: url("../images/forward.svg") no-repeat center center;
      background-size: auto auto;
      border-radius: 0 3px 3px 0;
      box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
      color: inherit;
      border: 0;
      position: absolute; right: 0;
      width: 36px;
      fill: rgba(12, 12, 13, 0.4);
      -moz-context-properties: fill;
      background-size: 16px 16px;
      height: 100%;
      offset-inline-end: 0;
    }
  }
</style>
