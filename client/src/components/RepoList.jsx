import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ul>
      {props.repos.map((item) => {
        <ListItem repo={item} />
      })}
    </ul>
  </div>
)

export default RepoList;