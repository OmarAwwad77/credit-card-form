import React from 'react';
import { Button, Paper, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
	Person as PersonIcon,
	CreditCard as CreditCardIcon,
	CalendarToday as CalenderTodayIcon,
	Lock as LockIcon,
} from '@material-ui/icons';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import cardValidator from 'card-validator';

import MuiFormikField from './components/mui-formik-field';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		position: 'relative',
		height: '100vh',
		background: `linear-gradient(36deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 68%)`,
	},
	paper: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		width: '26rem',
		padding: '1rem',
		transform: 'translate(-50%,-50%)',
	},
}));

const formikInitialValues = {
	cardHolderName: '',
	cardNumber: '',
	expiryMonth: '',
	expiryYear: '',
	cvc: '',
};

const validationSchema = yup.object({
	cardHolderName: yup
		.string()
		.required()
		.test(
			'cardHolderName',
			'invalid card name',
			(value) => cardValidator.cardholderName(value).isValid
		),
	cardNumber: yup
		.number()
		.typeError('must be a number')
		.required()
		.test(
			'cardNumber',
			'invalid card number',
			(value) => cardValidator.number(value).isValid
		),
	expiryMonth: yup.string().required(),

	expiryYear: yup
		.string()
		.typeError('must be a number')
		.required()
		.test(
			'expiryYear',
			'invalid value',
			(value) => cardValidator.expirationYear(value).isValid
		),

	cvc: yup
		.string()
		.typeError('must be a number')
		.required()
		.test('cvc', 'invalid value', (value) => cardValidator.cvv(value).isValid),
});

const sleep = (millSecs: number) =>
	new Promise((res) => setTimeout(res, millSecs));

function App() {
	const styles = useStyles();
	return (
		<div className={styles.wrapper}>
			<Paper className={styles.paper} variant='elevation'>
				<Formik
					initialValues={formikInitialValues}
					validationSchema={validationSchema}
					onSubmit={async (values, helpers) => {
						await sleep(3000);
						alert(JSON.stringify(values, null, 2));
						helpers.resetForm();
					}}
				>
					{({ isSubmitting }) => (
						<Form autoComplete='off'>
							<Grid container direction='column' spacing={2}>
								<Grid item>
									<MuiFormikField
										fullWidth
										name='cardHolderName'
										label='Card Holder Name'
										color='secondary'
										StartIcon={
											<PersonIcon fontSize='small' color='secondary' />
										}
									/>
								</Grid>
								<Grid item>
									<MuiFormikField
										fullWidth
										as='CREDIT_CARD_NUMBER'
										name='cardNumber'
										label='Card Number'
										color='secondary'
										StartIcon={
											<CreditCardIcon fontSize='small' color='secondary' />
										}
									/>
								</Grid>
								<Grid item container justify='space-between'>
									<Grid item xs={3}>
										<MuiFormikField
											fullWidth
											select
											name='expiryMonth'
											label='Expiry Month'
											color='secondary'
											options={[
												'01',
												'02',
												'03',
												'04',
												'05',
												'06',
												'07',
												'08',
												'09',
												'10',
												'11',
												'12',
											]}
											StartIcon={
												<CalenderTodayIcon fontSize='small' color='secondary' />
											}
										/>
									</Grid>
									<Grid item xs={3}>
										<MuiFormikField
											fullWidth
											name='expiryYear'
											label='Expiry Year'
											color='secondary'
											StartIcon={
												<CalenderTodayIcon fontSize='small' color='secondary' />
											}
										/>
									</Grid>
									<Grid item xs={3}>
										<MuiFormikField
											fullWidth
											name='cvc'
											label='CVC'
											color='secondary'
											StartIcon={
												<LockIcon fontSize='small' color='secondary' />
											}
										/>
									</Grid>
								</Grid>
								<Grid item>
									<Button
										disabled={isSubmitting}
										startIcon={
											isSubmitting && (
												<CircularProgress color='secondary' size='1rem' />
											)
										}
										type='submit'
										fullWidth
										variant='contained'
										color='secondary'
									>
										pay
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</Paper>
		</div>
	);
}

export default App;
