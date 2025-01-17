import { useEffect, useRef, useState } from 'react'
import { FaPlay, FaPause, FaExpand, FaCompress } from 'react-icons/fa'

interface VideoPlayerProps {
  url: string
  autoplay?: boolean
  playbackSpeed?: number
  closedCaptions?: boolean
  onComplete?: () => void
}

export const VideoPlayer = ({
  url,
  autoplay = false,
  playbackSpeed = 1,
  closedCaptions = false,
  onComplete
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed
    }
  }, [playbackSpeed])

  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play()
    }
  }, [autoplay])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
      if (videoRef.current.currentTime === videoRef.current.duration) {
        onComplete?.()
      }
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={url}
        className="w-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        {closedCaptions && (
          <track
            kind="captions"
            src={`${url}.vtt`}
            srcLang="en"
            label="English"
            default
          />
        )}
      </video>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="text-white hover:text-[#5865F2]"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-[#5865F2]"
          >
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </div>
    </div>
  )
}
