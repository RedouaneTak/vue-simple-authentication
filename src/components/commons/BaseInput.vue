<script setup lang="ts">

const props = defineProps<{

  label: string
  id: string
  type: string
  error?: string
}>()

const model = defineModel()
</script>

<template>

    <label class="base-input-label" :for="props.id">
      <span class="base-input-text">{{ props.label }}</span>
      <input class="base-input-field"
        :class="{ 'has-error': error}"
        :id="props.id"
        :type="props.type"
        v-model="model"
      />

      <span v-if="error" :id="`${id}-error`" class="base-input-error">{{ error }}</span>
    </label>

</template>

<style scoped>

.base-input-label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  font-family: inherit;
}

.base-input-text {
  margin-bottom: 0.25rem;
  font-weight: 500;
  font-size: 0.95rem;
}

.base-input-field {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.base-input-field:focus {
  outline: none;
  border-color: #4f46e5;
}

.base-input-error {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #dc2626;
}
</style>
