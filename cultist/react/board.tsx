import * as cultist from '//cultist';
import React from 'react';

export interface BoardProps {
	state: cultist.state.State;
}

export const Board: React.FC<Readonly<BoardProps>> = ({ state }) => {
	return (
		<>
			{[...(state.elementStacks?.entries() ?? [])].map(
				([key, elementInstance]) => (
					<Card key={key} instance={elementInstance} />
				)
			)}
		</>
	);
};

export interface CardProps {
	instance: cultist.state.ElementInstance;
}

export const Card: React.FC<Readonly<CardProps>> = ({ instance }) => {
	return (
		<div>
			<CardTimeDisplay seconds={instance.lifetimeRemaining} />
			{instance.elementId !== undefined ? (
				<>element: {instance.elementId}</>
			) : null}

			{instance.quantity !== undefined ? (
				<>element: {instance.quantity}</>
			) : null}
		</div>
	);
};

export interface CardTimeDisplayProps {
	seconds?: number;
}

export const CardTimeDisplay: React.FC<Readonly<CardTimeDisplayProps>> = ({
	seconds,
}) => (seconds !== undefined ? <>expires in: {seconds}</> : null);
