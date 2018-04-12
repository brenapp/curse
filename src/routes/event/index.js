import { h, Component } from 'preact';
import LayoutGrid from "preact-material-components/LayoutGrid";
import "preact-material-components/LayoutGrid/style.css";

import DivisionTabs from './components/DivisionTabs';
import EventInfo from "./components/EventInfo";
import EventRankings from "./components/EventRankings";
import EventMatches from "./components/EventMatches";
import style from './style';

import { get } from "vexdb";
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
				<div class="card-container">
					<EventInfo data={data} />
					<EventRankings data={data} />
					<EventMatches data={data} />
				</div>
			</LayoutGrid>
		</div >
	}
}
