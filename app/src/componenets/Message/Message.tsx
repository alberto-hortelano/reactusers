import React from 'react';

interface Props {
	message: string;
}

export function Message({ message }: Props) {
	return <p className="message">{message}</p>;
}
