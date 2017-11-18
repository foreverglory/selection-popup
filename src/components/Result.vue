<template>
  <div id="selection-popup-dialog-result">
    <div id="loading" v-if="loading">
      <img v-bind:src="'images/loading.gif'|resource" />
    </div>
    <div id="error" v-else-if="error">
      {{error.message()}}
    </div>
    <div v-else class="result">
      <renderview v-if="result" v-bind:template="template"></renderview>
    </div>
    <div class="copyright">
      <span></span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import template from "../data/template.html";
import url from 'url';

export default {
  components: {
    renderview: {
      functional: true,
      props: ["template"],
      render(h, context) {
        return Vue.compile(
          context.props.template
        ).render.apply(context.parent, arguments);
      }
    }
  },
  computed: {
    type() {
      return this.$store.getters.type;
    },
    result() {
      return this.$store.state.result;
    },
    loading() {
      return this.$store.state.loading;
    },
    error: {
      get: function() {
        return this.$store.state.error;
      },
      set: function(value) {
        this.$store.state.error = value;
      }
    },
    template() {
      return this.$store.getters.type.response.template || template;
    }
  },
  data() {
    return {};
  },
  mounted(){

  }
};
</script>

<style lang="scss">
#selection-popup-dialog-result {
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  flex: 1;
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  .result {
    font-size: 14px;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .keyword {
      color: #d00;
      font-size: inherit;
      font-style: inherit;
      font-weight: inherit;
    }
    div{

    }
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        padding: 5px 10px;
        background-color: #fff;
        &:nth-of-type(2n) {
          background: #f5f5f5;
        }
        img {
          float: left;
          width: 80px;
          height: auto;
          margin: 5px 5px 10px;
        }
      }
    }
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        color: inherit;
      }
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 18px;
      line-height: 150%;
      color: #000;
    }
    h1{
      font-size: 24px;
    }
    h2{
      font-size: 20px;
    }
    h3{
      font-size: 18px;
    }
    h4{
      font-size: 16px;
    }
    label {
      font-weight: bold;
      color: #000;
    }
    em,
    strong {
      font-weight: normal;
      font-style: normal;
      color: #d00;
    }
    p {
      flex: 1;
      margin: 5px 0 10px;
      font-size: 14px;
      line-height: 150%;
      color: #555;
      word-break: break-all;
    }
    address{
      font-size: 13px;
      font-style: normal;
      color: green; 
    }
    span {
      margin-right: 5px;
    }
    label{

    }
    img {
      max-width: 100%;
      margin-right: 5px;
    }
  }

  #loading {
    margin: 20px auto;
    width: 200px;
    height: 200px;
    background-color: #fff;
    img {
      width: 100px;
      height: 100px;
      margin: 50px auto;
      display: block;
    }
  }
  #error {
    color: #d00;
  }
  .copyright {
    font-size: 11px;
    color: #666;
    text-align: center;
  }
}
</style>