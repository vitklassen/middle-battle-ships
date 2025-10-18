import { Component, PropsWithChildren, ReactNode } from 'react';

type Props = {
  errorComponent: ReactNode
} & PropsWithChildren

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    console.error(error);
  }

  /* eslint-disable react/destructuring-assignment */
  public render() {
    if (this.state.hasError) {
      return this.props.errorComponent;
    }
    return this.props.children;
  }
}
