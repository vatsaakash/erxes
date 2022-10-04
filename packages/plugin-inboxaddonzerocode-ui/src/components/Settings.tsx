import { Wrapper } from '@erxes/ui/src/layout';
import React from 'react';

class Settings extends React.Component<any, any> {
  constructor(props) {
    super(props);

    const { configDetail } = props;

    this.state = {
      apiKey: configDetail.apiKey
    };
  }

  save = e => {
    e.preventDefault();

    this.props.save({
      apiKey: this.state.apiKey
    });
  };

  onChange = (kind, e) => {
    this.setState({ [kind]: e.target.value });
  };

  render() {
    const { apiKey } = this.state;

    const content = (
      <div>
        <input
          placeholder="Api key"
          value={apiKey}
          onChange={this.onChange.bind(this, 'apiKey')}
        />

        <button onClick={this.save}>save</button>
      </div>
    );

    return <Wrapper content={content} />;
  }
}

export default Settings;
