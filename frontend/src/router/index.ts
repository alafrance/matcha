import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import {useAuthStore} from "@/stores/userStore";
import {fetchStatus} from "@/api/auth";
// import NotFoundView from "@/views/NotFoundView.vue";

const redirectToProfile = async (to: any, from: any, next: any) => {
  const authStore = useAuthStore();

  if (authStore.email) {
    console.log("redirect to profile");
    return next({name: 'profile'})
  }
  return next();
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {hideHeaderInfo: true},
      beforeEnter: redirectToProfile
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: {hideHeaderInfo: true},
      beforeEnter: redirectToProfile
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: {hideHeaderInfo: true},
      component: () => import('@/views/auth/forgot-password/ForgotPasswordView.vue'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/auth/forgot-password/ResetPassword.vue'),
      meta: {hideHeaderInfo: true}
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: () => import('@/views/auth/VerifyEmailView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/mail-verify-email',
      name: 'mail-verify-email',
      component: () => import('@/views/auth/MailPageVerificationEmail.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/user/ProfileView.vue'),
      // meta: { requiresAuth: true },
      // children: [
        // {
        //   path: 'edit-profile',
        //   name: 'edit profile',
        //   component: () => import('@/views/user/EditProfile.vue'),
      ////     meta: { requiresAuth: true },
      //   },
        // {
        //   path: 'preferences',
        //   name: 'preferences',
        //   component: () => import('@/views/user/Preferences.vue'),
        //   // meta: { requiresAuth: true },
        // },
        // {
        //   path: 'settings',
        //   name: 'settings',
        //   component: () => import('@/views/user/Settings.vue'),
        //   // meta: { requiresAuth: true },
        // },
        // {
        //   path: 'chat/:id',
        //   name: 'chat',
        //   component: () => import('@/views/user/ChatView.vue'),
        //   // meta: { requiresAuth: true },
        // },
        // {
        //   path: ':id',
        //   name: 'user-profile',
        //   component: () => import('@/views/user/UserProfileView.vue'),
        // }
      // ]
    },
    {
      path: '/create-profile',
      name: 'create-profile',
      component: () => import('@/views/user/CreateProfileView.vue'),
      // meta: { requiresAuth: true },
    },
    // {
    //   path: '/:catchAll(.*)', // Capture toutes les routes non définies
    //   name: 'NotFound',
    //   component: NotFoundView,
    // },
  ]
})

router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore();
  try {
    const { connected, user } = await fetchStatus();

    if (user) authStore.storeUserInfo(user);
    if (to.name === 'create-profile' && user.first_name) {
      return next({name: 'profile'})
    }
    if (to.meta.requiresAuth) {
        if (!connected && to.name !== 'login') {
          return next({name: 'login'})
        }
        else if (!user.verify_email) {
          if (to.name !== 'verify-email')
            return next({name: 'verify-email'})
          else
            return next();
        }
        else if (!user.first_name) {
          if (to.name !== 'create-profile')
            return next({name: 'create-profile'})
          else
            return next();
        }
        return next();
    }
  } catch (error) {
    return next()
  }
  return next()
})
export default router
