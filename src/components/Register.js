import React, { Component } from "react";
import axios from "axios";
import { ProductConsumer } from "../context";
import validator from "validator";
import styled from "styled-components";

const Wrapper = styled.div`
	transform: translate(0%, 2%);
	padding: 0 20rem;
	background-image: url(${props => props.ImagePath});
`;

export default class Register extends Component {
	constructor(props) {
		super(props);

		this.onChangeContact = this.onChangeContact.bind(this);
		this.onChangeLocation = this.onChangeLocation.bind(this);

		this.onChangeZipcode = this.onChangeZipcode.bind(this);

		this.setUser = this.setUser.bind(this);

		this.state = {
			name: "",
			emailId: "",
			contact: "",
			location: "",
			completeAddress: "",
			zipcode: "",
			product: [],
			nameIsValid: false,
			emailIsValid: false
		};
	}

	onChangeContact(e) {
		this.setState({
			contact: e.target.value
		});
	}

	onChangeLocation(e) {
		this.setState({
			location: e.target.value
		});
	}

	onChangeZipcode(e) {
		this.setState({
			zipcode: e.target.value
		});
	}

	setUser() {
		console.log(`Form submitted:`);
		if (validator.isEmail(this.props.email)) {
			console.log("There inside if", validator.isEmail(this.props.email));
			this.setState({
				emailIsValid: true
			});
		} else {
			alert("Email you entered is Invalid");
		}
		if (validator.isAlpha(this.props.name)) {
			this.setState({
				nameIsValid: true
			});
		} else {
			alert("Name you want is Unavailable");
		}
		const newCustomer = {
			name: this.props.name,
			email: this.props.email,
			contact: this.state.contact,
			location: this.state.location,
			zipcode: this.state.zipcode,
			product: []
		};
		if (this.state.nameIsValid && this.state.emailIsValid) {
			const { name, email, contact } = this.state;
			axios
				.post("http://localhost:3002/api/form", {
					// name,
					// email,
					// contact
				})
				.then(response => {
					console.log("Trying to print ", response);
				})
				.catch(err => {
					console.log("Trying to print ", err);
				});

			axios
				.post("http://localhost:4000/users", newCustomer)
				.then(res => console.log(res.data));
			alert("Registered Successfully");
		}

		this.setState({
			name: "",
			emailId: "",
			contact: "",
			location: "",
			zipcode: "",
			product: []
		});
	}

	render() {
		return (
			<ProductConsumer>
				{value => {
					return (
						<Wrapper ImagePath={this.props.ImagePath}>
							<center>
								{" "}
								<h3>Welcome New User</h3>
							</center>
							<br />

							<form>
								<div class="form-group mx-sm-4 mb-4 ">
									<label>Name : </label>
									<input
										type="text"
										className="form-control"
										value={value.name}
										onChange={value.onChangeName}
										required
									/>
								</div>
								<div className="form-group mx-sm-4 mb-4">
									<label>Email : </label>
									<input
										type="email"
										className="form-control"
										value={value.emailId}
										onChange={value.onChangeEmail}
										required
									/>
								</div>

								<div className="form-group mx-sm-4 mb-4">
									<label>Phone : </label>
									<input
										type="number"
										className="form-control"
										value={this.state.contact}
										onChange={this.onChangeContact}
										required
									/>
								</div>

								<div className="form-group mx-sm-4 mb-4">
									<label>Location : </label>
									<input
										type="text"
										className="form-control"
										value={this.state.location}
										onChange={this.onChangeLocation}
										required
									/>
								</div>

								<div className="form-group mx-sm-4 mb-4">
									<label>Zipcode : </label>
									<input
										type="number"
										className="form-control"
										value={this.state.zipcode}
										onChange={this.onChangeZipcode}
										required
									/>
								</div>
								<center>
									<p>
										Please Double click to submit this form
									</p>
									<div className="form-group mx-sm-4 mb-4">
										<input
											type="button"
											value="Submit"
											onClick={() => {
												this.setUser();
												value.getRegistered(
													this.state.emailIsValid &&
														this.state.nameIsValid
												);
											}}
											className="btn btn-primary"
										/>
									</div>
								</center>
							</form>
						</Wrapper>
					);
				}}
			</ProductConsumer>
		);
	}
}
