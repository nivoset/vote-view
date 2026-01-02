export interface District {
	id: string;
	state: string;
	stateSlug: string;
	districtSlug: string;
	name: string;
	zipCodes: string[];
}

export interface Position {
	id: string;
	title: string;
	description?: string;
	type: "office" | "measure";
}

export interface Candidate {
	id: string;
	name: string;
	positionId: string;
	platform: string;
}

export interface BallotMeasure {
	id: string;
	name: string;
	description?: string;
	text: string;
	districtId: string;
}

export interface BallotData {
	district: District;
	positions: Position[];
	candidates: Candidate[];
	measures: BallotMeasure[];
}

