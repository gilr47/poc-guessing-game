import { APITypes } from "@pocGuessingGame/common";
import React, { useEffect, useState } from "react";
import { leaderboards } from "../apiClient";

export default function Leaderboards() {
	const [stateLeaderboards, setStateLeaderboards] = useState<APITypes.LeaderboardsOutput>([]);
	useEffect(() => { 
		leaderboards().then((leaderboardsArray) => { 
			setStateLeaderboards(leaderboardsArray);
		});
	}, []);

	const leaderboardsComponents = 0 < stateLeaderboards.length &&  stateLeaderboards.map(([username, steps]) => {
		return (
			<tr>
				<td>{username}</td>
				<td>{steps}</td>
			</tr>
		);
	});
	return (
		<>
			<h1>All time leaders</h1>
			<table>
				<tr>
					<th>Username</th>
					<th>Steps</th>
				</tr>
				{leaderboardsComponents}
			</table>
		</>
	)
}