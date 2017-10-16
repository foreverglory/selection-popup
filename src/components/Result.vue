<template>
  <div id="selection-popup-dialog-result">
    <div id="loading" v-if="loading">
      <img src="../images/loading.gif" />
    </div>
    <div id="error" v-else-if="error">
      {{error}}
    </div>
    <div v-else>
      <ul class="list">
        <li class="item" v-for="item in items">
          <div class="title">
            <a v-bind:href="item.link" target="_blank" v-html="item.title"></a>
          </div>
          <div class="content">
            <img v-if="item.image" v-bind:src="item.image">
            <div v-html="item.content"></div>
          </div>
          <div class="source">
            <span v-if="item.source">{{item.source}}</span> <span v-if="item.date">{{item.date}}</span>
          </div>
        </li>
      </ul>
      <div class="copyright"><span></span></div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      items() {
        return this.$store.state.result;
      },
      loading() {
        return this.$store.state.loading;
      },
      error: {
        get: function () {
          return this.$store.state.error;
        },
        set: function (value) {
          this.$store.state.error = value;
        }
      }
    },
    data() {
      return {};
    }
  }
</script>

<style lang="scss">
  #selection-popup-dialog-result {
    overflow: hidden;
    overflow-y: auto;
    position: relative;
    flex: 1;
    padding: 5px;
    a{
      text-decoration: none;
    }
    em, strong {
      color: #d00;
      text-decoration: none;
      font-style: normal;
    }
    .item {
      list-style: none;
      padding: 10px;
      background-color: #fff;
      margin-top: 10px;
      .title {
        font-size: 18px;
        line-height: 24px;
        color: #000;
        a {
          color: #000;
        }
      }
      .content {
        display: flex;
        margin-top: 5px;
        font-size: 14px;
        color: #555;
        a {
          color: #555;
        }
        img {
          width: 100px;
          height: 100px;
          margin-right: 5px;
        }
      }
      .source {
        margin-top: 5px;
        span {
          margin-right: 5px;
          font-size: 14px;
          color: #999;
        }
      }
    }

    #loading {
      margin: 20px auto;
      width: 200px;
      height: 200px;
      background-color: #fff;
      img{
        width: 100px; height: 100px; margin: 50px auto; display: block;
      }
    }
    .copyright{
      font-size: 11px; color: #666; text-align: center;
    }
  }
</style>