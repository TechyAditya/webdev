const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.createUser = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    const email = data.email;
    const name = data.name;
    const phno = data.phno;
    const role = data.role;
    db.collection('users').doc(uid).set({
        name: name,
        email: email,
        phno: phno,
        role: role
    }).then(() => {
        if (role == 'student') {
            db.collection('students').doc(uid).set({
                class: '',
                regno: '',
                marks: []
            }).then()
        } else if (role == 'teacher') {
            db.collection('teacher').doc(uid).set({
                rating: 0.0,
                classes: [],
                subjects: []
            }).then()
        } else if (role == 'admin') {
            db.collection('admin').doc(uid).set({
                position: ''
            }).then()
        }
    }).catch(error => {
        log.write(error);
    })
})

exports.updateStudentProfile = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    const classs = data.class;
    const regno = data.regno;
    const marks = data.marks;
    db.collection('students').doc(uid).set({
        class: classs,
        regno: regno,
        marks: marks
    }).then(() => {
        for (const [key, value] of Object.entries(marks)) {
            db.collection(`class/${classs}/${uid}/marks`).doc(key).set(value).then()
        }
        return true;
    }
    ).catch(error => {
        log.write(error);
        return false;
    })
})

exports.updateTeacherProfile = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    const cv = data.cv;
    db.collection('teacher').doc(uid).set({
        cv: cv
    }).then(() => {
        return true;
    }
    ).catch(error => {
        log.write(error);
        return false;
    })
})

exports.deleteUser = functions.https.onCall((data, context) => {
    const usr = context.auth.uid;
    const uid = data.uid;
    const role = data.role;
    db.collection('admin').doc(usr).get().then((doc) => {
        if(doc.exists) {
            db.collection('users').doc(uid).delete().then();
            if (role == 'student') {
                db.collection('students').doc(uid).delete().then();
            }
            else if (role == 'teacher') {
                db.collection('teacher').doc(uid).delete().then();
            }
            else if (role == 'admin') {
                db.collection('admin').doc(uid).delete().then();
            }
        }
    })
    admin.auth().deleteUser(uid).then(() => {
        return true;
    })
})

exports.setTimeTable = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    const classs = data.class;
    const timetable = data.timetable;
    db.collection('admin').doc(uid).get().then((doc) => {
        if(doc.exists) {
            db.collection('timetable/${classs}/monday').doc('timetable').set({
                timetable: timetable
            }).then(() => {
                return true;
            })
        }
    })
})
