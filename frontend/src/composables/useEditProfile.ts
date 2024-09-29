import * as yup from "yup";
import {useYup} from "@/composables/useYup";
import {useForm} from 'vee-validate';
import {useAuthStore} from "@/stores/userStore";
import {useIsValidForm} from "@/composables/useIsValidForm";
import _ from 'lodash'
import {fetchUpdateUserImages, fetchUpdateUserProfile} from "@/api/user";
import {submitProfile} from "@/composables/useCreateProfile";

export const useEditProfile = () => {
	const {picturesSchema, interestsSchema, usernameSchema, dateSchema} = useYup();
	const schema = yup.object({
		pictures: picturesSchema,
		biography: yup.string().required(),
		interests: interestsSchema,
		first_name: usernameSchema,
		last_name: usernameSchema,
		location: yup.object().shape({
			lat: yup.number(),
			lng: yup.number(),
		}),
		date: dateSchema,
		gender: yup.string().required("You need to choose one of this field"),
		interestedIn: yup.string().required("You need to choose one of this field"),
	})

	const userStore = useAuthStore();
	const initialValues = {
		pictures: userStore.user.pictures?.map(picture => ({url: picture, file: null})),
		biography: userStore.user.biography,
		interests: userStore.user.interests,
		first_name: userStore.user.first_name,
		last_name: userStore.user.last_name,
		location: {
			lat: userStore.user.location_lat,
			lng: userStore.user.location_lng,
		},
		date: userStore.user.date_of_birth,
		gender: userStore.user.gender,
		interestedIn: userStore.user.interested_in
	}

	const {handleSubmit, validate, values, errors} = useForm({
		validationSchema: schema,
		initialValues
	})

	const {isValid, hasWritten} = useIsValidForm(values, validate);

	const getModifiedFields = (initialValues: any, formValues: any) => {
		const modifiedFields: Record<string, any> = {};
		for (const key in formValues)
			if (!_.isEqual(formValues[key], initialValues[key]))
				modifiedFields[key] = formValues[key];
		return modifiedFields;
	};

	const onSubmit = handleSubmit(async (values) => {
		const modifiedValues = getModifiedFields(initialValues, values);
		if (_.isEmpty(modifiedValues))
			return ;

		// @ts-ignore
		submitProfile(modifiedValues);
	})

	return {
		isValid,
		initialValues,
		hasWritten,
		onSubmit,
		validate,
		errors
	}
}
