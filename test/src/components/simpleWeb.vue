<template>
	<section>
		<div class="container">
			<h2>Add new Students</h2>
			<form @submit.prevent="handleSubmit()" id="signupform">
				<div class="form-group">
					<label for="email"><b>Enter Email</b></label>
					<input type="text" id="email" placeholder="Email" v-model="email">
				</div>
				<div class="form-group">
					<label for="password"><b>Enter Password</b></label>
					<input type="password" id="pass" placeholder="Password" v-model="pass">
				</div>
				<div class="form-group">
					<label for="name"><b>Enter Name</b></label>
					<input type="text" name="name" id="name" placeholder="Name" v-model="name">
				</div>
				<div class="form-group">
					<label for="phone"><b>Enter Phone Number</b></label>
					<input type="number" name="phone" id="phone" placeholder="Phone" v-model="phone">
				</div>
				<div class="form-group">
					<label for="class"><b>Enter Class</b></label>
					<input type="number" name="classno" id="classno" placeholder="Class" v-model="classno">
				</div>
				<div class="batch">
					<label for="batch"><b>Enter Batch Year</b></label>
					<input type="number" name="batch" id="batch" placeholder="batch" v-model="batch">
				</div>

				<button class="btn btn-success" @click="add()">Add</button>
				<button class="btn btn-danger" @click="clear()">Clear</button>
			</form>
		</div>
		<!-- <div v-for="user in users" :key="user.uid">
      <p>{{ user.name }}</p>
      <p>{{ user.pass }}</p>
    </div> -->
	</section>
</template>

<script>
import firebase from '../firebase/config';
import { db, detachedAuth, authApp } from '../firebase/config';

export default {
data() {
  return {
    name: '',
    pass: '',
    email: '',
    phone: '',
    classno: '',
    batch: ''
  }
},
methods: {
  handleSubmit() {
    console.log('submit')
  },
  add() {
    let user = {
      name: this.name,
      pass: this.pass,
      email: this.email,
      phone: this.phone,
      classno: this.classno,
      batch: this.batch,
      userid: '',
			adminid: ''
    }

		// login state
		firebase.auth().onAuthStateChanged((user) => {
			if(user)
				user.adminid = user.uid;
				detachedAuth.createUserWithEmailAndPassword(this.email, this.pass)
      .then((userCredential) => {
        // Signed in 
        // get uid
        user.userid = userCredential.user.uid
        console.log(user)
        console.log(user.userid)

        authUser.functions().httpsCallable('createStudent')(user).then(() => {
            console.log('user created');
            form.reset();
          }).catch((err) => {
            console.log(err);
          })
      })
      .catch((error) => {
        console.log(error)
        // ..
      });
		});



    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     var uid = user.uid;
    //     console.log(uid)
    //     // ...
    //   } else {
    //     console.log('no user')
    //   }
    // });

    // db.collection(`student/${uid}/subject`).doc('xtnZlO0ewrfuzjuDbDBbZFAIkf33').get().then((doc) => {
    //   console.log(doc.data())
    // })

    // const docRef = addDoc(collection(db, 'users'), user)
    // db.collection('cities').doc(docRef.id).set({
    //   uid: docRef.id,
    // })
  },
  remove() {
    console.log('remove')
  }, 
  clear() {
    document.getElementById('container').reset()
  }
}
}
</script>

<style>
</style>