let app = {
    firebase: {
        config: {
            apiKey: "AIzaSyBpNTLNQdlFzvFinsEEghCLbYbk2GlJD7k",
            authDomain: "funtrip-3d235.firebaseapp.com",
            databaseURL: "https://funtrip-3d235.firebaseio.com",
            // projectId: "funtrip-3d235",
            storageBucket: "funtrip-3d235.appspot.com"
            // messagingSenderId: "96865531068"
        }
    }
};

/* Get Element */
app.get = function(selector) {
    return document.querySelector(selector);
};

/* Get Elements */
app.getAll = function(selector) {
    return document.querySelectorAll(selector);
};

/* Firebase */
app.firebase_signInWithPopup = function(
    firebase,
    provider,
    provider_name,
    fbPhotoSize
) {
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
            firebase.auth().onAuthStateChanged(firebaseUser => {
                firebase
                    .database()
                    .ref("/users/" + firebaseUser.uid)
                    .on("value", function(snapshot) {
                        if (!snapshot.val()) {
                            firebase
                                .database()
                                .ref("/users/" + firebaseUser.uid)
                                .set({
                                    name: result.user.displayName,
                                    email: result.user.email,
                                    uid: firebaseUser.uid,
                                    photoURL:
                                        result.user.photoURL + fbPhotoSize,
                                    provider: provider_name
                                });
                        }
                    });
            });
        })
        .catch(function(error) {
            console.log(error.code, "dddd");
            console.log(error.email, "dddd");
            console.log(error.credential, "dddd");
            if (error.code == "auth/account-exists-with-different-credential") {
                alert(
                    `您好，此信箱 ( ${
                        error.email
                    } ) 已註冊為會員，再麻煩您使用 google 登入`
                );
            }
        });
};

/* 清除此 Element 所有 current class */
app.cleanAllCurrent = function(props) {
    const allCurrentDOM = [...app.getAll(props.element)];
    allCurrentDOM.map(item => {
        item.classList.remove("current");
    });
};

/* 清除 新增/編輯 欄位 除了 name 及類別 */

app.cleanCreactPlanTrip = function() {
    /* 修改/新增行程資料清空 */
    const allInformationLiDOM = [...app.getAll("div.information>ul>li")];
    const allTextareaDOM = [...app.getAll("div.textarea")];
    const inputDOM = app.get(".search_input");
    allInformationLiDOM.map(item => {
        item.classList.remove("current");
    });
    allTextareaDOM.map(item => {
        item.innerHTML = "";
    });
    inputDOM.id = "";
    app.cleanAllCurrent({ element: ".all_plan_detailed>div.current" });
};

/* Google map */
/* 修改標記地點 */
app.setMarker = function(props) {
    /* 定位 */
    if (props.coords) {
        props.marker.setPosition(props.coords);
    }

    /* 小圖像 */
    if (props.icon) {
        props.marker.setIcon(props.icon);
    }

    /* 小標籤 */
    if (props.content) {
        let infoWindow = new google.maps.InfoWindow({
            content: props.content
        });
        props.marker.addListener("click", function() {
            infoWindow.open(props.map, props.marker);
        });
    }

    /* 自動搜尋 id與座標 */
    if (props.placeId && props.location) {
        props.marker.setPlace({
            placeId: props.placeId,
            location: props.location
        });
    }
};

/* 自動輸入地點名稱 */
app.autocomplete = function(map, thisEnvironment) {
    const input = app.get(".search_input");

    let autocomplete = new google.maps.places.Autocomplete(input, {
        placeIdOnly: true
    });
    autocomplete.bindTo("bounds", map);

    let geocoder = new google.maps.Geocoder();

    autocomplete.addListener("place_changed", function() {
        let place = autocomplete.getPlace();

        if (!place.place_id) {
            return;
        }

        /* 使用 placeId 設定訊息 */
        geocoder.geocode({ placeId: place.place_id }, function(
            results,
            status
        ) {
            if (status !== "OK") {
                window.alert("Geocoder failed due to: " + status);
                return;
            }

            /* 顯示所在地點 */

            const thisLocation = results[0].geometry.location;
            let map_center = {
                lat: thisLocation.lat(),
                lng: thisLocation.lng()
            };
            thisEnvironment.props.handlePlanStateChange({
                stateName: "map_zoom",
                value: 17
            });
            thisEnvironment.props.handlePlanStateChange({
                stateName: "map_center",
                value: map_center
            });

            /* 自動填入名稱、營業時間、電話號碼、地址 */
            let service = new google.maps.places.PlacesService(map);
            service.getDetails(
                {
                    placeId: place.place_id,
                    location: thisLocation,
                    /* 設定需要資訊 */
                    fields: [
                        "name",
                        "opening_hours",
                        "international_phone_number",
                        "website"
                    ]
                },
                function(place, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        /* 營業時間 */
                        let opening = "";
                        if (place.opening_hours) {
                            let openingArray = place.opening_hours.weekday_text;
                            for (let i = 0; i < openingArray.length; i += 1) {
                                opening += openingArray[i] + "<br />";
                            }
                        }

                        /* 名稱、營業時間、電話號碼、地址、經緯度 */
                        let placeDetailsArray = [
                            results[0].formatted_address,
                            place.international_phone_number,
                            opening,
                            place.website
                        ];
                        input.value = place.name;
                        input.id = `lat_${thisLocation.lat()}_lng_${thisLocation.lng()}`;
                        for (let i = 1; i < 5; i++) {
                            if (placeDetailsArray[i - 1]) {
                                app.get(
                                    `.general>li:nth-child(${i})`
                                ).classList.add("current");
                                app.get(
                                    `.general>li:nth-child(${i}) div.textarea`
                                ).innerHTML = placeDetailsArray[i - 1];
                            }
                        }
                    }
                }
            );
        });
    });
};

export default app;
