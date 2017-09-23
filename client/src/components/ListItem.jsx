import React from 'react';

const ListItem = (props) => {
  return <li>Github Handle: {props.repo.ghHandle}   -   <a href={props.repo.url}>Repo Name: {props.repo.repoName}</a></li>;
}

export default ListItem;