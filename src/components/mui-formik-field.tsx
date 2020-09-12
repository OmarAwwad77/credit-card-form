import React from 'react';
import {
	TextFieldProps,
	TextField,
	InputAdornment,
	MenuItem,
} from '@material-ui/core';
import { useField } from 'formik';

type Props = TextFieldProps & {
	name: string;
	as?: 'CREDIT_CARD_NUMBER';
	select?: boolean;
	options?: string[];
	StartIcon?: JSX.Element;
};

const spaceCardNumber = (val: string, n: number) => {
	const arr = val
		.replace(/\s/g, '')
		.split('')
		.map((char, i) => {
			if ((i + 1) % n === 0) {
				return char + ' ';
			}
			return char;
		});

	return arr.join('');
};

const MuiFormikField: React.FC<Props> = (props) => {
	const { name, as, StartIcon, options, ...theRest } = props;

	const [field, { touched, error, value }, { setValue }] = useField({
		name,
	});

	const lastValue = React.useRef(value);

	const setValueCached = React.useCallback(setValue, []);

	React.useEffect(() => {
		const val =
			as === 'CREDIT_CARD_NUMBER' ? spaceCardNumber(value!, 4) : value;
		if (val === lastValue.current) return;
		lastValue.current = val;
		setValueCached(val);
	}, [value, setValueCached, as]);

	return (
		<TextField
			{...field}
			{...theRest}
			error={!!error && touched}
			helperText={touched && error && error}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>{StartIcon}</InputAdornment>
				),
			}}
		>
			{options?.map((option, i) => (
				<MenuItem key={i} value={option}>
					{option}
				</MenuItem>
			))}
		</TextField>
	);
};

export default MuiFormikField;
