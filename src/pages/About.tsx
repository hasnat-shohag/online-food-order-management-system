import React from "react";
import Navbar from "../components/NavBar";

const About: React.FC = () => {
	return (
		<>
			<div className="min-h-dvh">
				<Navbar />
				<div className="max-w-4xl mx-auto p-6 mt-10">
					<h1 className="text-4xl font-bold mb-6 text-center">
						About Our Online Management System
					</h1>

					<p className="text-lg leading-7 mb-6">
						Welcome to our Online Management System! This platform is designed
						to streamline your business processes, enhance productivity, and
						foster effective collaboration. Our system offers a suite of tools
						tailored to meet the dynamic needs of modern organizations.
					</p>

					<h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
					<ul className="list-disc list-inside mb-6 space-y-2">
						<li>
							**Project Management**: Organize and monitor all your projects in
							one place.
						</li>
						<li>
							**Task Tracking**: Assign tasks, set deadlines, and track progress
							effortlessly.
						</li>
						<li>
							**Real-time Collaboration**: Communicate with team members in
							real-time.
						</li>
						<li>
							**Analytics & Reporting**: Gain insights with comprehensive
							analytics.
						</li>
						<li>
							**Secure Access**: Robust security features to protect your data.
						</li>
					</ul>

					<h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
					<p className="text-lg leading-7 mb-6">
						Our mission is to empower businesses by providing innovative
						solutions that drive efficiency and growth. We are committed to
						delivering a platform that not only meets but exceeds your
						management needs.
					</p>

					<h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
					<p className="text-lg leading-7">
						Have questions or need support? Reach out to us at{" "}
						<a
							href="mailto:support@onlinemanagementsystem.com"
							className="text-blue-600 hover:underline"
						>
							support@onlinemanagementsystem.com
						</a>{" "}
						or call us at{" "}
						<a href="tel:+1234567890" className="text-blue-600 hover:underline">
							+1 (234) 567-890
						</a>
						.
					</p>
				</div>
			</div>
			{/* Footer */}
			<div className="flex justify-center py-5 bg-gray-200">
				<p>All rights reserved by ICE-19 Lab-4.</p>
			</div>
		</>
	);
};

export default About;
