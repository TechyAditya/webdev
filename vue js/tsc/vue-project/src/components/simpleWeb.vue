<template>
  <section>
    <div class="container">
      <form @submit.prevent="handleSubmit()">
        <div class="form-group">
          <input type="text" id="name" placeholder="Enter Name" v-model="name">
        </div>
        <div class="form-group">
          <input type="password" id="pass" placeholder="Enter Password" v-model="pass">
        </div>
        <button @click="add()">Add</button>
        <button @click="remove()">Remove</button>
        <button type="submit">submit</button>
      </form>  
    </div>
    <!-- <div v-for="user in users" :key="user.uid">
      <p>{{ user.name }}</p>
      <p>{{ user.pass }}</p>
    </div> -->
  </section>
</template>

<script>
// eslint-disable-next-line
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/firebase/config'

export default {
data() {
  return {
    name: '',
    pass: ''
  }
},
methods: {
  handleSubmit() {
    // const q = query(collection(db, 'users'), where('name', '==', 'Sandeep'))
    onSnapshot(collection(db, 'users'), (querySnapshot) => {
      const users = []
      querySnapshot.forEach(doc => {
        users.push({
          uid: doc.id,
          ...doc.data()
        })
      })
      console.log(users)
    })
  },
  add() {
    let user = {
      name: this.name,
      pass: this.pass
    }

    const docRef = addDoc(collection(db, 'users'), user)
    db.collection('cities').doc(docRef.id).set({
      uid: docRef.id,
    })
  },
  remove() {
    console.log('remove')
  }
}
}
</script>

<style>

</style>