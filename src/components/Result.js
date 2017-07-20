import React from 'react';

class Result extends React.Component {
  render() {
    const p = this.props;
    return (
      <div className="my-Result">
        <div>
            <img className="u-verticalAlign-middle" src={'https://www.linkbocs.com/pfcls/symbol-' + p.winnerSymbol + '_thumb.png'} />
            <span className="my-Result my-Result-verb u-inlineBlock u-verticalAlign-middle">{p.verb}</span>
            <img className="u-verticalAlign-middle" src={'https://www.linkbocs.com/pfcls/symbol-' + p.looserSymbol + '_thumb.png'} />
        </div>
        <h3>{p.whoami + ' avec ' + p.winnerSymbol + ' !' }</h3>
      </div>
    );
  }
}

Result.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default Result;
