import React from 'react';
import { Story } from './types';

interface Props {
  items: Array<Story>;
}

// No state and doesn't need instance
// It will pe implemented as a stateless function, i.e. a plain javascript function.

export default function StoryList(props: Props) {

  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th>Votes</th>
          <th>Topic</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map(item => (
          <tr key={item.data.id}>
            <td>
              <p className="votes">{item.data.score}</p>
            </td>
            <td>
              <p className="title">
                <a href={item.data.url}>{item.data.title}</a>
              </p>
              <p className="excerpt">
                {item.data.public_description}
              </p>
              <p className="author">
                Posted by <span>{item.data.author}</span>
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

}