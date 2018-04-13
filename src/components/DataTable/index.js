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

class TableRow extends Component {

    constructor({ selected }) {
        super();
        this.state = { selected }
        
    }
    componentWillUpdate({ selected }) {
        this.setState({ selected });
    }

    render({ items, header, selectable, selected, onChange}) {
        
        return <List.Item class={`${header ? style.header : style.main} ${this.state.selected && !header ? style.selected : ""}`}>
            {selectable ?
                <Checkbox id="basic-checkbox" class={style.checkbox}  onChange={
                    () => (this.setState({ selected: !this.state.selected }), onChange(this.state.selected))
                } checked={this.state.selected}/>
                : null}
            {items.map((col, i) => <span>{items[i]}</span>)}
        </List.Item>
    }
}

export default class DataTable extends Component {

    constructor({ data }) {
        super()
        this.state = {
            selected: Array(data.length).fill(false)
        }
    }

    render({ selectable, cols, data }, { selected }) {
        return <div class={style.fullwidth}>
            <List>
                <TableRow selectable header items={cols} onChange={
                    state => this.setState({ selected: Array(data.length).fill(state) })
                } />
                {data.map((item, i) =>
                    <TableRow selectable items={item} selected={selected[i]}/>
                )}
            </List>
        </div >
    }
}