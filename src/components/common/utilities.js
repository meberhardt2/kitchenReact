
/****************************************/
export function compareForObjectsTag(a, b) {
	// Use toUpperCase() to ignore character casing
	const tagA = a.tag.toUpperCase();
	const tagB = b.tag.toUpperCase();

	let comparison = 0;
	if (tagA > tagB) {
		comparison = 1;
	} else if (tagA < tagB) {
		comparison = -1;
	}
	return comparison;
}
/****************************************/