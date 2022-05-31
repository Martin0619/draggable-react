import React, { useState } from 'react'

export default function useDraggable() {
	const [isDragging, setIsDragging] = useState<boolean>(false)
	const [difference, setDifference] = useState<[number, number]>()
	const [position, setPosition] = useState<{ left: number; top: number }>()

	const onMouseDownHandler = (event: React.MouseEvent) => {
		setIsDragging(true)
		const DifferenceInX = event.screenX - event.currentTarget.getBoundingClientRect().left
		const DifferenceInY = event.screenY - event.currentTarget.getBoundingClientRect().top
		setDifference([DifferenceInX, DifferenceInY])
	}

	const onMouseMoveHandler = (event: React.MouseEvent) => {
		if (!isDragging) return

		const LeftPosition = event.screenX - difference[0]
		const TopPosition = event.screenY - difference[1]
		setPosition({ left: LeftPosition, top: TopPosition })
	}

	const onMouseUpHandler = (event: React.MouseEvent) => {
		setIsDragging(false)
	}

	return {
		...position,
		onMouseDownHandler,
		onMouseUpHandler,
		onMouseMoveHandler,
	}
}
