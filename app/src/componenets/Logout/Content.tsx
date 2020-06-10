import React from 'react';

interface Props {
	handleLogout: React.DOMAttributes<HTMLButtonElement>['onClick'];
}

export function Content({ handleLogout }: Props) {
	return <button onClick={handleLogout}>Logout</button>;
}
