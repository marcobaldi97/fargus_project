import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";

interface LoaderProps {
	loading: boolean;
}

const Loader: React.FunctionComponent<LoaderProps> = (props) => {
	const { loading, children } = props;

	if (loading) return <Spinner animation="border" variant="primary" />;
	else return <>{children}</>;
};

export default Loader;
