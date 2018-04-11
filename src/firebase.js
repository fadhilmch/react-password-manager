import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDtN-BG5EHrUh7LzwBIBp5Xc5xwSuuYY2I",
  databaseURL: 'https://type-racer-cd507.firebaseio.com/',
  projectId: 'type-racer-cd507'
}

let app = firebase.initializeApp(config)
let db = app.database()
export const auth = app.auth()
export const password_manager = db.ref('password_manager')
