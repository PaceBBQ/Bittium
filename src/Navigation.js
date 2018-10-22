//import './Navigation.css';
import NavigationItem from './NavigationItem';
import React from 'react';
import { Subreddit } from './types';

interface Props {
  activeUrl: string;
  items: Array<Subreddit>;
  itemSelected: (item: Subreddit) => void;
}

export default class Navigation extends React.Component<Props> {
  setSelectedItem = (item: Subreddit) => {
    this.props.itemSelected(item);
  };

  render() {
    const items = this.props.items
      .sort(
        (a, b) =>
          // Sort by # of subscribers in descending order
          b.data.subscribers - a.data.subscribers
      )
      .map(item => (
        <NavigationItem
          item={item}
          itemSelected={this.setSelectedItem}
          key={item.data.id}
          selected={item.data.url === this.props.activeUrl}
        />
      ));

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul>
            {items}
          </ul>
        </div>
      </nav>
    );
  }
}