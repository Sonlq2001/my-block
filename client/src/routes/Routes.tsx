import React, { FC, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { RouteItemDef } from "./../types/routes.types";
import DefaultLayout from "./../layouts/DefaultLayout/DefaultLayout";
import { LIST_ROUTES } from "./routes.config";

const RouteWrapper: FC<RouteItemDef> = ({
	component: Component,
	layout,
	path,
	isAuthRoute,
}) => {
	const RouteLayout: FC = layout || DefaultLayout;

	if (isAuthRoute) {
		return <Redirect key="ROOT_ROUTE" to="/" />;
	}

	return (
		<Route
			exact
			path={path}
			render={(props): React.ReactElement => {
				const Content = (): JSX.Element => {
					return (
						<RouteLayout>
							<Component {...props} />
						</RouteLayout>
					);
				};
				return <Content />;
			}}
		/>
	);
};

const Routes: FC = () => {
	return (
		<Suspense fallback={<div>loading...</div>}>
			<Switch>
				{LIST_ROUTES.map((route) => {
					return <RouteWrapper key={route.id} {...route} />;
				})}
			</Switch>
		</Suspense>
	);
};

export default Routes;
