import React from "react";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: "EditableSpan",
    comment: EditableSpan
}

const changeCallback = action("Value changed")

export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpan value={"change me . . ."}
                         onChange={changeCallback}/>
}
