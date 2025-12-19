import BlogHeaderDynamic from '../dynamicComponents/BlogHeaderDynamic';

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
		<BlogHeaderDynamic title={title} desc={desc} isDescCite={isDescCite} />
	);
};

export default BlogHeader;
