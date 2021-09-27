import exampleSave from '../../../cultist/example/savestate.txt';
import * as board from '../../../cultist/react';
import * as cultist from '../../../cultist';
import type { NextPage as Page } from 'next';
import * as React from 'react';

const page: Page = () => (
	<>
		<board.Board
			state={cultist.state.deserialize.state(
				cultist.save.load(exampleSave)
			)}
		/>
	</>
);
