import classes from "./Counter.module.css";
import { counterActions } from "../../store/counter";
import { useAppDispatch, useAppSelector } from "../../store";
import React, { FC } from "react";

const Counter: FC = () => {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counterReducer.counter);
  const show = useAppSelector((state) => state.counterReducer.showCounter);

  const { increment, increase, decrement, toggleCounter } = counterActions;

  const incrementHandler = () => {
    dispatch(increment());
  };

  const increaseHandler = () => {
    dispatch(increase(10)); // { type: SOME_UNIQUE_IDENTIFIER, payload: 10 }
  };

  const decrementHandler = () => {
    dispatch(decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && (
        <div data-testid="count" className={classes.value}>
          {counter}
        </div>
      )}
      <div>
        <button data-testid="increment" onClick={incrementHandler}>
          Increment
        </button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button data-testid="decrement" onClick={decrementHandler}>
          Decrement
        </button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

/*class Counter extends Component {
  incrementHandler() {
    this.props.increment();
  }

  decrementHandler() {
    this.props.decrement();
  }

  toggleCounterHandler() {

  }

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter
  };
}

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' })
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Counter);*/
