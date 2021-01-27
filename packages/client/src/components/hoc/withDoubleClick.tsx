import { useState, useCallback, useEffect } from "react";

// This function takes a component...
function withDoubleClick(WrappedComponent: any) {
  const NewComponent = (props: any) => {
    const [alreadySelected, setAlreadySelected] = useState(
      props.overrideSelected || false
    );
    useEffect(() => {
      setAlreadySelected(props.overrideSelected);
    }, [props.overrideSelected]);

    const handleClick = useCallback(() => {
      if (alreadySelected) {
        if (props.onDoubleClick) props.onDoubleClick();
      }

      if (props.onClickUpdate) props.onClickUpdate(!alreadySelected);
      setAlreadySelected(!alreadySelected);
    }, [alreadySelected, setAlreadySelected, props]);

    return <WrappedComponent {...props} onClick={handleClick} />;
  };

  return NewComponent;

  // ...and returns another component...
  // return class extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.handleChange = this.handleChange.bind(this);
  //     this.state = {
  //       data: selectData(DataSource, props),
  //     };
  //   }

  //   componentDidMount() {
  //     // ... that takes care of the subscription...
  //     DataSource.addChangeListener(this.handleChange);
  //   }

  //   componentWillUnmount() {
  //     DataSource.removeChangeListener(this.handleChange);
  //   }

  //   handleChange() {
  //     this.setState({
  //       data: selectData(DataSource, this.props),
  //     });
  //   }

  //   render() {
  //     // ... and renders the wrapped component with the fresh data!
  //     // Notice that we pass through any additional props
  //   }
  // };
}

export default withDoubleClick;
