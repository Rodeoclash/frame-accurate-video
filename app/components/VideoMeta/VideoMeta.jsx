export const VideoMeta = ({ currentFrame }) => {
  return (
    <dl>
      <dt>Current Frame</dt>
      <dd>{currentFrame === null ? 'Unset' : currentFrame}</dd>
      <dt>Current Frame (rounded)</dt>
      <dd>{currentFrame === null ? 'Unset' : Math.round(currentFrame)}</dd>
    </dl>
  )
}

export default VideoMeta;
