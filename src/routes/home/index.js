import { h, Component } from 'preact';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import Icon from 'preact-material-components/Icon';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import style from './style';

import { route } from "preact-router";
import { getEvents } from "../../lib/vexdb";

export default class Home extends Component {
	state = {
		events: {},
		loaded: false
	}

	componentDidMount() {
		if (this.state.loaded) return;
		getEvents(new Date("2018-03-09"))
			.then(events => this.setState({ events, loaded: true }));
	}


	render({ }, { events }) {
		events = events instanceof Array ? events : [events];
		return (
			<div class={style.home}>
				<List two-line>
					{events.map(event =>
						<List.LinkItem ripple href={`/event/${event.sku}`} class="list-item" class={style.item}>
							<span>{ event.name }</span>
							<Icon>keyboard_arrow_right</Icon>
						</List.LinkItem>
					)}
				</List>
			</div>
		);
	}
}
