export const handleTripCategory = (props) => {
    let CATEGORY_OBJ;
    let thisTripState;
    let CATEGORY_OBJ_KEY = Object.keys(props.CATEGORY_OBJ);
    for (let i = 0; i < CATEGORY_OBJ_KEY.length; i++) {
        if (props.CATEGORY_CONDITION_ARRAY[i]) {
            props.CATEGORY_OBJ[CATEGORY_OBJ_KEY[i]][0] += 1;

            CATEGORY_OBJ = props.CATEGORY_OBJ;
            thisTripState = props.thisTripState = CATEGORY_OBJ_KEY[i];
            return { CATEGORY_OBJ, thisTripState };
        }
    }
};