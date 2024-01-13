// place files you want to import through the `$lib` alias in this folder.

/**
 * @param {number} startYear
 */
export function getYearsSinceStartYear(startYear) {
	const currentYear = new Date().getFullYear();

	if (startYear <= currentYear) {
		return currentYear - startYear;
	} else {
		return 0; // Handle the case where startYear is in the future
	}
}

export { getBannerMessage, getHoursOfOperation, getMenu } from './firebase';
