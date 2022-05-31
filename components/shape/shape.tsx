import { useEffect, useState } from 'react'
import useDraggable from '../../hooks/draggable.hook'
import cls from './styles.module.scss'

export default function Shape() {
	const draggle = useDraggable()
	const [screenWidth, setScreenWidth] = useState<number>()
	const [color, setColor] = useState<string>()

	function CurrentColor() {
		const fixedHex = +((draggle.left / screenWidth) * Color()).toFixed(0)
		const r = (fixedHex & 0xff0000) >> 16
		const g = (fixedHex & 0x00ff00) >> 8
		const b = fixedHex & 0x0000ff
		return `rgb(${r}, ${g}, ${b})`
	}

	useEffect(() => {
		if (!typeof window) return

		setScreenWidth(window.innerWidth / 2 - 250)
	}, [])

	// hex => decimal (red)
	function Color(color?: string) {
		return parseInt('ff0000', 16)
	}

	return (
		<div
			className={cls['shape']}
			style={{
				left: draggle.left,
				top: draggle.top,
				backgroundColor: color,
			}}
			onMouseDown={draggle.onMouseDownHandler}
			onMouseUp={draggle.onMouseUpHandler}
			onMouseMove={(e) => {
				draggle.onMouseMoveHandler(e)
				setColor(CurrentColor())
			}}
		>
			<div>innerWidth - 250 = {screenWidth}</div>
			<div>left = {draggle.left}</div>
			<div>current color = {color}</div>
		</div>
	)
}
