import { useState } from 'react';

const Form = () => {
	const [form, setForm] = useState({
		nome: '',
		email: '',
		genero: '',
	});

	const handleChange = (event) => {
		let newProp = form;
		setValidEmail(true);
		newProp[event.target.name] = event.target.value;
		setForm({ ...newProp });
	};

	const [emptyValue, setEmptyValues] = useState(false);
	const [validEmail, setValidEmail] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();

		//  Verificar se existem campos vazios, não preenchidos.
		let emptyValues = Object.values(form).some((obj) => obj === '');
		setEmptyValues(emptyValues);

		//  Verificar se o email é válido
		let validEmail = form['email']
			.toLocaleLowerCase()
			.match(/[a-z]+@[a-z]+\.com(\.br)*/);
		setValidEmail(validEmail);
		if (!emptyValues && validEmail) {
			fetch('http://localhost:300', {
				method: 'POST',
				body: JSON.stringify(form),
			});
			event.current.target.submit();
		}
	};

	return (
		<div>
			<h2>Este é um Formulário de validação</h2>

			<form
				onSubmit={(event) => {
					handleSubmit(event);
				}}
			>
				<label>Nome: </label>
				<input
					type="text"
					name="nome"
					onBlur={(event) => handleChange(event)}
				/>
				{emptyValue && form['name'] === '' ? (
					<span className="emptyText">
						O campo nome precisa ser preenchido{' '}
					</span>
				) : (
					''
				)}
				<br />
				<label>E-mail: </label>
				<input
					type="text"
					name="email"
					onBlur={(event) => handleChange(event)}
				/>
				{emptyValue && form['email'] === '' ? (
					<span className="emptyText">
						O campo e-mail precisa ser preenchido{' '}
					</span>
				) : (
					''
				)}
				{!validEmail && form['email'] !== '' ? (
					<span className="emptyText">E-mail inválido</span>
				) : (
					''
				)}
				<br />
				<label>Gênero: </label>
				<select name="genero" onChange={(event) => handleChange(event)}>
					<option>-</option>
					<option>M</option>
					<option>F</option>
					<option>LGBTQIA+</option>
				</select>
				<br />
				<button type="submit">Enviar</button>
			</form>
		</div>
	);
};
export default Form;
