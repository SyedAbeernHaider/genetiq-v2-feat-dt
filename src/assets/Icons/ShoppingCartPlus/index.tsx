interface ShoppingCartPlusIconProps {
	fill: string;
}

export const ShoppingCartPlusIcon: React.FC<ShoppingCartPlusIconProps> = ({
	fill,
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
		>
			<path
				d='M7.5 22.5C8.32843 22.5 9 21.8284 9 21C9 20.1716 8.32843 19.5 7.5 19.5C6.67157 19.5 6 20.1716 6 21C6 21.8284 6.67157 22.5 7.5 22.5Z'
				fill={fill}
			/>
			<path
				d='M18 22.5C18.8284 22.5 19.5 21.8284 19.5 21C19.5 20.1716 18.8284 19.5 18 19.5C17.1716 19.5 16.5 20.1716 16.5 21C16.5 21.8284 17.1716 22.5 18 22.5Z'
				fill={fill}
			/>
			<path
				d='M3.73545 2.10293C3.70145 1.93291 3.60959 1.77992 3.4755 1.66999C3.34142 1.56007 3.17339 1.5 3 1.5H0V3H2.385L5.26455 17.3971C5.29855 17.5671 5.39041 17.7201 5.5245 17.83C5.65858 17.9399 5.82661 18 6 18H19.5V16.5H6.615L6.015 13.5H19.5C19.6706 13.5 19.8362 13.4418 19.9693 13.3351C20.1024 13.2283 20.1951 13.0793 20.2322 12.9127L21.9334 5.25H20.3978L18.8987 12H5.715L3.73545 2.10293Z'
				fill={fill}
			/>
			<path
				d='M13.5 4.5V1.5H12V4.5H9V6H12V9H13.5V6H16.5V4.5H13.5Z'
				fill={fill}
			/>
		</svg>
	);
};
