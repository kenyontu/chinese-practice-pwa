/**
 * Renders the box in which the animation for the stroke order
 * will run
 */
import React, { useEffect, useState } from 'react'
import HanziWriter, { Writer } from 'hanzi-writer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './StrokeOrder.module.css'

interface Props {
  character: string
}

const DRAWING_AREA_SIZE = 150

const StrokeOrder: React.FC<Props> = ({ character }) => {
  const [writer, setWriter] = useState<Writer | null>(null)

  // TODO: add controls to the bottom
  useEffect(() => {
    const w = HanziWriter.create('stroke-order', character, {
      width: DRAWING_AREA_SIZE,
      height: DRAWING_AREA_SIZE,
      padding: 5,
      delayBetweenStrokes: 80,
    })

    setWriter(w)
  }, [character])

  const handlePlayClick = () => {
    if (writer) {
      writer.animateCharacter()
    }
  }

  return (
    <div className={styles.container}>
      <svg
        className={styles.strokeOrderView}
        xmlns="http://www.w3.org/2000/svg"
        width={DRAWING_AREA_SIZE}
        height={DRAWING_AREA_SIZE}
        id="stroke-order"
      >
        <line
          x1={DRAWING_AREA_SIZE / 2}
          y1="0"
          x2={DRAWING_AREA_SIZE / 2}
          y2={DRAWING_AREA_SIZE}
          stroke="#DDD"
        />
        <line
          x1="0"
          y1={DRAWING_AREA_SIZE / 2}
          x2={DRAWING_AREA_SIZE}
          y2={DRAWING_AREA_SIZE / 2}
          stroke="#DDD"
        />
      </svg>

      <button className={styles.playButton} onClick={handlePlayClick}>
        <FontAwesomeIcon icon="play" />
      </button>
    </div>
  )
}

export default StrokeOrder
