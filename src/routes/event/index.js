import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import Tabs from 'preact-material-components/Tabs';
import 'preact-material-components/Tabs/style.css';
import DataTables from 'material-ui-datatables';

import DivisionTabs from './components/DivisionTabs';
import EventInfo from "./components/EventInfo";
import EventRankings from "./components/EventRankings";
import EventMatches from "./components/EventMatches";

import style from './style';

import { route } from "preact-router";
import { get, cache } from "vexdb";
import { loadAll } from "../../lib/vexdb";

const itemize = (array, key) =>
	[{}, ...array].reduce((obj, item) => (obj[item[key]] = item, obj))

export default class Event extends Component {
	state = {
		data: {},
		loaded: false,
		activeDivision: "Science"
	}

	componentDidMount() {
		if (this.state.loaded) return;

		let sku = this.props.sku;
		loadAll([
			get("events", { sku }),
			get("teams", { sku }),
			get("rankings", { sku })
				.then(ranks => ranks.sort((a, b) => a.rank - b.rank)),
			get("matches", { sku })
		], this.setState.bind(this));
	}

	render({ sku }, { data, loaded }) {
		if (!loaded) return <div>Loading...</div>;
		let [event, teams, rankings, matches, teamInfo] = [...data, itemize(data[1], "number")];
		data = { event, teams, rankings, matches, teamInfo };

		document.title = `${event.name} | Project Curse`
		return <div>
			<LayoutGrid class={style.space}>
				<EventInfo data={data} />
				<EventRankings data={data} />
				<EventMatches data={data} />
			</LayoutGrid>
		</div >
	}
}
