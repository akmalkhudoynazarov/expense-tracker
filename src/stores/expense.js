import { defineStore } from "pinia";
import { useCollection } from "vuefire";
import { expenseRef } from "@/database/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import { computed, ref, watch } from "vue";

export const useExpenseStore = defineStore("expense", () => {
  // Variables
  const data = useCollection(expenseRef);
  const filterBy = ref({
    category: "",
    method: "",
    min: null,
    max: null,
    minDate: null,
    maxDate: null,
  });
  const filteredData = computed(() => {
    return data.value.filter((item) => {
      const categoryMatch =
        !filterBy.value.category || item.category === filterBy.value.category;
      const methodMatch =
        !filterBy.value.method || item.method === filterBy.value.method;
      const minAmount = filterBy.value.min !== null ? filterBy.value.min : 0;
      const maxAmount =
        filterBy.value.max !== null ? filterBy.value.max : Infinity;
      const amountMatch = item.amount >= minAmount && item.amount <= maxAmount;
      const minTime = filterBy.value.minDate
        ? new Date(filterBy.value.minDate).getTime()
        : 0;
      const maxTime = filterBy.value.maxDate
        ? new Date(filterBy.value.maxDate).getTime()
        : Date.now();
      const dateMatch =
        new Date(item.date).getTime() >= minTime &&
        new Date(item.date).getTime() <= maxTime;
      return categoryMatch && methodMatch && amountMatch && dateMatch;
    });
  });

  watch(
    () => filterBy.value.max,
    (newValue) => {
      if (newValue === "" || newValue === null) {
        filterBy.value.max = Infinity;
      }
    }
  );

  // Export data to CSV
  const exportData = () => {
    const items = filteredData.value;
    const headers = ["id", "date", "desc", "category", "method", "amount"];
    const csvContent = [
      headers.join(","), // header row first
      ...items.map((item) => headers.map((header) => item[header]).join(",")),
    ].join("\n");

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "expenses.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //   delete item
  const deleteItem = async (item) => {
    await deleteDoc(doc(expenseRef, item));
  };

  return {
    data,
    deleteItem,
    filteredData,
    filterBy,
    exportData,
  };
});
