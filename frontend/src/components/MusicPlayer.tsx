const PlayIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const PauseIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

type Props = {
  isPlaying: boolean;
  onToggle: () => void;
};

export default function MusicPlayer(props: Props) {
  const { isPlaying, onToggle } = props;
  return (
    <div className="music-control">
      <button
        type="button"
        className="music-btn"
        onClick={onToggle}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? PauseIcon : PlayIcon}
      </button>
    </div>
  );
}
