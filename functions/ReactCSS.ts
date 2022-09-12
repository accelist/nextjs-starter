type CSSPropertiesMap = {
	[key: string]: React.CSSProperties;
};

export class ReactCSS {
	static create<Styles extends CSSPropertiesMap>(styles: Styles): Styles {
		return styles;
	}
}
