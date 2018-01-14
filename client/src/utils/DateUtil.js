const isInRange = (start, end, check) => {
	return check >= start && check <= end
}

export const areDatesInRange = (start1, end1, start2, end2) => {
	return (isInRange(start1, end1, start2) || isInRange(start1, end1, end2) || isInRange(start2, end2, start1) || isInRange(start2, end2, start1))
}