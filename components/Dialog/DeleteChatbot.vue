<template>
  <div class="space-y-8 leading-tight">
    <div class="text-center space-y-4">
      <Icon name="ph:warning-circle-bold" class="text-6xl text-pink-700" />
      <p class="text-lg">{{ $t('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS') }} chatbot?</p>
      <p class="font-bold">{{ collection.cmetadata?.title }}</p>
    </div>

    <div class="text-center space-y-4">
      <div class="space-y-2 text-sm">
        <p>{{ $t('THIS_ACTION_CANNOT_BE_UNDONE') }}. {{ $t('THE_FOLLOWING_WILL_ALSO_BE_ELIMINATED') }}</p>
        <div class="flex justify-center px-12">
          <ul class="list-square list-outside text-left">
            <li>{{ $t('ALL_DOWNLOADED_DOCUMENTS_RELATED_TO_THIS') }} chatbot</li>
            <li>{{ $t('THE_WHOLE_SET_OF_PERSONALISED_QUESTIONS_AND_ANSWERS_RELATED_TO_THIS') }} chatbot</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex justify-between space-x-4">
      <button class="button button-secondary uppercase" @click="$closeModal">{{ $t('CANCEL') }}</button>

      <button class="button button-danger uppercase" :class="{ 'is-loading': isDeleting }" @click="deleteChatbot">{{ $t('DELETE') }} chatbot</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  collection: {
    type: Object,
    default: () => ({}),
  },
});

const statesStore = useStatesStore();
const { $closeModal } = useNuxtApp();

const error = ref<string | null>(null);
const isDeleting = ref(false);
const { t } = useI18n();

const deleteChatbot = async () => {
  if (!props.collection.uuid) return;

  isDeleting.value = true;
  const integration = useIntegration();
  try {
    await $fetch(`/api/${integration}/collections/${props.collection.uuid}`, { method: 'DELETE' });
  } catch (err) {
    error.value = t('ERROR_DELETING_CHATBOT');
  }
  isDeleting.value = false;

  // update menu
  const newMenu = statesStore.menu.filter((item) => item.link !== `/chatbot/${props.collection.name}`);
  statesStore.menu = newMenu;

  $closeModal();
  navigateTo('/');
};
</script>
