/* tripCatagory */
let triping = 0;
let unfinish = 0;
let finish = 0;
let thisTripState = "";

let setData = props => {
    return {
        CATEGORY_OBJ: {
            triping: [triping, "旅行中"],
            unfinish: [unfinish, "待出發"],
            finish: [finish, "回憶錄"]
        },
        CATEGORY_CONDITION_ARRAY: [
            new Date("2018/10/31") >= new Date(props.start) &&
                new Date("2018/10/31") <= new Date(props.end),
            new Date("2018/10/31") < new Date(props.start),
            new Date("2018/10/31") > new Date(props.end)
        ],
        thisTripState: thisTripState
    };
};

let setResult = props => {
    return {
        CATEGORY_OBJ: {
            finish: [props.finish, "回憶錄"],
            triping: [props.triping, "旅行中"],
            unfinish: [props.unfinish, "待出發"]
        },
        thisTripState: props.thisTripState
    };
};

export const tripCatagory = {
    data_1: setData({ start: "2018/10/31", end: "2018/11/01" }),
    result_1: setResult({
        finish: 0,
        triping: 1,
        unfinish: 0,
        thisTripState: "triping"
    }),
    data_2: setData({ start: "2018/10/01", end: "2018/10/31" }),
    result_2: setResult({
        finish: 0,
        triping: 1,
        unfinish: 0,
        thisTripState: "triping"
    }),
    data_3: setData({ start: "2018/10/01", end: "2018/10/30" }),
    result_3: setResult({
        finish: 1,
        triping: 0,
        unfinish: 0,
        thisTripState: "finish"
    }),
    data_4: setData({ start: "2018/11/01", end: "2018/11/31" }),
    result_4: setResult({
        finish: 0,
        triping: 0,
        unfinish: 1,
        thisTripState: "unfinish"
    })
};
