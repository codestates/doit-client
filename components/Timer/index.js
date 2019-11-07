import React, { Component } from 'react';
import moment from 'moment';
import * as timerState from './timerStates';
import Title from './Title';
import TimerDisplay from './TimerDisplay/TimerDisplay';
import TimerButton from './TimerButton/TimerButton';
import TimerSetting from './TimerSetting/TimerSetting';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      // 초기 설정이 저장이 되어야함
      // moment 말고 다른 대안을 찾아도 좋을 듯
      currentTime: moment.duration(1, 'minutes'),
      baseTime: moment.duration(1, 'minutes'),
      timerState: timerState.NOT_SET,
      timer: null
    };
    this.setBaseTime = this.setBaseTime.bind(this);
    this.reduceTimer = this.reduceTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.completeTimer = this.completeTimer.bind(this);
  }

  setBaseTime(newBaseTime) {
    this.setState({
      baseTime: newBaseTime,
      currentTime: newBaseTime
    });
  }

  startTimer() {
    this.setState({
      timerState: timerState.RUNNING,
      timer: setInterval(this.reduceTimer, 1000)
    });
  }

  stopTimer() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
    this.setState({
      timerState: timerState.NOT_SET,
      timer: null
    });
  }

  resetTimer() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
    this.setState({
      timerState: timerState.NOT_SET,
      timer: null,
      currentTime: moment.duration(this.state.baseTime)
    });
  }

  completeTimer() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
    this.setState({
      timerState: timerState.COMPLETE,
      timer: null,
      currentTime: moment.duration(this.state.baseTime)
    });
  }
  reduceTimer() {
    if (
      this.state.currentTime.get('hours') === 0 &&
      this.state.currentTime.get('minutes') === 0 &&
      this.state.currentTime.get('seconds') === 0
    ) {
      this.completeTimer();
      return;
    }
    const newTime = moment.duration(this.state.currentTime);
    newTime.subtract(1, 'seconds');

    this.setState({
      currentTime: newTime
    });
  }

  render() {
    return (
      <div>
        <Title />
        <TimerDisplay currentTime={this.state.currentTime} />
        <TimerButton
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          resetTimer={this.resetTimer}
          timerState={this.state.timerState}
        />

        <TimerSetting
          baseTime={this.state.baseTime}
          setBaseTime={this.setBaseTime}
        />
      </div>
    );
  }
}

export default Timer;
