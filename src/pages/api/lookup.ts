
import type { APIRoute } from 'astro';
import { ballotService } from '~/services/ballotService';

export const GET: APIRoute = async ({ url }) => {
	const zipCode = url.searchParams.get('zip');
	
	if (!zipCode) {
		return new Response(
			JSON.stringify({ error: 'Zip code is required' }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}

	try {
		const district = await ballotService.findDistrictByZipCode(zipCode);
		
		if (!district) {
			return new Response(
				JSON.stringify({ error: 'District not found' }),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		return new Response(
			JSON.stringify({ district }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		console.error('Error looking up district:', error);
		return new Response(
			JSON.stringify({ error: 'Internal server error' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};

