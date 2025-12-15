import type { Metadata } from 'next';
import { JetBrains_Mono, Montserrat, Rubik } from 'next/font/google';

import 'stylekit/globals.scss';
import styles from 'stylekit/index.module.scss';

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	style: ['normal', 'italic'],
	variable: '--font-montserrat',
});

const rubik = Rubik({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	style: ['normal', 'italic'],
	variable: '--font-rubik',
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	style: ['normal', 'italic'],
	variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
	title: 'Blogkit - Documentation',
	description: 'Blogkit component library documentation',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${montserrat.variable} ${rubik.variable} ${jetbrainsMono.variable}`}
			>
				<div className={`${styles.page} ${styles['page--contents-max-width']}`}>
					{children}
				</div>
			</body>
		</html>
	);
}
