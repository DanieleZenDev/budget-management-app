import MainNavigation from "./main-navigation";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
	
	return (
		<div>
			<MainNavigation />
			<main>{props.children}</main>
		</div>
	);
};

export default Layout;
