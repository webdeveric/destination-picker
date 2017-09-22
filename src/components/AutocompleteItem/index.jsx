import React from 'react';
import PropTypes from 'prop-types';
import styles from './AutocompleteItem.css';
import { classNames, makeKey } from '../../helpers';

function AutocompleteItem(props)
{
  const className = classNames({
    [ styles.item ]: true,
    [ styles.isHighlighted ]: props.isHighlighted,
  });

  return (
    <div key={makeKey('item', props.name, props.id)} className={className} onClick={props.onClick} onMouseEnter={props.onMouseEnter} data-id={props.id} data-level={props.place_level_assigned || 'none'}>
      {props.name}
    </div>
  );
}

AutocompleteItem.defaultProps = {
  place_level_assigned: 0,
  isHighlighted: false,
};

AutocompleteItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  place_level_assigned: PropTypes.number,
  isHighlighted: PropTypes.bool,
};

export default AutocompleteItem;
