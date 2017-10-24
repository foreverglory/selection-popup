<template>
  <div class="container">
    <Row v-bind:gutter="16">
      <Col span="10">
        <!--<Button type="success" v-on:click="getOnline">在线获取</Button>-->
        <Button type="primary" v-on:click="addType">创建</Button>
      </Col>
    </Row>
    <Table stripe border v-bind:loading="table.loading" v-bind:columns="table.columns" v-bind:data="types"></Table>
    <UpdateForm v-if="form.status" v-bind:type="form.data" v-on:done="formDone"></UpdateForm>
  </div>
</template>

<script>
  import isEmpty from "lodash/isEmpty";
  import UpdateForm from "./UpdateType.vue";
  import defaultType from "../data/defaultType.json";
  export default {
    components: {UpdateForm},
    computed: {
      types() {
        return this.$store.state.types;
      }
    },
    data() {
      return {
        table: {
          loading: false,
          columns: [
//            {
//              type: "selection",
//              width: 60,
//              align: "center"
//            },
            {
              title: "图标",
              width: 72,
              align: "center",
              render: (h, params) => {
                return h("img", {
                  attrs: {
                    src: params.row.icon,
                    width: 24,
                    height: 24
                  }
                });
              }
            },
            {
              title: "名称",
              key: "name",
              width: 150
            },
            {
              title: "请求",
              render: (h, params) => {
                return  [h('Tag', {
                    props: {color: 'green'}
                  }, params.row.request.method),
                  params.row.request.uri];
              }
            },
            {
              title: "操作",
              key: "action",
              width: 130,
              align: "center",
              render: (h, params) => {
                let update = /*params.row.source !== "system" ? null :*/ h("Button", {
                  props: {type: "primary", size: "small"},
                  on: {
                    click: () => {
                      this.edit(params.row.id);
                    }
                  }
                }, "编辑");
                return h("div", [update, h("Button", {
                    props: {type: "error", size: "small"},
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "警告",
                          content: "确认删除",
                          onOk: () => {
                            this.remove(params.row.id);
                          }
                        });
                      }
                    }
                  }, "删除")
                ]);
              }
            }
          ],
        },
        form: {
          status: 0,
          data: {}
        }
      };
    },
    methods: {
      getOnline() {

      },
      addType() {
        this.$set(this, "form", {
          status: 1,
          data: defaultType
        });
      },
      edit(id) {
        this.$set(this, "form", {
          status: 2,
          data: this.types.find((type) => {
            return type.id == id;
          })
        });
      },
      formDone() {
        this.$set(this, "form", {
          status: 0,
          data: defaultType
        });
      },
      remove(id) {
        this.table.loading = true;
        return this.$store.dispatch("removeType", {id}).then(() => {
          this.table.loading = false;
        });
      }
    }
  };
</script>

<style lang="scss">
  .container{
    padding-left: 10px; padding-right: 10px;
    padding-bottom: 200px;
  }
  .ivu-modal-body{
    max-height: 400px; overflow: auto;
  }
  .ivu-row {
    margin-bottom: 10px;
  }
  p{
    margin-bottom: 10px;
  }
  .ivu-btn {
    margin-left: 5px;
    &:first-child {
      margin-left: 0;
    }
  }
  .red{
    color: #ed3f14;
  }
</style>