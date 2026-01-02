import type { District, Position, Candidate, BallotMeasure, BallotData } from '../types/ballot';

// Mock districts for Ohio
export const mockDistricts: District[] = [
	{
		id: "oh-franklin-1",
		state: "Ohio",
		stateSlug: "oh",
		districtSlug: "franklin-1",
		name: "Franklin County - District 1",
		zipCodes: ["43201", "43202", "43203", "43204"]
	},
	{
		id: "oh-cuyahoga-2",
		state: "Ohio",
		stateSlug: "oh",
		districtSlug: "cuyahoga-2",
		name: "Cuyahoga County - District 2",
		zipCodes: ["44101", "44102", "44103", "44104"]
	},
	{
		id: "oh-hamilton-3",
		state: "Ohio",
		stateSlug: "oh",
		districtSlug: "hamilton-3",
		name: "Hamilton County - District 3",
		zipCodes: ["45201", "45202", "45203"]
	}
];

// Mock positions
export const mockPositions: Position[] = [
	{
		id: "pos-mayor-1",
		title: "Mayor",
		description: "Chief executive officer of the city",
		type: "office"
	},
	{
		id: "pos-council-1",
		title: "City Council - At Large",
		description: "City council member representing the entire city",
		type: "office"
	},
	{
		id: "pos-school-1",
		title: "School Board Member",
		description: "Member of the local school board",
		type: "office"
	}
];

// Mock candidates
export const mockCandidates: Candidate[] = [
	// Mayor candidates
	{
		id: "cand-mayor-1",
		name: "Sarah Johnson",
		positionId: "pos-mayor-1",
		platform: "I'm running for Mayor to bring fresh leadership and transparency to our city. My priorities include improving public transportation, investing in green infrastructure, and supporting small businesses. I have 15 years of experience in public service and a proven track record of working across party lines to get things done."
	},
	{
		id: "cand-mayor-2",
		name: "Michael Chen",
		positionId: "pos-mayor-1",
		platform: "As Mayor, I will focus on economic development and job creation. My plan includes tax incentives for businesses, workforce development programs, and infrastructure improvements. I believe in fiscal responsibility and will work to balance the budget while maintaining essential services."
	},
	{
		id: "cand-mayor-3",
		name: "Patricia Williams",
		positionId: "pos-mayor-1",
		platform: "I'm committed to making our city safer and more affordable. My platform includes increasing police presence in neighborhoods, expanding affordable housing programs, and reducing property taxes for seniors. I will prioritize the needs of working families and ensure their voices are heard."
	},
	// City Council candidates
	{
		id: "cand-council-1",
		name: "David Martinez",
		positionId: "pos-council-1",
		platform: "I believe in community-driven solutions. As a City Council member, I will hold regular town halls, support local arts and culture, and work to improve parks and recreational facilities. I'm committed to environmental sustainability and will push for renewable energy initiatives."
	},
	{
		id: "cand-council-2",
		name: "Jennifer Lee",
		positionId: "pos-council-1",
		platform: "My focus is on education and youth programs. I will advocate for increased funding for schools, after-school programs, and job training for young adults. I also support initiatives to make our city more walkable and bike-friendly."
	},
	{
		id: "cand-council-3",
		name: "Robert Thompson",
		positionId: "pos-council-1",
		platform: "I'm running to represent the interests of small business owners and entrepreneurs. I will work to streamline regulations, reduce red tape, and create a more business-friendly environment. I also support tax relief for homeowners and renters."
	},
	// School Board candidates
	{
		id: "cand-school-1",
		name: "Amanda Rodriguez",
		positionId: "pos-school-1",
		platform: "As a parent and educator, I understand the challenges facing our schools. I will work to improve teacher retention, reduce class sizes, and ensure all students have access to quality education regardless of their background. I support increased funding for special education and mental health services."
	},
	{
		id: "cand-school-2",
		name: "James Wilson",
		positionId: "pos-school-1",
		platform: "I believe in fiscal responsibility and accountability in our school district. I will work to ensure taxpayer dollars are spent wisely, support vocational training programs, and maintain high academic standards. I'm committed to transparency and will make all board meetings accessible to the public."
	}
];

// Mock ballot measures
export const mockMeasures: BallotMeasure[] = [
	{
		id: "measure-1",
		name: "Proposition 1: Parks and Recreation Bond",
		description: "Authorizes $50 million in bonds for park improvements",
		text: "Shall the city issue $50,000,000 in general obligation bonds to fund improvements to city parks, including new playground equipment, walking trails, and community centers? This measure would increase property taxes by an estimated $25 per $100,000 of assessed value annually for 20 years.",
		districtId: "oh-franklin-1"
	},
	{
		id: "measure-2",
		name: "Proposition 2: Public Safety Levy",
		description: "Increases funding for police and fire departments",
		text: "Shall the city increase the public safety levy by 0.5 mills to hire additional police officers and firefighters, improve emergency response times, and upgrade safety equipment? This would cost approximately $17.50 per $100,000 of assessed property value per year.",
		districtId: "oh-franklin-1"
	},
	{
		id: "measure-3",
		name: "Proposition 3: Library Funding",
		description: "Maintains current library funding levels",
		text: "Shall the city renew the existing library levy at current rates to maintain library hours, programs, and services? This is a renewal of an existing levy and will not increase taxes.",
		districtId: "oh-cuyahoga-2"
	}
];

// Function to get ballot data for a district
export function getMockBallotData(districtId: string): BallotData | null {
	const district = mockDistricts.find(d => d.id === districtId);
	if (!district) return null;

	// For MVP, assign positions and candidates to districts
	// In a real app, this would come from a database
	const positions = mockPositions;
	const candidates = mockCandidates;
	const measures = mockMeasures.filter(m => m.districtId === districtId);

	return {
		district,
		positions,
		candidates,
		measures
	};
}

// Function to find district by zip code
export function findDistrictByZip(zipCode: string): District | null {
	return mockDistricts.find(d => d.zipCodes.includes(zipCode)) || null;
}

export function getDistrictBySlugs(stateSlug: string, districtSlug: string): District | null {
	return mockDistricts.find(
		d => d.stateSlug === stateSlug && d.districtSlug === districtSlug
	) || null;
}
