<script setup>
import { ref, reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router'

import { useLoginStore } from '@/stores/login'

const loginStore = useLoginStore()

const router = useRouter()

const form = ref(null)

const data = {
  login: '',
  email: '',
  password: '',
  confirmPassword: '',

}

const formData = reactive({
  ...data
})

const rules = computed(() => {
  return {
    login: {
      required: helpers.withMessage('lalalalal', required),
        minLength: helpers.withMessage('This field must have a min length of 6 symbols', minLength(6))
    },
    email: { required, email: helpers.withMessage('This field must contains @', email) },
    password: { required, sameAs: sameAs('123') },
    confirmPassword: { required, sameAs: sameAs(formData.password) },
  }
})

const v$ = useVuelidate(rules, formData)

const login = async () => {
  const payload = {
    firstName: formData.firstName,
    email: formData.email,
    confirmPassword: formData.confirmPassword,
  }

  const valid = await v$.value.$validate()

  if (valid) {
    localStorage.setItem('user', JSON.stringify(payload))
    loginStore.changeIsLoggedIn(true)
    router.push({
      name: 'game'
    })
    clearForm()
  } else {
    alert('Form is not valid')
  }
}
function clearForm() {
  v$.value.$reset()
  for (const [key, value] of Object.entries(data)) {
    formData[key] = value
  }
}
</script>

<template>
    <v-card variant="tonal" class="w-100 card">
        <v-form ref="form" class="form" @submit.prevent>
            <v-text-field
                class="mb-3"
                v-model="formData.login"
                label="First Name"
                variant="outlined"
                :error-messages="v$.login.$errors.map((e) => e.$message)"
                @blur="v$.login.$touch"
                @input="v$.login.$touch"
            ></v-text-field>

            <v-text-field
                class="mb-3"
                v-model="formData.email"
                label="Email address"
                placeholder="johndoe@gmail.com"
                type="email"
                variant="outlined"
                :error-messages="v$.email.$errors.map((e) => e.$message)"
                @blur="v$.email.$touch"
                @input="v$.email.$touch"
            ></v-text-field>

            <v-text-field
                class="mb-3"
                v-model="formData.password"
                hint="Enter your password to access this website"
                label="Password"
                type="password"
                variant="outlined"
                :error-messages="v$.password.$errors.map((e) => e.$message)"
                @blur="v$.password.$touch"
                @input="v$.password.$touch"
            ></v-text-field>

            <v-text-field
                class="mb-3"
                v-model="formData.confirmPassword"
                hint="Enter your password to access this website"
                label="Confirm Password"
                type="password"
                variant="outlined"
                :error-messages="v$.confirmPassword.$errors.map((e) => e.$message)"
                @blur="v$.confirmPassword.$touch"
                @input="v$.confirmPassword.$touch"
            ></v-text-field>

            <div class="d-flex flex-column">
            <v-btn class="mt-4" color="success" block @click="login">Login</v-btn>

            <!-- <v-btn class="mt-4" color="error" block @click="clearForm"> Reset Form </v-btn> -->
            </div>
        </v-form>
    </v-card>

</template>

<style lang="scss" scoped>
.card {
    max-width: 600px;
}
.form {
  max-width: 600px;
  width: 100%;
}
</style>
