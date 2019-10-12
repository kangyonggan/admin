<template>
  <span>
    <span
      v-for="menu in list"
      :key="menu.code"
    >
      <el-menu-item
        v-if="!menu.children"
        :index="menu.url"
      >
        <i
          v-if="menu.icon"
          :class="menu.icon"
        />
        <span slot="title">{{ menu.name }}</span>
      </el-menu-item>

      <el-submenu
        v-else
        :index="menu.code"
      >
        <template slot="title">
          <i
            v-if="menu.icon"
            :class="menu.icon"
          />
          <span slot="title">{{ menu.name }}</span>
        </template>
        <menus :list="menu.children" />
      </el-submenu>
    </span>
  </span>
</template>

<script>
    export default {
        name: 'Menus',
        props: {
            list: {
                required: true,
                type: Array
            }
        }
    };
</script>
