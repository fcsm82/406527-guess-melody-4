import * as React from "react";

interface Props {
  isLoading: boolean;
  isPlaying: boolean;
  onPlayButtonClick: () => void;
}

export default class AudioPlayer extends React.PureComponent<Props, {}> {
  render() {
    const {isLoading, isPlaying, onPlayButtonClick, children} = this.props;

    return (
      <>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={() => onPlayButtonClick()}
        />
        <div className="track__status">
          {children}
        </div>
      </>
    );
  }
}
