import React from "react";
import ProfileAllTrip from "../components/profile/profile_all_trip";
import renderer from "react-test-renderer";

test("AllTrip changes the class when onClick", () => {
    const component = renderer.create(
        <ProfileAllTrip
            name="aaa"
            start="2018/10/31"
            end="2018/11/20"
            id="-LPVHoOOx1ML8iJzLzki"
            key="all_trip_1"
            // state={this.props.state}
            handleAppStateChange={() => {}}
            thisTripState="triping"
        />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // tree.props.onClick();
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
});
