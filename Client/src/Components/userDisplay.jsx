import React, { Component } from 'react';
import './Css/userDisplayCss.css';

export default class UserDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			library: 'My library',
			input: '',
			isEdit: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleEditLibrary = this.toggleEditLibrary.bind(this);
	}

	toggleEditLibrary() {
		this.setState({ isEdit: !this.state.isEdit });
	}

	handleChange(e) {
		e.preventDefault();
		const value = e.target.value;
		this.setState({ [e.target.name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ library: this.state.input, isEdit: false });
	}

	render() {
		console.log('LIBRARY', this.state.library);
		let userData = this.props.userData;
		let videoData = this.props.videoData;
		const { isEdit } = this.state;
		const { playlist } = this.props;
		//WAITING FOR LOADED DATA & DISPLAY CARD AFTER CATCH IT
		// if (isEdit) {
		// 	return (
		// 		<div>
		// 			<input value={this.state.input} onChange={this.handleChange} onClick={this.handleSubmit} />
		// 		</div>
		// 	);
		// } else {
		// 	<p onClick={this.toggleEditLibrary} style={{ cursor: 'pointer' }}>
		// 		{this.state.library}
		// 	</p>;
		// }

		return (
			<div>
				<div className="search">
					<div className="card border-light">
						<img
							src={userData.snippet.thumbnails.high.url}
							className="card-img-top  rounded-circle"
							alt="picProfil"
						/>
						{isEdit === true ? (
							<div>
								<form onSubmit={this.handleSubmit}>
									<input
										className="editInput"
										name="input"
										value={this.state.input}
										onChange={this.handleChange}
									/>
								</form>
							</div>
						) : (
							<p onClick={this.toggleEditLibrary} style={{ cursor: 'pointer' }}>
								{this.state.library}
							</p>
						)}
						<button className="myBtn btn btn-danger btn-sm" onClick={this.props.handleSignoutClick}>
							{' '}
							Sign Out{' '}
						</button>
						<div className="card-body">
							<p className="card-text" />
						</div>
					</div>
					<form className="inputSearch" onSubmit={this.props.handleSubmit}>
						<div>
							<input value={this.props.input} onChange={this.props.handleChange} name="input" />
							<br />
							<button className="myBtn1 btn-danger" name="submit" onClick={this.props.handleSubmit}>
								Search Channel
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
