import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import styles from './DestinationPicker.css';
import AutocompleteItem from '../AutocompleteItem';
import { classNames, delay, makeKey } from '../../helpers';

class DestinationPicker extends Component
{
  state = {
    value: '',
    loading: false,
    items: [
      {
        id: 1,
        name: 'Tennessee',
      },
      {
        id: 2,
        name: 'Texas',
      },
      {
        id: 3,
        name: 'California',
      },
    ],
  };

  wrapperProps = {
    className: styles.wrapper,
  };

  onChange = (e, value) => {
    this.setState({
      value,
    });
  };

  onSelect = (value, item) => {
    this.setState({
      value,
      loading: false,
    });
  };

  renderMenu = (items, value) => {
    const className = classNames({
      [ styles.menu ]: true,
      [ styles.isLoading ]: this.state.loading,
    });

    return (
      <div className={className} data-num-items={items.length}>
        {items}
      </div>
    );
  };

  getItemValue = item => item.name;

  renderItem = (item, isHighlighted) => (
    <div key={makeKey('item', item.name)}>
      <AutocompleteItem {...item} isHighlighted={isHighlighted} />
    </div>
  );

  shouldItemRender = (item, value) => {
    return item.name.toLowerCase().startsWith( value.toLowerCase() );
  }

  constructor(props) {
    super(props);
  }

  componentDidMount()
  {
    console.info(`You're using ${this.props.name} version ${this.props.version}`);
  }

  componentWillUnmount()
  {
    console.log('unmounted');
  }

  render()
  {
    const inputId ='destination-picker-input';

    return (
      <div className={styles['destination-picker']}>
        <h1>{this.props.name}</h1>

        <label htmlFor={inputId}>Search for a destination:</label>

        <Autocomplete
          inputProps={{ id: inputId }}
          items={this.state.items}
          value={this.state.value}
          getItemValue={this.getItemValue}
          renderMenu={this.renderMenu}
          renderItem={this.renderItem}
          onChange={this.onChange}
          onSelect={this.onSelect}
          wrapperProps={this.wrapperProps}
          wrapperStyle={null}
          shouldItemRender={this.shouldItemRender}
        />
      </div>
    );
  }
}

DestinationPicker.propTypes = {
  name: PropTypes.string,
  version: PropTypes.string,
};

export default DestinationPicker;
