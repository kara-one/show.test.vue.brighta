<template>
  <section class="users-list">
    <ul class="add">
      <li v-for="user in users" :key="user.id">{{ formatDate(user.registration_timestamp) }}</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'UsersList',
  created() {
    //this.getAllUsers();
    //this.getToken();
  },
  computed: {
    users() {        
      return this.$store.getters.USERS;
    }},
  methods: {
    formatDate(date) {
      date = new Date(date);
        
      var mm = date.getMonth();
      mm = this.$store.getters.NAME_MONTHS[mm];

      var dd = date.getDate();
      if (dd < 10) {dd = '0' + dd;}

      var yy = date.getFullYear();

      return mm + ' ' + dd + '. ' + yy;
    }
  }
};
</script>

<style scoped lang="scss">
.users-list {
  background-color: $color_bg_white;
  border-radius: 10px;
}
</style>
