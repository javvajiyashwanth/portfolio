import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Project from "./Project";

type Props = {};

export default function Projects({ }: Props) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("https://api.github.com/users/javvajiyashwanth/repos")
            .then((res) => res.json())
            .then((data) => {
                setProjects(
                    data
                        .filter((project: { name: string; }) => !["javvajiyashwanth", "major-project-common"].includes(project.name))
                        .sort((a: { created_at: string; }, b: { created_at: string; }) => b.created_at.localeCompare(a.created_at))
                );
            });
    }, []);

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
            }}
            transition={{
                duration: 1.5,
            }}
            className="min-h-screen flex flex-col max-w-7xl justify-start items-center mx-auto pt-10 pb-40 px-9"
        >
            <h3 className="uppercase tracking-[20px] font-semibold text-gray-800 dark:text-gray-100 text-2xl mb-9">
                Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    projects.map((project: { name: string; description: string; topics: [string]; html_url: string; created_at: string; }, index: React.Key | null | undefined) => (
                        <Project project={project} key={index} />
                    ))
                }
            </div>
        </motion.div>
    )
}