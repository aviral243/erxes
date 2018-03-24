import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EmbeddedPreview, PopupPreview, ShoutboxPreview } from './preview';
import { dimensions, colors } from 'modules/common/styles';
import { rgba } from 'modules/common/styles/color';
import { FlexItem, LeftItem, Preview, Title, BoxRow } from './style';

const Box = styled.div`
  display: inline-block;
  text-align: center;
  background: ${colors.colorLightBlue};
  box-shadow: ${props =>
    props.selected && `0 10px 20px ${rgba(colors.colorCoreDarkGray, 0.12)}`};
  border: 1px solid ${colors.borderPrimary};
  border-radius: ${dimensions.unitSpacing / 2}px;
  padding: ${dimensions.coreSpacing * 2}px;
  transition: all 0.25s ease;
  width: 270px;
  margin-right: 20px;
  margin-bottom: 20px;

  img {
    width: 40px;
    transition: all 0.5s ease;
  }

  span {
    color: ${colors.colorCoreGray};
    display: block;
    margin-top: ${dimensions.unitSpacing}px;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
    box-shadow: ${props =>
      !props.selected && `0 5px 5px ${rgba(colors.colorCoreGray, 0.08)}`};
  }
`;

const propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string,
  btnText: PropTypes.string,
  bodyValue: PropTypes.string,
  color: PropTypes.string
};

class ChooseType extends Component {
  renderBox(name, image, value) {
    const { __ } = this.context;
    return (
      <Box
        selected={this.props.type === value}
        onClick={() => this.onChange(value)}
      >
        <img src={image} alt={name} />
        <span>{__(name)}</span>
      </Box>
    );
  }

  onChange(value) {
    if (value === 'shoutbox') {
      return this.props.onChange('type', 'shoutbox');
    }

    if (value === 'popup') {
      return this.props.onChange('type', 'popup');
    }

    return this.props.onChange('type', value);
  }

  renderPreview() {
    const { type } = this.props;
    const { title, bodyValue, btnText, color } = this.props;

    if (type === 'shoutbox') {
      return (
        <ShoutboxPreview
          title={title}
          bodyValue={bodyValue}
          btnText={btnText}
          color={color}
        />
      );
    } else if (type === 'popup') {
      return (
        <PopupPreview
          title={title}
          bodyValue={bodyValue}
          btnText={btnText}
          color={color}
        />
      );
    }
    return (
      <EmbeddedPreview
        title={title}
        bodyValue={bodyValue}
        btnText={btnText}
        color={color}
      />
    );
  }

  render() {
    const { __ } = this.context;
    return (
      <FlexItem>
        <LeftItem>
          <Title>{__('Choose a flow type')}</Title>
          <BoxRow>
            {this.renderBox(
              'ShoutBox',
              '/images/icons/shoutbox.svg',
              'shoutbox'
            )}
            {this.renderBox('Popup', '/images/icons/expand.svg', 'popup')}
          </BoxRow>
          {this.renderBox('Embedded', '/images/icons/computer.svg', 'embedded')}
        </LeftItem>
        <Preview>{this.renderPreview()}</Preview>
      </FlexItem>
    );
  }
}

ChooseType.propTypes = propTypes;
ChooseType.contextTypes = {
  __: PropTypes.func
};

export default ChooseType;
