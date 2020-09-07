<template>
  <div id="app" class="content" data-app>
    <header class="content__header">
      <Header></Header>
    </header>

    <aside class="content__aside">
      <LeftMenu></LeftMenu>
    </aside>

    <main class="content__main">
      <Users></Users>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Header: () => import('@/views/Header/Header'),
    LeftMenu: () => import('@/views/LeftMenu/LeftMenu'),
    Users: () => import('@/views/Users/Users'),
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/_reset.scss";
@import "~@/assets/styles/_main.scss";

.content {
  display: grid;
  grid-template-areas: "header header" "aside main";
  grid-template-rows: 43px 1fr;
  grid-template-columns: 340px 1fr;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 38px;

  &__header {
    grid-area: header;
    height: 43px;
    margin-top: 10px;
  }

  &__aside {
    grid-area: aside;
    margin-top: 60px;
    margin-bottom: 67px;
  }

  &__main {
    grid-area: main;
    margin-top: 60px;
    overflow-x: auto;
  }
}
</style>
