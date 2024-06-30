<script setup>
import { useModalStore } from '@/stores/modals';

const modal = useModalStore()
</script>
<template>
    <div class="modal">
      <div class="modal-inner-block">
        <div class="close" @click="modal.close()">x</div>
        <slot />
      </div>
  </div>
</template>
<style scoped>
.modal {
  display: block;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.5); /* Black w/ opacity */
}

.modal-inner-block{
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: rgb(97, 97, 97);
  border: 0.1px solid grey;
  padding: 10px;
}
.close{
  position: absolute;
  right: 15px;
  top: 5px;
  padding: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>