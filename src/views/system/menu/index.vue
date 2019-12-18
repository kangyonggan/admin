<template>
  <div>
    <el-tree
      class="menu-tree"
      :data="menus"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent"
    />

    <form-modal
      ref="form-modal"
      @success="reload"
    />
  </div>
</template>

<script>
    import FormModal from './form-modal';

    export default {
        components: {FormModal},
        data() {
            return {
                params: {},
                menus: []
            };
        },
        methods: {
            renderContent(h, {data}) {
                if (data.render) {
                    return data.render(h, {data});
                }
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('i', {
                            class: data.icon,
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            float: 'right'
                        }
                    }, [
                        h('el-tooltip', {
                            props: {
                                effect: 'dark',
                                content: '给' + data.title + '添加子菜单',
                                placement: 'left'
                            }
                        }, [
                            h('el-button', {
                                props: {
                                    plain: true,
                                    icon: 'el-icon-plus',
                                    size: 'mini'
                                },
                                style: {
                                    padding: '6px 18px'
                                },
                                on: {
                                    click: () => {
                                        this.form({
                                            title: data.title,
                                            name: data.name
                                        });
                                    }
                                }
                            })
                        ]),
                        h('el-tooltip', {
                            props: {
                                effect: 'dark',
                                content: '编辑' + data.title,
                                placement: 'top'
                            }
                        }, [
                            h('el-button', {
                                props: {
                                    plain: true,
                                    icon: 'el-icon-edit',
                                    size: 'mini'
                                },
                                style: {
                                    padding: '6px 18px'
                                },
                                on: {
                                    click: () => {
                                        this.form({
                                            title: data.title,
                                            name: data.name
                                        }, data);
                                    }
                                }
                            })
                        ]),
                        h('el-tooltip', {
                            props: {
                                effect: 'dark',
                                content: '删除' + data.title,
                                placement: 'right'
                            }
                        }, [
                            h('el-button', {
                                props: {
                                    plain: true,
                                    icon: 'el-icon-delete',
                                    size: 'mini',
                                    disabled: !!(data.children && data.children.length)
                                },
                                style: {
                                    padding: '6px 18px'
                                },
                                on: {
                                    click: () => {
                                        this.delete(data);
                                    }
                                }
                            })
                        ])
                    ])
                ]);
            },
            form(parentMenu, menu) {
                this.$refs['form-modal'].show(parentMenu, menu);
            },
            delete(menu) {
                this.$confirm('物理删除' + menu.title + '，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.delete('system/menu/' + menu.id).then(() => {
                        this.reload();
                    }).catch(res => {
                        this.error(res.respMsg);
                    });
                });
            },
            reload() {
                this.axios.get('system/menu').then(data => {
                    this.menus = [{
                        title: '根菜单',
                        children: data.menus,
                        render: (h, {data}) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                h('span', [
                                    h('i', {
                                        class: 'el-icon-menu',
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('span', {
                                    style: {
                                        float: 'right',
                                    }
                                }, [
                                    h('el-tooltip', {
                                        props: {
                                            effect: 'dark',
                                            content: '给' + data.title + '添加子菜单',
                                            placement: 'left'
                                        }
                                    }, [
                                        h('el-button', {
                                            props: {
                                                plain: true,
                                                icon: 'el-icon-plus',
                                                size: 'mini'
                                            },
                                            style: {
                                                padding: '6px 18px',
                                                width: '170px'
                                            },
                                            on: {
                                                click: () => {
                                                    this.form({
                                                        title: data.title,
                                                        name: ''
                                                    });
                                                }
                                            }
                                        })
                                    ])
                                ])
                            ]);
                        }
                    }];
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        },
        mounted() {
            this.reload();
        }
    };
</script>

<style lang="scss">
  .menu-tree {
    width: 50%;
    max-width: 800px;
    min-width: 400px;
    margin: 0 auto;

    .el-tree-node {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
</style>


