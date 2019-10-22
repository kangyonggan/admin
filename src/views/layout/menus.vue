<template>
  <el-submenu
    :index="parentMenu.name"
    :popper-append-to-body="false"
  >
    <template slot="title">
      <i
        v-if="parentMenu.icon"
        :class="parentMenu.icon"
      />
      <span slot="title">{{ parentMenu.title }}</span>
    </template>

    <template v-for="menu in parentMenu.children">
      <el-menu-item
        v-if="!menu.children || !menu.children.length"
        :index="menu.path"
        :key="menu.name"
      >
        <i
          v-if="menu.icon"
          :class="menu.icon"
        />
        <span slot="title">{{ menu.title }}</span>
      </el-menu-item>

      <menus
        v-else
        :key="menu.name"
        :parent-menu="menu"
      />
    </template>
  </el-submenu>
</template>

<script>
    export default {
        name: 'Menus',
        props: {
            parentMenu: {
                required: true,
                type: Object
            }
        }
    };
</script>
