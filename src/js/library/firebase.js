import * as firebase from "firebase";
import { config } from "./config";

/* Firebase 初始化 */
export const firebaseApp = firebase.initializeApp(config.firebase);

export const DB = {
    auth: firebaseApp.auth(),
    set: (path, data) => {
        firebaseApp
            .database()
            .ref(path)
            .set(data);
    },
    update: (path, data) => {
        firebaseApp
            .database()
            .ref(path)
            .update(data);
    },
    remove: path => {
        firebaseApp
            .database()
            .ref(path)
            .remove();
    },
    pushKey: path => {
        return firebaseApp
            .database()
            .ref(path)
            .push().key;
    },
    on: (path, action) => {
        firebaseApp
            .database()
            .ref(path)
            .on("value", action);
    },
    once: (path, action) => {
        firebaseApp
            .database()
            .ref(path)
            .once("value", action);
    },
    /* 第一次判斷 */
    onAuthChanged: thisEnvironment => {
        firebaseApp.auth().onAuthStateChanged(firebaseUser => {
            /* 判斷登入狀態決定登入視窗是否顯示*/
            let thisStateUser;
            let thisStateMap = "";
            if (firebaseUser) {
                thisStateUser = Object.assign({}, thisEnvironment.state.user, {
                    email: firebaseUser.email,
                    uid: firebaseUser.uid,
                    password: "",
                    photoURL: firebaseUser.photoURL
                });
                /* 取得使用者資料 */
                const path = `/users/${firebaseUser.uid}`;
                DB.on(path, function(snapshot) {
                    thisStateUser.name = snapshot.val().name;
                    /* 較高畫質大頭貼 */
                    if (snapshot.val().photoURL) {
                        thisStateUser.photoURL = snapshot.val().photoURL;
                    }
                    if (snapshot.val().plan) {
                        thisStateUser.plan = snapshot.val().plan;
                    }
                    thisEnvironment.setState({
                        user: thisStateUser,
                        map: thisStateMap
                    });
                });

                /* 取得此使用者旅程資料 */
                firebaseApp
                    .database()
                    .ref()
                    .child("plans")
                    .orderByChild("author")
                    .equalTo(firebaseUser.uid)
                    .on("value", function(snapshot) {
                        const plan = snapshot.val();
                        thisEnvironment.setState({ all_trip: plan });
                    });

                thisEnvironment.setState({
                    user: thisStateUser,
                    login_and_signup: "hide"
                });
            } else {
                /* 沒有登入狀態 */
                thisStateUser = Object.assign({}, thisEnvironment.state.user, {
                    name: "",
                    email: "",
                    password: "",
                    uid: "",
                    photoURL: "",
                    plan: ""
                });
                thisEnvironment.setState({
                    user: thisStateUser,
                    menu: "",
                    trip_attractions: "hide",
                    login_and_signup: "",
                    map: ""
                });
            }
        });
    },
    /* 帳號密碼註冊 */
    createUserWithEmailAndPassword: thisStateUser => {
        return DB.auth.createUserWithEmailAndPassword(
            thisStateUser.email,
            thisStateUser.password
        );
    },
    /* 帳號密碼登入 */
    signInWithEmailAndPassword: thisStateUser => {
        return DB.auth.signInWithEmailAndPassword(
            thisStateUser.email,
            thisStateUser.password
        );
    },
    /* 帳號密碼登入後更新 firebase 會員資料 */
    setMemberInformation: thisStateUser => {
        const path = `/users/${firebase.auth().currentUser.uid}`;
        const data = {
            name: thisStateUser.name,
            email: thisStateUser.email,
            uid: firebase.auth().currentUser.uid
        };
        DB.set(path, data);
    },
    /* google 與 fb 登入 */
    signInWithPopup: (provider, provider_name, fbPhotoSize) => {
        DB.auth
            .signInWithPopup(provider)
            .then(function(result) {
                DB.auth.onAuthStateChanged(firebaseUser => {
                    const path = `/users/${firebaseUser.uid}`;
                    DB.on(path, function(snapshot) {
                        if (!snapshot.val()) {
                            const path = `/users/${firebaseUser.uid}`;
                            const data = {
                                name: result.user.displayName,
                                email: result.user.email,
                                uid: firebaseUser.uid,
                                photoURL: result.user.photoURL + fbPhotoSize,
                                provider: provider_name
                            };

                            DB.set(path, data);
                        }
                    });
                });
            })
            .catch(function(error) {
                if (
                    error.code ==
                    "auth/account-exists-with-different-credential"
                ) {
                    alert(
                        `您好，此信箱 ( ${
                            error.email
                        } ) 已註冊為會員，再麻煩您使用 google 登入`
                    );
                }
            });
    },
    /* 登出 */
    signOut: () => {
        DB.auth.signOut();
    }
};
