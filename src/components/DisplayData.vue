<script setup>
import { useExpenseStore } from '@/stores/expense';
import { useModalStore } from '@/stores/modals';


// Data from store
const store = useExpenseStore()
const modal = useModalStore()
</script>
<template>
    <table>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Category</th>
        <th>Method</th>
        <th>Amount</th>
        <th>Action</th>
      </tr>
      <tr>
        <td>
          <input type="date" v-model="store.filterBy.minDate">
          <input type="date" v-model="store.filterBy.maxDate">
        </td>
        <td>
        </td>
        <td>
          <select name="" id="" v-model="store.filterBy.category">
            <option value="">All</option>
            <option value="car">Car</option>
            <option value="restaurants">Restaurants</option>
            <option value="travel">Travel</option>
            <option value="health">Healthcare</option>
            <option value="supermarket">Supermarket</option>
            <option value="other">Other</option>
          </select>
        </td>
        <td>
          <select name="" id="" v-model="store.filterBy.method">
            <option value="">All</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
        </td>
        <td>
          <input type="number" placeholder="min" v-model="store.filterBy.min">
          <input type="number" placeholder="max" v-model="store.filterBy.max">
        </td>
      </tr>
      <tr v-for="item in store.filteredData" :key="item.id">
        <td>{{ item.date }}</td>
        <td>{{ item.desc }}</td>
        <td>{{item.category}}</td>
        <td>{{item.method}}</td>
        <td>${{ item.amount }}</td>
        <td>
          <button @click="modal.openEditForm(item.id)">edit</button> 
          <button @click="store.deleteItem(item.id)">delete</button></td>
      </tr>
    </table>
</template>
<style scoped>
table, tr{
  width: 100%;
  text-align: center;
}
table th{
  font-size: clamp(0.8rem, 1.5vw, 1.6rem);
  font-weight: bold;
}
table td, table button{
    font-size: clamp(0.7rem, 1.4vw, 1.5rem);
}
table button{
    cursor: pointer;
}
tabl td select, table td input{
  outline: none;
}
table td input{
  max-width: 70px;
  margin-right: 2px;
}
</style>