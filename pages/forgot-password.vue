<template>
  <main class="max-w-sm mx-auto flex flex-col space-y-4">
    <h2 text-3xl class="text-gray-900 text-2xl sm:text-3xl font-bold tracking-tight">{{ $t('PASSWORD_RESET') }}</h2>
    <div v-if="mailSent && !error" class="flex flex-col space-y-4">
      <img class="mx-auto" width="40" height="40" src="/check.png" />
      <p>
        {{ $t('MAIL_TO') }} <span class="font-semibold">{{ resetMail }}</span>
      </p>
      <p>{{ $t('CHECK_YOUR_INBOX_RESET') }}</p>
    </div>

    <div v-else-if="!mailSent && error" class="flex flex-col space-y-4">
      <p class="text-lg text-center font-bold text-red-600">{{ $t('AN_ERROR_OCCURRED') }}</p>
      <button class="p-4 py-2.5 button text-sm font-semibold" @click="retry">Riprova</button>
    </div>

    <div v-else class="flex flex-col space-y-4">
      <p>{{ $t('RESET_INSTRUCTIONS') }}</p>
      <input
        ref="mailInput"
        v-model="resetMail"
        type="email"
        class="block w-full rounded-md border border-sky-800 px-3.5 py-2 shadow-sm sm:text-sm sm:leading-6"
        required
        :placeholder="$t('EMAIL_PLACEHOLDER', { email: 'mario@example.com' })"
      />
      <p v-if="resetMail && !isValidEmail()" class="text-sm font-bold text-red-600">{{ $t('NOT_VALID_EMAIL') }}</p>
      <button
        type="submit"
        class="p-4 py-2.5 button text-sm font-semibold"
        :class="loading ? 'loading' : ''"
        :disabled="!resetMail || !isValidEmail()"
        @click="sendResetMail"
      >
        {{ $t('SEND') }} Email
      </button>
    </div>
    <NuxtLink class="p-4 py-2.5 button text-sm font-semibold" to="/auth">{{ $t('GO_TO_LOGIN_PAGE') }}</NuxtLink>
    <div class="text-xs text-center text-neutral-400">
      <i18n-t keypath="RECAPTCHA" tag="p">
        <template #privacyPolicy>
          <a class="font-semibold" href="https://policies.google.com/privacy">{{ $t('PRIVACY_POLICY') }}</a>
        </template>
        <template #termsOfService>
          <a class="font-semibold" href="https://policies.google.com/terms">{{ $t('TERMS_OF_SERVICE') }}</a>
        </template>
      </i18n-t>
    </div>
  </main>
</template>

<script setup lang="ts">
const { resetPassword } = useIntegrationAuth();

const loading = ref(false);
const mailSent = ref(false);
const error = ref(false);
const resetMail = ref('');
const mailInput = ref(null);

const isValidEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(resetMail.value);
};

async function sendResetMail() {
  loading.value = true;
  error.value = false;
  try {
    await resetPassword(resetMail.value);
    mailSent.value = true;
  } catch (err) {
    error.value = true;
  } finally {
    loading.value = false;
  }
}

function retry() {
  error.value = false;
  mailSent.value = false;
  resetMail.value = '';
  mailInput.value = null;
  loading.value = false;
}
</script>
