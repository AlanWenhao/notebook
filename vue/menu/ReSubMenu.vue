<template>
    <SubMenu>
        <template #title>{{data.title}}</template>
        <template v-for="item in data.children">
            <MenuItem :key="item.title">菜单</MenuItem>
        </template>
    </SubMenu>
</template>
<script>
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        MenuItem,
        SubMenu
    }
}
</script>
