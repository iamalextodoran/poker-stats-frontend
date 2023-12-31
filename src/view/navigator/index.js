import { connect } from 'react-redux';

import Navigator from './view';

export default connect(
  state => ({
    hasSession: state.user.hasSession,
  }),
  {},
)(Navigator);
