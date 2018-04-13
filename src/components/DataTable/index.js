import { h, Component } from "preact";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import List from "preact-material-components/List";
import "preact-material-components/List/style.css";
import Checkbox from "preact-material-components/Checkbox";
import "preact-material-components/Checkbox/style.css";
import "preact-material-components/Button/style.css";

import Label from "../Label";

import style from "./style"

export default class DataTable extends Component {
    state = {
        selection: []
    }

    render({ selectable, cols, data }) {
        return <div class={style.fullwidth}>
            <List>
                <List.Item class={style.header}>
                    {selectable ?
                        <Checkbox id="basic-checkbox" class={style.checkbox} />
                        : null}
                    {cols.map(col => <span>{col}</span>)}
                </List.Item>
                {data.map(item =>
                    <List.Item class={style.main}>
                        {selectable ?
                            <Checkbox id="basic-checkbox" class={style.checkbox} />
                            : null}
                        {cols.map((col, i) => <span>{item[i]}</span>)}
                    </List.Item>
                )}
            </List>
        </div >
    }
}