import React from 'react'

class Body extends React.Component {
	constructor(props) {
		super(...arguments)
	}
	render() {
		return (
			<div>
				<div className="col-md-8 col-md-offset-2">
					<div className="content-block">
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}

export default Body