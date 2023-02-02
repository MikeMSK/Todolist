import React from "react";
import {App} from "./App";
import {ComponentMeta} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
    title: "App stories",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>


export const AppBaseExample = (props: any) => {
    return <App demo={true}/>
}