import { ResponseStories, ResponseSubreddits, Story, Subreddit } from './types';
import Navigation from './Navigation';
import React from 'react';
import StoryList from './StoryList';
import Header from './header';

interface State {
  // The active Reddit URL whose items are being rendered
  activeNavigationUrl: string;

  // List of possible Subreddits for the user to choose
  navigationItems: Array<Subreddit>;

  // Stories for the current activeNavigationUrl
  storyItems: Array<Story>;

  // Name of the current Subreddit
  title: string;
}

export default class App extends React.Component<{}, State> {
  storiesCallbackName: ?string;

  constructor() {
    super();
    this.state = {
      activeNavigationUrl: '',
      navigationItems: [],
      storyItems: [],
      title: '',
    };
  }

  componentDidMount() {
    const documentHead = document.head;
    if (documentHead == null) throw new Error('No <head> to use for script injection.');

    const cbname = `fn${Date.now()}`;
    console.log(cbname);
    const script = document.createElement('script');
    script.src = `https://www.reddit.com/reddits.json?jsonp=${cbname}`;
    window[cbname] = (jsonData: ResponseSubreddits) => {
      this.setState({
        navigationItems: jsonData.data.children,
      });
      delete window[cbname];
      documentHead.removeChild(script);
    };

    // Start the JSONP request by injecting the `script` into the document.
    documentHead.appendChild(script);
  }

  setSelectedItem = (item: Subreddit) => {
    const documentHead = document.head;
    if (documentHead == null) throw new Error('No <head> to use for script injection.');

    const cbname = (this.storiesCallbackName = `fn${Date.now()}`);
    const script = document.createElement('script');
    script.src = `https://www.reddit.com${item.data.url}.json?sort=top&t=month&jsonp=${cbname}`;
    window[cbname] = (jsonData: ResponseStories) => {

      if (cbname === this.storiesCallbackName) {
        this.setState({ storyItems: jsonData.data.children });
      }

      delete window[cbname];
      documentHead.removeChild(script);
    };

    documentHead.appendChild(script);

    this.setState({
      activeNavigationUrl: item.data.url,
      storyItems: [],
      title: item.data.display_name,
    });
  };

  render() {
    return (
      <div>
        <Header />
        
        <Navigation
          activeUrl={this.state.activeNavigationUrl}
          items={this.state.navigationItems}
          itemSelected={this.setSelectedItem}
        />
        <h2 className="subheader">{this.state.title}</h2>
        <StoryList items={this.state.storyItems} />
      </div>
    );
  }
}