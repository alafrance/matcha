<script setup lang="ts">
import HeaderChildrenProfilePage from "@/components/headers/HeaderSettingsPages.vue";
import {useEditProfile} from "@/composables/useEditProfile";
import FormFieldPictures from "@/components/formField/FormFieldPictures.vue";
import FormFieldBiography from "@/components/formField/FormFieldBiography.vue";
import {Button} from "@/components/ui/button";
import FormFieldFullName from "@/components/formField/FormFieldFullName.vue";
import MapLocation from "@/components/createProfile/utility/MapLocation.vue";
import FormFieldBirthDate from "@/components/formField/FormFieldBirthDate.vue";
import FormFieldGender from "@/components/formField/FormFieldGender.vue";
import FormFieldInterestedIn from "@/components/formField/FormFieldInterestedIn.vue";
import FormFieldInterestsWithPopup from "@/components/formField/FormFieldInterestsWithPopup.vue";
import MyContainer from "@/components/utility/MyContainer.vue";
const {onSubmit, hasWritten, isValid} = useEditProfile();

</script>

<template>
  <MyContainer>
    <HeaderChildrenProfilePage :on-submit="onSubmit" :is-valid="isValid" :has-written="hasWritten" text="Edit info" />
    <form @submit.prevent="onSubmit">

      <FormFieldPictures />
      <div class="m-4">
        <FormFieldBiography size="w-full" />

        <FormFieldInterestsWithPopup name="interests" />

        <FormFieldFullName />

        <MapLocation />

        <FormFieldBirthDate />

        <FormFieldGender />

        <FormFieldInterestedIn  />

        <div class="flex justify-center mb-4">
          <Button type="submit" size="lg" :disabled="!hasWritten" :variant="hasWritten ? 'default' : 'secondary'">
            Save
          </Button>
        </div>
      </div>

    </form>
  </MyContainer>

</template>