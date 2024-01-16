import Firebase from "firebase"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_API_URL,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: "fitbook-ec77f",
  storageBucket: "fitbook-ec77f.appspot.com",
  messagingSenderId: "951658548577",
  appId: "1:951658548577:web:c59473042fb2d414820920",
  measurementId: "G-MH9ZSWXCK2"
}

class FireBase {
  constructor() {
    Firebase.initializeApp(firebaseConfig)
    this.auth = Firebase.auth()
    this.db = Firebase.firestore()
    this.fs = Firebase.firestore
    this.storage = Firebase.storage()
  }

  async isUserLoggedIn() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  async login(email, password) {
    const user = await this.auth
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        return false
      })
    return user
  }

  async register(name, personalTrainer, email, password) {
    await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(userDetails => {
        this.addUserDocuments(name, email, personalTrainer, userDetails)
      })
    return this.auth.currentUser.updateProfile({
      displayName: name
    })
  }

  async addUserDocuments(name, email, personalTrainer, userDetails) {
    try {
      this.db
        .collection("users")
        .doc(`${userDetails.user.uid}`)
        .set({
          first_name: name.split(" ")[0],
          second_name: name.split(" ")[1],
          goals: "",
          personal_trainer: personalTrainer,
          url: null,
          email: email,
          uid: userDetails.user.uid,
          is_pt: false
        })
      this.db
        .collection("meetings")
        .doc(`${userDetails.user.uid}`)
        .set({})
      return true
    } catch (error) {
      return false
    }
  }

  async logout() {
    await this.auth.signOut().catch(error => {
      console.log(error)
    })
  }

  getUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }

  getUserInitials() {
    return this.auth.currentUser.displayName
      .split(" ")
      .map(x => x.charAt(0))
      .join(".")
      .toUpperCase()
  }

  async getUserFields(field) {
    const data = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
    return data.get(field)
  }

  async addMeeting(allDay, date, name) {
    try {
      this.db.doc(`meetings/${this.auth.currentUser.uid}`).update({
        [name]: {
          allDay: allDay,
          start: date,
          title: name,
          backgroundColor: "#FF8603",
          textColor: "#000000",
          borderColor: "#000000",
          id: this.auth.currentUser.uid
        }
      })
      return true
    } catch (e) {
      return false
    }
  }

  async deleteMeeting(name) {
    try {
      this.db
        .collection("meetings")
        .doc(this.auth.currentUser.uid)
        .update({
          [name]: this.fs.FieldValue.delete()
        })
      return true
    } catch (e) {
      return false
    }
  }

  async updateProfile(userDetails) {
    try {
      Object.entries(userDetails).map(([key, value]) => {
        this.db.doc(`users/${this.auth.currentUser.uid}`).update({
          [key]: value
        })
      })
      return true
    } catch (e) {
      return false
    }
  }

  async getPersonalTrainers() {
    const data = await this.db
      .doc(`personal_trainers/mUULRo6M6ihFZt1l3evn`)
      .get()
    return data.data()
  }

  async getProfilePicture() {
    const ref = this.storage.ref(`images/${this.auth.currentUser.uid}`)
    return ref
      .child("me.jpg")
      .getDownloadURL()
      .then(url => {
        return url
      })
      .catch(e => {
        return null
      })
  }

  async uploadPicture(image) {
    try {
      await this.storage
        .ref(`images/${this.auth.currentUser.uid}/me.jpg`)
        .put(image)
      const url = await this.getProfilePicture()
      this.db.doc(`users/${this.auth.currentUser.uid}`).update({
        url: url
      })
      return true
    } catch {
      return false
    }
  }

  async resetPassword(email) {
    try {
      this.auth.sendPasswordResetEmail(email)
      return true
    } catch {
      return false
    }
  }

  async acceptMeeting(name, userId, state) {
    let stateColour = state == "accept" ? "#4CAF50" : "#F44336"
    try {
      this.db.doc(`meetings/${userId}`).set(
        {
          [name]: {
            backgroundColor: stateColour
          }
        },
        { merge: true }
      )
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

export default new FireBase()
