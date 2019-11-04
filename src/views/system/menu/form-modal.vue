<template>
  <base-modal
    ref="modal"
    :title="params.id ? '编辑菜单' : '新增菜单'"
    :params="params"
    :rules="rules"
    :method="params.id ? 'PUT' : 'POST'"
    url="/system/menu"
    @success="handleSuccess"
  >
    <base-input
      label="父菜单"
      v-model="parentMenu.title"
      prop="parentTitle"
      readonly
    />
    <base-input
      label="菜单名称"
      v-model="params.name"
      prop="name"
    />
    <base-input
      label="菜单标题"
      v-model="params.title"
      prop="title"
    />
    <base-input
      label="路径"
      v-model="params.path"
      prop="path"
    />
    <base-input
      label="图标"
      v-model="params.icon"
      prop="icon"
    />
    <base-input
      type="number"
      label="排序"
      v-model="params.sort"
      prop="sort"
    />
  </base-modal>
</template>

<script>
    export default {
        data() {
            return {
                parentMenu: {},
                oldName: '',
                params: {},
                rules: {
                    name: [
                        {required: true, message: '菜单名称为必填项'},
                        {pattern: /^[A-Z_]{1,32}$/, message: '纯大写,可带下划线,不超过32位'},
                        {validator: this.validateMenuName}
                    ],
                    title: [
                        {required: true, message: '菜单标题为必填项'},
                        {max: 20, message: '菜单标题最多为20位'}
                    ],
                    path: [
                        {max: 64, message: '路径最多为64位'}
                    ],
                    icon: [
                        {max: 64, message: '图标最多为64位'}
                    ],
                    sort: [
                        {pattern: /^[0-9]*$/, message: '必须是自然数'},
                    ]
                }
            };
        },
        methods: {
            validateMenuName: function (rule, value, callback) {
                if (!value || value === this.oldName) {
                    callback();
                    return;
                }

                this.axios.get('validate/menu?name=' + value).then(() => {
                    callback();
                }).catch(res => {
                    callback(new Error(res.respMsg));
                });
            },
            show: function (parentMenu, menu) {
                this.parentMenu = parentMenu;
                this.params = menu ? Object.assign({}, menu) : {
                    parentName: parentMenu.name
                };
                this.params.createdTime = undefined;
                this.params.updatedTime = undefined;
                this.oldName = this.params.name;
                this.$refs.modal.show();
            },
            handleSuccess(data) {
                this.$emit('success', data);
            }
        }
    };
</script>