<template>
  <div class="login-page">
    <div class="section-top">
      <div class="logo-container">
        <div class="logo-title">Weatherify</div>
      </div>
    </div>
    <div class="content">
      <section class="forms-section">
        <div class="form-container">
          <div class="form">
            <div class="sign-in-section">
              <span class="sign-in">Sign in</span>
            </div>
            <div class="input-section">
              <form @submit.prevent="login">
                <label for="email"></label>
                <input
                    type="email"
                    v-model="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                />
                <label for="password"></label>
                <input
                    type="password"
                    v-model="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <span
                    class="password-validation"
                    v-if="!passwordValidator.test(password)"
                >Password must include eight characters, 1 uppercase letter, 1
                  number and 1 special character</span
                >
                <button class="submit" type="submit">Log In</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section class="container-reducer"></section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      passwordValidator:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      date: new Date(),
    };
  },
  methods: {
    login() {
      if (this.passwordValidator.test(this.password)) {
        localStorage.setItem("X-token", this.email + " " + this.date);
        this.$router.push("/dashboard/weather");
      }
    },
  },
});
</script>

<style scoped>
.login-page {
  background-image: url("../assets/weather.jpg");
}

.section-top {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 50px;
}

.logo-title {
  font-size: 50px;
  color: #fff700;
}

.content {
  display: flex;
}

.forms-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 3rem;
}

.password-validation {
  display: inline-block;
  font-size: 14px;
  color: #535353;
  margin-top: 8px;
}

.sign-in-section {
  display: flex;
  background-color: white;
}

.sign-in {
  color: #0f3b58;
  font-weight: bold;
  font-size: 30px;
  padding: 30px 0;
}

.form-container {
  display: flex;
  flex-direction: column;
  box-shadow: 6px 6px 7px #00000026;
  border-radius: 10px;
  background-color: white;
  padding: 20px 50px;
  height: 45%;
}

.form {
  width: 338px;
}

.container-reducer {
  width: 66%;
  height: calc(100vh - 90px);
}

.submit {
  display: block;
  width: 250px;
  height: 50px;
  border: none;
  background: #0f3b58;
  border-radius: 5px;
  opacity: 1;
  color: white;
  cursor: pointer;
  margin: 45px auto 0;
  font-size: 24px;
}

.input-section input {
  color: #797979;
  display: block;
  width: 100%;
  margin-top: 8px;
  padding-right: 35px;
  padding-left: 3px;
  font-size: 16px;
  line-height: 40px;
  border-bottom: 1px solid #ababab;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  background-color: white;
}

#email {
  margin-bottom: 2rem;
  font-size: 22px;
  outline: none;
  background-color: white;
}

#password {
  font-size: 22px;
  outline: none;
  background-color: white;
}
</style>
