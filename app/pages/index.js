import React from "react";
import Head from 'next/head'
import VideoJS from 'components/VideoJS/VideoJS.jsx'
import VideoMeta from 'components/VideoMeta/VideoMeta.jsx'
import Image from 'next/image'

import styles from '../styles/Home.module.css'

const FRAME_RATE = 30;
const DEFAULT_STOP_ON_FRAME = 78;

export default function Home() {
  const playerRef = React.useRef(null);
  const stopOnFrameRef = React.useRef(DEFAULT_STOP_ON_FRAME);
  const [currentFrame, setCurrentFrame] = React.useState(null);
  const [stopOnFrame, setStopOnFrame] = React.useState(DEFAULT_STOP_ON_FRAME);

  const videoJsOptions = { // lookup the options in the docs for more options
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: false,
    sources: [{
      src: 'https://videodelivery.net/fae238cc13a661221dbc7ec4cb8582c1/manifest/video.mpd',
      type: 'application/dash+xml'
    }]
  }

  const handlePlayerReady = (player, videoElement) => {
    playerRef.current = player;

    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });

    const frameCounter = (time, metadata) => {
      const count = metadata.mediaTime * FRAME_RATE;
      const roundedCount = Math.round(count);

      console.log(roundedCount, stopOnFrameRef.current)

      if (roundedCount === stopOnFrameRef.current) {
        player.pause();
      }

      setCurrentFrame(count);

      videoElement.requestVideoFrameCallback(frameCounter);
    }

    videoElement.requestVideoFrameCallback(frameCounter)
  };

  const handleBack = () => {
    playerRef.current.currentTime(playerRef.current.currentTime() - 1 / FRAME_RATE);
  }

  const handleForwards = () => {
    playerRef.current.currentTime(playerRef.current.currentTime() + 1 / FRAME_RATE);
  }

  const handleChangeStopOnFrame = (event) => {
    const value = event.target.value;
    setStopOnFrame(value);
    stopOnFrameRef.current = parseInt(value, 10);
  }

  React.useEffect(() => {
    function onKeyup(e) {
      if (e.keyCode === 37) {
        handleBack();
      } else if (e.keyCode === 39) {
        handleForwards();
      }
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <article className={styles.article}>
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </article>
        <aside className={styles.aside}>
          <h2>Video meta</h2>
          <VideoMeta currentFrame={currentFrame} />
          <h2>Controls</h2>
          <p>Can also use arrow keys</p>
          <div>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleForwards}>Forward</button>
          </div>
          <h2>Stop on frame</h2>
          <p>Set the frame to stop on</p>
          <input type="number" min="0" step="1" onChange={handleChangeStopOnFrame} value={stopOnFrame} />
          <h2>Stopping on frame 78 should match</h2>
          <Image
            src="/match.png"
            width={259}
            height={478}
          />
        </aside>
      </main>
    </>
  )
}
