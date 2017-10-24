<template>
  <div>
    <Modal v-model="model" v-bind:title="title" v-bind:mask-closable="false" :closable="false">
      <Form ref="form" v-bind:model="form" v-bind:rules="ruleValidate" v-bind:label-width="60">
        <FormItem label="名称" prop="name">
          <Input v-model="form.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="图标" prop="icon">
          <Input v-model="form.icon" placeholder="请输入图标地址"></Input>
        </FormItem>
        <Tabs type="card">
          <TabPane label="请求">
            <Row><Col span="20" offset="1">
                <em class="red">{word}</em>
                为所选择对应的关键字，可填充至 URI、Parameters、Headers
              </Col></Row>
            <FormItem label="地址">
              <Input v-model="form.request.uri" placeholder="请输入地址"></Input>
            </FormItem>
            <FormItem label="类型">
              <Select v-model="form.request.method" style="width:200px">
                <Option value="GET">GET</Option>
                <Option value="POST">POST</Option>
              </Select>
            </FormItem>
            <Collapse value="0" accordion>
              <Panel>
                Parameters
                <div slot="content">
                  <Input v-bind:value="form.request.data|json" v-on:change.native="onChange('request.data',$event)" type="textarea" v-bind:rows="6" placeholder="{\n}"></Input>
                  <small>JSON格式</small>
                </div>
              </Panel>
              <Panel>
                Headers 
                <div slot="content">
                  <Input v-bind:value="form.request.headers|json" v-on:change.native="onChange('request.headers',$event)" type="textarea" :rows="6" placeholder="{\n}"></Input>
                  <small>JSON格式</small>
                </div>
              </Panel>
            </Collapse>
          </TabPane>
          <TabPane label="响应">
            <FormItem label="格式">
              <Select v-model="form.response.type" style="width:100px">
                <Option value="html">HTML</Option>
                <Option value="json">JSON</Option>
              </Select>
            </FormItem>
            <Card dis-hover v-if="form.response.type == 'html'">
              <p slot="title">映射</p>
              <div>
                <FormItem label="区域">
                  <Input v-model="form.response.mappings.container" placeholder="请输入元素"></Input>
                </FormItem>
                <FormItem label="标题">
                  <Input v-model="form.response.mappings.title" placeholder="请输入元素"></Input>
                </FormItem>
                <FormItem label="链接">
                  <Input v-model="form.response.mappings.link" placeholder="请输入元素"></Input>
                </FormItem>
                <FormItem label="图片">
                  <Input v-model="form.response.mappings.image" placeholder="请输入元素"></Input>
                </FormItem>
                <FormItem label="内容">
                  <Input v-model="form.response.mappings.content" placeholder="请输入元素"></Input>
                </FormItem>
                <FormItem label="来源">
                  <Input v-model="form.response.mappings.source" placeholder="请输入元素"></Input>
                </FormItem>
              </div>
            </Card>
            <Card dis-hover v-if="form.response.type != 'html'">
              <p slot="title">模板</p>
              <div>
                <Input v-model="form.response.template" type="textarea" v-bind:rows="10"></Input>
                <p></p>
                <p>模板使用 vue 语法：<a href="https://cn.vuejs.org/v2/guide/syntax.html" target="_blank">模板语法</a></p>
                <p>
                  <a href="https://cn.vuejs.org/v2/guide/conditional.html" target="_blank">v-if</a>, v-else, 
                  <a href="https://cn.vuejs.org/v2/guide/list.html" target="_blank">v-for</a>
                </p>
                <p>
                  数据变量为 <b>result</b>, 比如 Api 返回内容为 { list: [{},{...}], ... }，
                  使用 result.list 即可获取数据
                </p>
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </Form>
      <div slot="footer">
        <i-button type="text" size="large" @click.native="cancel">取消</i-button>
        <i-button type="primary" size="large" v-bind:loading="loading" @click.native="handleSubmit">保存</i-button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import _ from 'lodash';
  import isEmpty from "lodash/isEmpty";
  export default {
    components: {},
    props: {
      type: Object,
      submit: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      title() {
        return isEmpty(this.form.id) ? "添加" : "编辑";
      },
      form: {
        get: function () {
          let data = Object.assign({}, this.type, this.data);
          if (!_.has(data, 'request.method')) {
            data.request.method = 'GET'
          }
          if (!_.has(data, 'response.data')) {
            data.response.data = 'html';
          }
          return data;
        },
        set: function (data) {
          this.data = data;
        }
      }
    },
    data() {
      return {
        model: true,
        loading: false,
        data: {},
        validated: true,
        ruleValidate: {
          name: [{required: true, message: "名称不能为空", trigger: "blur"}],
          icon: [{required: true, message: "图标不能为空", trigger: "blur"}]
        }
      };
    },
    methods: {
      onChange(type, data) {
        try {
          let value = data.target.value;
          let json = JSON.parse(value);
          if (type == "request.data") {
            this.$set(this.form.request, 'data', json);
          } else if (type == "request.headers") {
            this.$set(this.form.request, 'headers', json);
          }
          this.validated = true;
        } catch (error) {
          this.validated = false;
          this.$Modal.error({
            title: "错误",
            content: "JSON格式有误"
          });
        }
      },
      cancel() {
        this.$emit('done');
      },
      handleSubmit() {
        if (!this.validated) {
          this.$Modal.error({
            title: "错误",
            content: "JSON格式有误"
          });
          return;
        }
        this.loading = true;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('updateType', this.form).then(() => {
              this.loading = false;
              this.$emit('done');
            }).catch((error) => {
              this.loading = false;
              this.$Modal.error({
                title: "错误",
                content: error.message()
              });
            });
          } else {
            this.loading = false;
            this.$Message.error('表单验证失败!');
          }
        })
      }
    },
    mounted() {
    }
  };
</script>