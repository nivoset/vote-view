import type { District, BallotData } from '../types/ballot';
import { getMockBallotData, findDistrictByZip, getDistrictBySlugs as getDistrictBySlugsFromData, mockDistricts } from '../data/mockOhioData';

/**
 * Abstracted ballot service API layer
 * This can be easily replaced with a real API call in the future
 */
export class BallotService {
	/**
	 * Get ballot data for a specific district
	 */
	async getBallotData(district: District): Promise<BallotData | null> {
		// For MVP, use mock data
		// In production, this would make an API call:
		// const response = await fetch(`/api/ballot/${district.id}`);
		// return await response.json();
		
		return getMockBallotData(district.id);
	}

	/**
	 * Find district by zip code
	 */
	async findDistrictByZipCode(zipCode: string): Promise<District | null> {
		// For MVP, use mock data
		// In production, this would make an API call:
		// const response = await fetch(`/api/districts?zip=${zipCode}`);
		// return await response.json();
		
		return findDistrictByZip(zipCode);
	}

	/**
	 * Get all available districts (for manual selection)
	 */
	async getAllDistricts(): Promise<District[]> {
		// For MVP, return mock districts
		// In production, this would make an API call:
		// const response = await fetch('/api/districts');
		// return await response.json();
		
		return mockDistricts;
	}

	/**
	 * Get districts by state
	 */
	async getDistrictsByState(state: string): Promise<District[]> {
		// For MVP, filter mock districts
		// In production, this would make an API call:
		// const response = await fetch(`/api/districts?state=${state}`);
		// return await response.json();
		
		return mockDistricts.filter(d => d.state.toLowerCase() === state.toLowerCase());
	}

	/**
	 * Find district by state/district slugs
	 */
	async getDistrictBySlugs(stateSlug: string, districtSlug: string): Promise<District | null> {
		return getDistrictBySlugsFromData(stateSlug, districtSlug);
	}
}

// Export a singleton instance
export const ballotService = new BallotService();

