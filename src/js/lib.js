let app = {};

/* Get Element */
app.get = function(selector) {
    return document.querySelector(selector);
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
                map_zoom: 17,
                map_center: map_center,
                current_map_center: map_center
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
                                if (i === 0) {
                                    opening = openingArray[i];
                                }
                                opening += `<br /> ${openingArray[i]}`;
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
