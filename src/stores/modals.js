import { ref } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  // Variables
  const editId = ref(null);
  const openBtn = ref(false);
  const currentForm = ref(null);
  // function to open input form
  const openInputForm = () => {
    openBtn.value = true;
    currentForm.value = "input";
  };
  // function to open edit form
  const openEditForm = (id) => {
    openBtn.value = true;
    currentForm.value = "edit";
    editId.value = id;
  };
  // function to close the modal
  const close = () => {
    openBtn.value = false;
    currentForm.value = null;
  };

  return {
    openBtn,
    currentForm,
    editId,
    openInputForm,
    openEditForm,
    close,
  };
});
