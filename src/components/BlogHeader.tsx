import BlogHeaderStatic from '../staticComponents/BlogHeaderStatic';

interface BlogHeaderProperties {
	title: string[];
	desc: string[];
	isDescCite?: boolean;
}

const BlogHeader = ({
	title,
	desc,
	isDescCite = true,
}: BlogHeaderProperties) => {
	return (
		<BlogHeaderStatic title={title} desc={desc} isDescCite={isDescCite} />
	);
};

export default BlogHeader;
