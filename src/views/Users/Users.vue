<template>
  <div class="users">
    <div class="users__filter">
      <UsersFilter></UsersFilter>
    </div>
    <div class="users__list">
      <UsersList></UsersList>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Users',
  components: {
    UsersFilter: () => import('@/components/UsersFilter/UsersFilter'),
    UsersList: () => import('@/components/UsersList/UsersList')
  }
};
</script>

<style scoped lang="scss">
.users {
    width: 100%;
    height: 100%;
    overflow-y: auto;

    &__filter {
        max-width: 1268px;
    }

    &__list {
        max-width: 1268px;
        margin-top: 10px;
    }
}
</style>
