<script setup lang="ts">
import HeaderChildrenProfilePage from "@/components/headers/HeaderSettingsPages.vue";
import {useSettings} from "@/composables/useSettings";
import InputWithField from "@/components/utility/InputWithField.vue";
import {useAuthStore} from "@/stores/authStore";
import {Button} from "@/components/ui/button";
import { Separator } from '@/components/ui/separator'
import MyContainer from "@/components/utility/MyContainer.vue";

const {onSubmit, isValid, hasWritten, errors} = useSettings();
const userStore = useAuthStore();
</script>

<template>
  <MyContainer>
    <HeaderChildrenProfilePage text="Settings" :is-valid="isValid" :on-submit="onSubmit" :has-written="hasWritten"/>
    <form @submit.prevent="onSubmit">
      <InputWithField name="username" label="Username" :placeholder="userStore.username" type="text" />
      <Separator class="mt-6 mb-4" label="And / Or" />
      <InputWithField name="email" label="Email" :placeholder="userStore.email" type="email" />
      <Separator class="mt-6 mb-4" label="And / Or" />
      <InputWithField name="password" label="Password" placeholder="*******" type="password" />
      <InputWithField name="confirm_password" label="Confirm password" placeholder="*******" type="password" />
      <p v-if="hasWritten" class="text-destructive">
         {{errors['']}}
      </p>
      <div class="flex justify-center">
          <Button type="submit" size="sm" class="px-20 mt-4" :disabled="!hasWritten" :variant="hasWritten ? 'default' : 'secondary'">
            Save
          </Button>
      </div>
    </form>
  </MyContainer>
</template>