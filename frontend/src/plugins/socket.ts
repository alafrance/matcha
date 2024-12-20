import { io } from "socket.io-client";
import URL from "@/helpers/URL";
import {useAuthStore} from "@/stores/authStore";

export const useSocket = () => {
	const authStore = useAuthStore();
	if (!authStore.user.id || authStore.user.id === undefined || authStore.user.id === null) return;
	const socket = io(URL, {
		query: {
			user_id: authStore.user.id
		}
	});
	setInterval(() => {
		if (socket.connected) {
			socket.emit('client-ping');
		}
	}, 5000);
	return socket;
}