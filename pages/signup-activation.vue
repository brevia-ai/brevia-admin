<template>
  <main class="grow">
    <div class="mt-6 max-w-lg mx-auto flex flex-col space-y-4">
      <div>
        <h1 class="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {{ $t('ACCOUNT_ACTIVATION_PAGE') }}
        </h1>
      </div>
      <p v-if="loading">{{ $t('CHECKING') }}...</p>
      <p v-else-if="error" class="text-center">{{ $t('AN_ERROR_OCCURRED') }}</p>
      <div v-else>
        <h1 class="text-center text-2xl font-bold">{{ $t('SUCCESS') }}!</h1>
        <br />
        <img class="mx-auto" src="/check.png" /><br />
        {{ $t('ACCOUNT_ACTIVATED') }}!<br />
        {{ $t('CAN_ACCESS_NOW') }}.<br />
        <div class="text-center mt-10">
          <NuxtLink class="p-4 button text-sm rounded-md" to="/auth">{{ $t('GO_TO_LOGIN_PAGE') }}</NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const { signupActivation } = useIntegrationAuth();

const { pending: loading, error } = await signupActivation();
</script>
