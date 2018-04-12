import { h, Component } from "preact";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import DataTable from "../../components/DataTable";

export default class DataTableTest extends Component {
    render() {
        return <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px" }}>
            <Card>
                <div style={{ margin: "24px", marginTop: "0" }}>
                    <h2 class=" mdc-typography--title">Hi</h2>
                    <div class=" mdc-typography--caption">Let me subtitle</div>
                </div>
                <Card.Media className="card-media">
                    <DataTable 
                        selectable={true}
                        rows={["SKU", "Name", "Teams", "Region", "Type"]}
                        data={[...Array(10)].map(a => ["A", "B", "C", "D", "E"])}
                    />
                </Card.Media>
                <Card.Actions>
                    <Card.ActionButton>OKAY</Card.ActionButton>
                </Card.Actions>
                </Card>
            </div>
    }
}