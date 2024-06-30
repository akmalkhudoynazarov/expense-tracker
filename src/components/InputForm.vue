<script setup>
import { ref } from 'vue';
import { expenseRef } from '@/database/firestore';
import { addDoc } from 'firebase/firestore';
import { useModalStore } from '@/stores/modals';

const modal = useModalStore()

// Variables
const date = ref('')
const desc = ref('')
const category = ref('')
const method = ref('')
const amount = ref(null)

// Add new doc
const addExpense = async () => {
  if(desc.value && date.value && category.value && method.value && amount.value){
  const docRef = await addDoc(expenseRef, {
    id: '_' + new Date().getTime().toString(36),
    date: date.value,
    desc: desc.value,
    category: category.value,
    method: method.value,
    amount: amount.value,
})
  date.value = ''
  desc.value = ''
  category.value = ''
  method.value = ''
  amount.value = ''
  modal.openBtn = false
} else {
 alert("Fill all necessary data!") 
}
}

</script>
<template>
  <div class="form">
    <h3>New expense</h3>
    <form @submit.prevent="addExpense">
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
        <input type="submit"> 
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