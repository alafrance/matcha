import { useAsyncState } from "@vueuse/core";
import {ref} from "vue";
import {fetchMatches} from "@/api/actions";
import {useRouter} from "vue-router";
import {useToast} from "@/components/ui/toast";
import {fetchMessages} from "@/api/chat";

export const useHomeChat = () => {
	const users = ref([] as (User & {message: string})[]);
	const isLoading = ref(true);
	const router = useRouter();

	useAsyncState(fetchMatches(), [], {
		immediate: true,
		async onSuccess(data) {
			users.value = await Promise.all(data.matches?.map(async (match: any) => {
				const user = match.user;
				const message = await fetchMessages(user?.id);
				user.message = message?.messages?.message;
				return user;
			}));
			isLoading.value = false;
			// 			data.matches?.map((match: any) => {
			// 				const user = match.user;
			// 				console.log(user.id);
			// 				// const message = await fetchMessages(user?.id);
			// 				// user.message = message.messages;
			// 				users.value.push(user);
			// 			}).then(() => isLoading.value = false);
		},
		onError(e) {
			console.log(e);
			const {toast} = useToast();
			toast({
				title: "An error occurred while fetching users",
				variant: "destructive",
			});
			router.push({name: 'home'});
			isLoading.value = false;
		},
	});

	return {
		users,
		isLoading
	}
}