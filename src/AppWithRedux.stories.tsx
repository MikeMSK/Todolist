import React from "react";
import {AppWithRedux} from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import {ComponentMeta} from "@storybook/react";

export default {
    title: "AppWithRedux",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>


export const AppWithReduxBaseExample = () => {
    return <AppWithRedux/>
}