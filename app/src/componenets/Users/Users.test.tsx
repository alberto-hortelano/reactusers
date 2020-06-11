import React from 'react';
import { render } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { Users } from './';

let useSelector: jest.SpyInstance;
let useDispatch: jest.SpyInstance;

describe('App', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		useSelector = jest.spyOn(reactRedux, 'useSelector');
		useDispatch = jest.spyOn(reactRedux, 'useDispatch');
	});

	it('renders the users with a link to the user page', async () => {
		useSelector.mockReturnValue({
			userList: {
				'27': {
					email: 'michael.lawson@reqres.in',
					first_name: 'Michael',
					last_name: 'Lawson',
					avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg',
				},
				'32': {
					email: 'lindsay.ferguson@reqres.in',
					first_name: 'Lindsay',
					last_name: 'Ferguson',
					avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg',
				},
			},
			error: '',
		});
		useDispatch.mockReturnValue(() => void 0);
		const { getByText } = render(
			<Router history={createMemoryHistory()}>
				<Users />
			</Router>,
		);
		const michaelLink = getByText(/Michael - Lawson/i);
		const lindsayLink = getByText(/Lindsay - Ferguson/i);
		expect(michaelLink.getAttribute('href')).toEqual('/user/27');
		expect(lindsayLink.getAttribute('href')).toEqual('/user/32');
	});
});
