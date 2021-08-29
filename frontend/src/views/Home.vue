<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <button @click="getUsers">Дай юзеров</button>
      <div>
        <input v-model="form.name" type="text" placeholder="Логин">
        <input v-model="form.password" type="text" placeholder="Пароль">
        <input v-model="form.mail" type="text" placeholder="Почта">
        <input v-model="form.phone" type="text" placeholder="Телефон">
        <button @click="setNewUser">Зарегаться</button>
      </div>

      <div class="users">
        {{ users }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',

  data() {
    return {
      form: {
        name: '',
        password: '',
        mail: '',
        phone: '',
      },
      users: null,
    };
  },

  methods: {
    async getUsers() {
      const response = await this.$axios.get('/api/users');

      this.users = response.data;
    },

    async setNewUser() {
      this.$axios.post('/api/users', this.form);
    },
  },
};
</script>
