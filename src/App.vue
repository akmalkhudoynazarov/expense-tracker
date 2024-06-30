<script setup>
import ModalBlock from "@/components/ModalBlock.vue"
import InputForm from "@/components/InputForm.vue"
import DisplayData from '@/components/DisplayData.vue'
import { useModalStore } from '@/stores/modals'
import EditForm from '@/components/EditForm.vue'
import { useExpenseStore } from "./stores/expense"



const store = useExpenseStore()
const modal = useModalStore()

</script>

<template>
  <header>
    <h3>Expense Tracker</h3>
    <!-- Modal Form open/close button -->
    <button @click="modal.openInputForm()" class="open">+ Add expense</button>
  </header>

  <main>
    <DisplayData />
  </main>
  <!-- Modal popup content -->
  <ModalBlock v-if="modal.openBtn">
    <template v-if="modal.currentForm === 'input'">
      <InputForm />
    </template>
    <template v-else>
      <EditForm />
    </template>
  </ModalBlock>
  <div style="text-align: center;padding-top: 20px;">
    <button @click="store.exportData()">Download</button>
  </div>
</template>
<style>
header{
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
header h3{
  font-size: 2rem;
  font-weight: bold;
}
main{
  margin-top: 10px;
  border: 0.1px solid grey;
}

.open{
  cursor: pointer;
}
</style>./database/firestore