import { ComponentType, Component } from 'react';
import { checkIfAuthorized } from '../../api/utils';

export function authorizationChecker(WrappedComponent: ComponentType) {
  class CheckedComponent extends Component {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: any) {
      super(props);
      checkIfAuthorized();
    }

    public render() {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <WrappedComponent {...this.props} />;
    }
  }

  return CheckedComponent;
}
