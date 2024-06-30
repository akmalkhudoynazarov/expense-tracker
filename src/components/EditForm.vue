<script setup>
import { computed, ref } from 'vue';
import { useModalStore } from '@/stores/modals';
import { useExpenseStore } from '@/stores/expense';
import { expenseRef } from '@/database/firestore';
import { doc, updateDoc } from 'firebase/firestore';


const store = useExpenseStore()
const modal = useModalStore()
const selectedDoc = computed(() => {
    return store.data.find(item => item.id === modal.editId)
})
// Variables
const date = ref('')
const desc = ref('')
const category = ref('')
const method = ref('')
const amount = ref(null)

// Redefine variables to selectedDoc values
date.value = selectedDoc.value.date
desc.value = selectedDoc.value.desc
category.value = selectedDoc.value.category
method.value = selectedDoc.value.method
amount.value = selectedDoc.value.amount

// Update selectedDoc values
const updateData = async () => {
const newDoc = doc(expenseRef, selectedDoc.value.id)
await updateDoc(newDoc, {
    date: date.value,
    desc: desc.value,
    category: category.value,
    method: method.value,
    amount: amount.value
})
modal.openBtn = false
}
</script>
<template>
  <div class="form">
    <h3>Edit Form</h3>
    <form @submit.prevent="updateData">
    <div class="form-row">
        <label for="date">Date: </label>
        <input type="date" name="date" placeholder="Date" v-model="date">
    </div>
    <div class="form-row">
        <label for="desc">Description: </label>
        <input type="text" name="desc" size="30" v-model="desc">
    </div>
    <div class="form-row">
        <label for="category">Category: </label>
        <select name="category" id="" v-model="category">
            <option value="household">Household</option>
            <option value="car">Car</option>
            <option value="restaurants">Restaurants</option>
            <option value="travel">Travel</option>
            <option value="health">Healthcare</option>
            <option value="supermarket">Supermarket</option>
            <option value="other">Other</option>
        </select>
    </div>
    <div class="form-row">
        <label for="method">Method: </label>
        <select name="method" id="" v-model="method">
          <option value="card">Card</option>
          <option value="cash">Cash</option>
        </select>
    </div>
    <div class="form-row">
        <label for="amount">Amount(€): </label>
        <input type="number" step="0.01" v-model="amount">
    </div>
    <div class="form-row">
        <input type="submit" value="Update"> 
    </div>
</form>
  </div>
</template>
<style scoped>
.form{
  padding: 15px 0;
  width: 400px; 
}
.form h3{
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
}
form{
  width: 90%;
  margin: 20px auto;
}
.form-row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
form input, form select{
  border-radius: 2px;
  border: none;
  padding: 3px;
  font-size: 1rem;
}
.form-row label {
    flex-basis: 25%;
}

form input[type='submit']{
  font-size: 1rem;
  font-weight: bolder;
  cursor: pointer;
  min-width: 100px;
  margin: 5px auto;
  padding: 10px;
}
.form button{
  display: block;
  margin: auto;
  cursor: pointer;
}
</style>