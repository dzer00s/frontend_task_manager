import React from "react";
import { Container } from "@material-ui/core";
import ListTaskMenu from "../ListTaskMenu";
import InputTodo from "../Input";

const MainTask = () => {
    return (
        <div className="App">
            <Container maxWidth="lg">
                <InputTodo />
                <ListTaskMenu />
            </Container>
        </div>
    );
}

export default MainTask;