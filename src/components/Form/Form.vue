<template>
  <div>
    <b-form
      action="/"
      method="post"
      id="register-form"
      class="form"
      name="register-form"
      autocomplete="off"
      enctype="multipart/form-data"
      @submit="onSubmit"
    >
      <b-form-group
        label="Name"
        label-for="register-name"
        aria-label="Your name"
      >
        <b-form-input
          v-model="form.name"
          id="register-name"
          type="text"
          name="register-name"
          :state="error.name"
          placeholder="Your name"
          autocomplete="off"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Email" label-for="register-email">
        <b-form-input
          v-model="form.email"
          id="register-email"
          type="email"
          name="register-email"
          :state="error.email"
          placeholder="Your email"
          aria-describedby="emailHelp"
          autocomplete="off"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Phone number"
        label-for="register-phone"
        description="Enter phone number in open format"
      >
        <b-form-input
          v-model="form.phone"
          id="register-phone"
          type="tel"
          name="register-phone"
          class="form-control"
          :state="error.phone"
          v-mask="'+380 ## ### ## ##'"
          placeholder="+380 XX XXX XX XX"
          pattern="\+380 [0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}"
          maxlength="17"
          aria-required="true"
          autocomplete="off"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Select your position">
        <b-form-radio-group
          v-model="form.position"
          name="register-position"
          :state="error.position"
          :options="position.options"
          plain
          stacked
        ></b-form-radio-group>
      </b-form-group>

      <b-form-group label="Photo" label-for="register-photo">
        <b-form-file
          v-model="form.image"
          id="register-photo"
          name="register-photo"
          :state="error.image"
          :file-name-formatter="formatFileNames"
          placeholder="Upload your photo"
          drop-placeholder="Drop file here..."
          accept="image/*"
        ></b-form-file>
      </b-form-group>

      <b-button type="submit" variant="red">Sing up now</b-button>
    </b-form>

    <div class="mt-3">
      <pre class="m-0">{{ token }}</pre>
      <pre class="m-0">{{ form }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: null,
      error: {
        name: null,
        email: null,
        phone: null,
        position: null,
        image: null
      },
      position: {
        options: [
          { text: "First radio", value: "first" },
          { text: "Second radio", value: "second" },
          { text: "Third radio", value: "third" }
        ]
      },
      form: {
        name: "",
        email: "",
        phone: "",
        position: "",
        image: null
      }
    };
  },
  created() {
    this.getPositions();
  },
  mounted() {
    this.onReset();
  },
  methods: {
    getPositions() {
      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: this.$store.getters.POSITIONS_DATA_GET
      };

      this.axios(options)
        .then(response => {
          //console.log("RESPONSE: ", response.data.positions);
          this.position.options.length = 0;
          response.data.positions.forEach((element, index) => {
            if (index === 0) {
              this.form.position = element.id;
            }

            this.position.options.push({
              text: element.name,
              value: element.id
            });
          });

          if (response.data.success === false) {
            this.error = "Error response data";
            console.log("-----error-------");
          }
        })
        .catch(error => {
          console.log("-----error-------");
          console.log(error);
          this.error = "Error:" + error;
        });
    },
    getToken() {
      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: this.$store.getters.TOKEN_DATA_GET
      };

      this.axios(options)
        .then(response => {
          if (response.data.success === false) {
            this.error = "Error response data";
            console.log("-----error-------");

            return false;
          }

          console.log("RESPONSE: ", response.data);
          this.token = response.data.token;
        })
        .then(() => {
          this.setUser();
        })
        .catch(error => {
          console.log("-----error-------");
          console.log(error);
          this.error = "Error:" + error;
        });
    },
    setUser() {
      /** */
      const formData = new FormData();
      const phone = this.form.phone.replace(/\s+/g, "");

      formData.append("position_id", this.form.position);
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("phone", phone);
      formData.append("photo", this.form.image);
      console.log(">> formData >> ", formData);

      const options = {
        method: "post",
        headers: {
          Token: this.token,
          "Content-Type": "multipart/form-data"
        },
        data: formData,
        url: this.$store.getters.USERS_DATA_POST
      };

      this.axios(options)
        .then(response => {
          if (response.data.success === false) {
            this.error = "Error response data";
            console.log("-----error-------");

            return false;
          }

          console.log("response ", response.data);

          //   this.$store.dispatch("SET_CONTENT", response.data);
          //             this.loading = false;

          //             // redirect on default lang if url '/'
          //             if (this.$route.path == "/") {
          //                 this.$router.push(this.$store.getters.CURRENTLANG);
          //             }
        })
        .catch(error => {
          console.log("-----error-------");
          console.log(error);
          this.error = "Error:" + error;
        });
    },
    formatFileNames(files) {
      if (files.length === 1) {
        this.form.image = files[0];
        return "Selected file: " + files[0].name;
      } else {
        return `${files.length} files selected`;
      }
    },
    onSubmit(evt) {
      evt.preventDefault();

      this.getToken();
    },
    onReset() {
      document.getElementById("register-form").reset();
      const firstPosition = this.position.options[0].value;

      this.form.name = "Sasasas Sasasas";
      this.form.email = "sasasass@sadttdsas.sa";
      this.form.phone = "112223326";
      this.form.position = firstPosition;
      this.form.image = null;
    }
  }
};
</script>

<style scoped lang="scss"></style>
