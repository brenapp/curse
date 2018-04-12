import { h, Component } from "preact";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import "preact-material-components/Button/style.css";

import Label from "../Label";

import style from "./style"

export default class DataTable extends Component {
    state = {
        selection: []
    }

    render({ selectable, rows, data }) {

    }
}