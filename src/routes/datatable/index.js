import { h, Component } from "preact";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import DataTable from "../../components/DataTable";

export default class DataTableTest extends Component {
    render() {
        return <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px" }}>
            <Card>
                <Card.Media className="card-media">
                    <DataTable
                        selectable={true}
                        cols={["SKU", "Name", "Teams", "Region", "Type"]}
                        data={Array(10).fill(["A", "B", "C", "D", "E"])}
                        title={"Some Data"}
                    />
                </Card.Media>
                <Card.Actions>
                    <Card.ActionButton>OKAY</Card.ActionButton>
                </Card.Actions>
            </Card>
        </div>
    }
}